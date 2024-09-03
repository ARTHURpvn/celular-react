import React, { useState } from 'react';
import { FaEquals } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiBankLine } from "react-icons/ri";
import { useCellphoneContext } from './context/AppProvider';

const getBackgroundColor = (modelo: string, name: string, isClicked: boolean): string => {
  const colorMap: Record<string, Record<string, string>> = {
    Xiaomi: {
      Calculadora: 'bg-orange-500',
      Banco: 'bg-blue-900',
      Configuração: 'bg-slate-600',
      Camera: 'bg-slate-900',
      DinoGame: 'bg-slate-900',
    },
    Iphone: {
      Calculadora: 'bg-orange-500',
      Configuração: 'bg-slate-600',
    }
  };

  return modelo in colorMap && name in colorMap[modelo] && !isClicked
    ? colorMap[modelo][name]
    : 'bg-none';
};

// Função auxiliar para determinar o ícone
const getIcon = (modelo: string, name: string) => {
  const iconMap: Record<string, Record<string, JSX.Element>> = {
    Xiaomi: {
      Calculadora: <FaEquals className='scale-125 fill-white' />,
      Banco: <RiBankLine className='scale-150 fill-white' />,
      Configuração: <IoSettingsSharp className='scale-150 fill-white' />,
      Camera: <IoSettingsSharp className='scale-150 fill-white' />,
      DinoGame: <IoSettingsSharp className='scale-150 fill-white' />,
    },
    Iphone: {
      Calculadora: <FaEquals className='scale-125 fill-white' />,
      Configuração: <IoSettingsSharp className='scale-150 fill-white' />,
    }
  };

  return modelo in iconMap && name in iconMap[modelo]
    ? iconMap[modelo][name]
    : null;
};

interface AppProps {
  name: string;
}

export default function App({ name }: AppProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { modelo, dispatch } = useCellphoneContext();

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      dispatch({ type: 'setNavegation', payload: name });
      dispatch({ type: 'setNavegation', payload: name + modelo });
    }, 350);
  };

  const backgroundColor = getBackgroundColor(modelo, name, isClicked);
  const icon = getIcon(modelo, name);

  return (
    <div
      className={`w-14 h-18 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out 
                  ${isClicked ? 'scale-150 origin-bottom-right w-screen h-screen bg-black' : ''}`}
      onClick={handleClick}
    >
      <div
        className={`w-14 h-14 flex justify-center ${backgroundColor} rounded-2xl items-center`}
      >
        {icon}
      </div>
      <p className="text-white text-[11.3px] mt-1 font-sans break-words text-center font-bold line-clamp-2">
        {!isClicked && name}
      </p>
    </div>
  );
}