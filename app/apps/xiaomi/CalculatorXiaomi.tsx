import { IoBackspaceOutline } from "react-icons/io5";
import React, { useRef, useState } from 'react';
import { useCellphoneContext } from "@/app/context/AppProvider";

export default function Calculator() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [result, setResult] = useState<string>("0");

  const { isAppClosing } = useCellphoneContext();

  const calculateResult = (textValue: string) => {
    if (/^[0-9+\-*/().]+$/.test(textValue) && !/[+\-*/.]$/.test(textValue)) {
      try {
        const evalResult = eval(textValue);
        setResult(evalResult.toString());
        setIsResultVisible(evalResult !== 0);
      } catch (error) {
        console.error("Error evaluating expression:", error);
      }
    } else {
      setResult("0");
      setIsResultVisible(false);
    }
  };

  const handleButtonClick = (input: string) => {
    if (textareaRef.current) {
      let textValue = textareaRef.current.value;

      switch (input) {
        case "AC":
          if (isLocked) {
            const updatedHistory = [...history, `${textValue} = ${result}`];
            if (updatedHistory.length > 3) updatedHistory.shift();
            setHistory(updatedHistory);
            setIsLocked(false);
          }
          textValue = "";
          setIsResultVisible(false);
          setResult("0");
          break;

        case "C":
          if (!isLocked) textValue = textValue.slice(0, -1);
          break;

        case "=":
          if (/^[0-9+\-*/().]+$/.test(textValue) && !/[+\-*/.]$/.test(textValue)) {
            try {
              const evalResult = eval(textValue);
              setResult(evalResult.toString());
              setIsLocked(true);
              setIsResultVisible(true);
            } catch (error) {
              console.error("Error evaluating expression:", error);
            }
          }
          break;

        case "%":
          if (/^[0-9+\-*/().]+$/.test(textValue)) {
            const lastOperatorIndex = Math.max(
              textValue.lastIndexOf('+'),
              textValue.lastIndexOf('-'),
              textValue.lastIndexOf('*'),
              textValue.lastIndexOf('/')
            );
            if (lastOperatorIndex !== -1) {
              const beforeOperator = textValue.slice(0, lastOperatorIndex + 1);
              const afterOperator = textValue.slice(lastOperatorIndex + 1);
              if (afterOperator) {
                textValue = beforeOperator + (parseFloat(afterOperator) / 100).toString();
              }
            } else {
              textValue = (parseFloat(textValue) / 100).toString();
            }
          }
          setResult(textValue);
          setIsResultVisible(textValue !== "0");
          break;

        default:
          if (!isLocked) {
            if (/[+\-*/]/.test(input)) {
              if (/[+\-*/]$/.test(textValue)) {
                textValue = textValue.slice(0, -1); 
              }
              textValue += input;
            } else {
              textValue += input;
            }
          }
          break;
      }

      textareaRef.current.value = textValue;

      calculateResult(textValue);
    }
  };

  const buttons = [
    ["AC", "C", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="]
  ];

  return (
    <div className={`relative flex flex-col dark:bg-black bg-white h-full ${isAppClosing ? 'scale-50 translate-y-full' : ''} transition-all duration-500`}>
      <div className="text-end mx-6 mt-20 h-10 text-white">
        <ul className="text-gray-400 text-sm ease-in-out duration-150">
          {history.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
      <textarea
        ref={textareaRef}
        disabled
        readOnly
        placeholder="0"
        className={`font-semibold ${isLocked ? 'text-xl text-black dark:text-gray-300 h-11' : 'text-4xl'} text-end p-2 cursor-default mx-auto ${isResultVisible ? 'mt-14' : 'mt-20'} h-14 resize-none w-5/6 bg-white dark:bg-black ease-in-out duration-150`}
      />
      {isResultVisible && (
        <p className={`text-end mr-6 dark:text-white ${isLocked ? 'text-5xl' : 'text-lg'} font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap`} ref={resultRef}>
          = {result}
        </p>
      )}
      <div className="absolute bottom-12 left-8 grid grid-cols-4 grid-rows-5 gap-2 mt-6">
        {buttons.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((button, buttonIndex) => (
              <button
                key={buttonIndex}
                className={`flex items-center justify-center rounded-xl h-14 ${button === "0" ? "col-span-2" : "w-14"} ${["AC", "C", "%", "/"].includes(button) ? "text-orange-600" : "text-white"} ${button === "=" ? "bg-orange-500" : "bg-[#2b2b2bc2]"}`}
                onClick={() => handleButtonClick(button)}
              >
                {button === "C" ? <IoBackspaceOutline className="scale-150" /> : button}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}