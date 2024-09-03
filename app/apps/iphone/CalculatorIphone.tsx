import { IoBackspaceOutline } from "react-icons/io5";
import React, { useRef, useState } from 'react';

export default function Calculator() {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  function adicionarValue(x: string) {
    if (textarea.current) {
      let textValue = textarea.current.value;

      if (x === "AC") {
        textValue = "";
        setIsLocked(false);
      } else if (x === "C") {
        if (!isLocked) {
          textValue = textValue.slice(0, -1);
        }
      } else if (x === "=") {
        if (/^[0-9+\-*/().]+$/.test(textValue) && !/[+\-*/.]$/.test(textValue)) {
          try {
            const evalResult = eval(textValue);
            textValue = evalResult.toString();
            setIsLocked(true);
          } catch (e) {
            console.error("Erro ao avaliar a expressão:", e);
          }
        }
      } else if (x === "%") {
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
              const percentageValue = (parseFloat(afterOperator) / 100).toString();
              textValue = beforeOperator + percentageValue;
            }
          } else {
            textValue = (parseFloat(textValue) / 100).toString();
          }
        }
      } else {
        if (isLocked) {
          textValue = x;
          setIsLocked(false);
        } else {
          textValue += x;
        }
      }

      textarea.current.value = textValue;
    }
  }

  return (
    <div className="flex flex-col">
      <textarea
        ref={textarea}
        disabled
        readOnly
        placeholder="0"
        className={`text-white font-semibold text-4xl text-end p-2 cursor-default mx-auto mt-20 h-14 resize-none w-5/6 bg-black ease-in-out duration-150`}
      />
      <div className="absolute bottom-12 left-8 grid grid-cols-4 grid-rows-5 gap-2 mt-6">
        <button className="flex text-black items-center justify-center w-14 h-14 rounded-full bg-[#a6a6a6]" onClick={() => adicionarValue("AC")}>
          AC
        </button>
        <button className="flex text-black items-center justify-center w-14 h-14 rounded-full bg-[#a6a6a6]" onClick={() => adicionarValue("C")}>
          <IoBackspaceOutline className="scale-150" />
        </button>
        <button className="flex text-black items-center justify-center w-14 h-14 rounded-full bg-[#a6a6a6]" onClick={() => adicionarValue("%")}>
          %
        </button>
        <button className="flex text-white text-2xl items-center justify-center w-14 h-14 rounded-full bg-orange-500" onClick={() => adicionarValue("/")}>
          ÷
        </button>
        <button className="flex text-white items-center justify-center w-14 h-14 rounded-full bg-[#333333]" onClick={() => adicionarValue("7")}>
          7
        </button>
        <button className="flex text-white items-center justify-center w-14 h-14 rounded-full bg-[#333333]" onClick={() => adicionarValue("8")}>
          8
        </button>
        <button className="flex text-white items-center justify-center w-14 h-14 rounded-full bg-[#333333]" onClick={() => adicionarValue("9")}>
          9
        </button>
        <button className="flex text-white text-2xl items-center justify-center w-14 h-14 rounded-full bg-orange-500" onClick={() => adicionarValue("*")}>
          ×
        </button>
        <button className="flex text-white items-center justify-center w-14 h-14 rounded-full bg-[#333333]" onClick={() => adicionarValue("4")}>
          4
        </button>
        <button className="flex text-white items-center justify-center w-14 h-14 rounded-full bg-[#333333]" onClick={() => adicionarValue("5")}>
          5
        </button>
        <button className="flex text-white items-center justify-center w-14 h-14 rounded-full bg-[#333333]" onClick={() => adicionarValue("6")}>
          6
        </button>
        <button className="flex text-white text-2xl items-center justify-center w-14 h-14 rounded-full bg-orange-500" onClick={() => adicionarValue("-")}>
          -
        </button>
        <button className="flex text-white items-center justify-center w-14 h-14 rounded-full bg-[#333333]" onClick={() => adicionarValue("1")}>
          1
        </button>
        <button className="flex text-white items-center justify-center w-14 h-14 rounded-full bg-[#333333]" onClick={() => adicionarValue("2")}>
          2
        </button>
        <button className="flex text-white items-center justify-center w-14 h-14 rounded-full bg-[#333333]" onClick={() => adicionarValue("3")}>
          3
        </button>
        <button className="flex text-white text-2xl items-center justify-center w-14 h-14 rounded-full bg-orange-500" onClick={() => adicionarValue("+")}>
          +
        </button>
        <button className="flex col-span-2 text-white items-center justify-center w-30 h-14 rounded-full bg-[#333333]" onClick={() => adicionarValue("0")}>
          0
        </button>
        <button className="flex text-white items-center justify-center w-14 h-14 rounded-full bg-[#333333]" onClick={() => adicionarValue(".")}>
          .
        </button>
        <button className="flex text-white text-2xl items-center justify-center w-14 h-14 rounded-full bg-orange-500" onClick={() => adicionarValue("=")}>
          =
        </button>
      </div>
    </div>
  );
}
