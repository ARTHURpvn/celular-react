'use client';

import React, { useEffect } from 'react';
import HeaderCell from './components/HeaderCell';
import Footer from "./components/Footer";
import App from "./App";
import { useCellphoneContext } from './context/AppProvider';

import ConfiguracaoXiaomi from "./apps/xiaomi/configuracao/ConfiguracaoXiaomi";
import ConfiguracaoIphone from "./apps/iphone/ConfiguracaoIphone";
import Calculator from "./apps/xiaomi/CalculatorXiaomi";
import CalculatorIphone from "./apps/iphone/CalculatorIphone";
import Sons from './apps/xiaomi/configuracao/Sons';
import CameraXiaomi from './apps/xiaomi/Camera';
import Banco from './apps/Bank/Bank';
import Sobre from './apps/xiaomi/configuracao/Sobre';
import Config from './apps/xiaomi/configuracao/Config';
import ChangeBackground from './apps/xiaomi/configuracao/ChangeBackground';
import DinoGame from './Games/DinoGame';


const appComponents = {
  "Home": (
    <div className="grid grid-cols-4 gap-x-4 gap-y-10 mt-10 mx-6">
      <App name="Calculadora" />
      <App name="Banco" />
      <App name="Configuração" />
      <App name="Camera" />
      <App name="DinoGame" />
    </div>
  ),
  
  // Iphone
  "CalculadoraIphone": <CalculatorIphone />,
  "ConfiguraçãoIphone": <ConfiguracaoIphone />,
  
  // Xiaomi
  "CameraXiaomi": <CameraXiaomi />,
  "ConfiguraçãoXiaomi": <ConfiguracaoXiaomi />,
  "CalculadoraXiaomi": <Calculator />,

  // Apps
  "Sons": <Sons />,
  "BancoXiaomi": <Banco />,
  "Sobre": <Sobre />,
  "Config": <Config />,
  "DinoGameXiaomi": <DinoGame />,
  "ChangeBackground": <div className={`bg-white dark:bg-black`}> <ChangeBackground /> </div>
  
};

type NavigationKeys = keyof typeof appComponents;

function Home() {
  const {
    backgroundUrl,
    navegation,
    muted,
    modelo,
    theme,
    volume,
    backgroundChanged,
    scale,
    dispatch
  } = useCellphoneContext();
  const currentComponent = appComponents[navegation as NavigationKeys] || null;
  
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      document.documentElement.classList.toggle('dark', storedTheme === 'Dark');
    }else {
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', userPrefersDark);
    }
  }, [theme]);

  useEffect(() => {
    const saveMuted = localStorage.getItem('muted');
    const saveVolume = localStorage.getItem('volume');

    if (saveMuted) {
      dispatch({type: 'muted' , payload: saveMuted === 'true'});
    }

    if (saveVolume) {
      dispatch({type: 'setVolume' , payload: saveVolume});
    }
  }, [volume]);
  
  useEffect(() => {
    const savedBackgroundUrl = localStorage.getItem('backgroundUrl');
    if (savedBackgroundUrl) {
      dispatch({type: 'setBackgroundUrl', payload: savedBackgroundUrl});
    }
  }, [backgroundUrl]);

  useEffect(() => {
    const savedModel = localStorage.getItem('modelo');
    if (savedModel) {
      dispatch({type: 'setModelo' , payload: savedModel});
    }
  }, [modelo]);

  useEffect(() => {
    const savedScale = localStorage.getItem('scale');
    if (savedScale) {
      let scale2 = parseInt(savedScale);
      dispatch({type: 'setScale' , payload: scale2});
    }
  }, [scale]);

  const handleFooterClick = () => {
    dispatch({ type: 'setIsAppClosing', payload: true });
    setTimeout(() => {
      dispatch({ type: 'setNavegation', payload: "Home" });
      dispatch({ type: 'setIsAppClosing', payload: false });
    }, 300);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        fetch('https://celular-react/close', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({}),
        });
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className={`absolute w-80 h-[650px] ${scale === 1 ? 'scale-75 -bottom-[70px] -right-[26px]' : scale === 2 ? 'scale-100 bottom-5 right-5' : scale === 3 && 'scale-125 bottom-[90px] right-[50px]'}`}>
      <div
        className={`absolute overflow-y-auto overflow-x-hidden scroll-smooth border-black rounded-2xl ${modelo === "Iphone" && 'rounded-[2rem]'} w-full h-full border-[5px] scroll-bar`}
        style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      >
        { currentComponent }

        <div className="absolute top-0 mx-auto w-full h-8 z-50">
          <HeaderCell muted={muted} styles={navegation !== "Home" && navegation !== "BancoXiaomi" ? "dark:text-white text-black" : "text-white"} />
        </div>
        <div className="absolute bottom-0 mx-auto w-full h-8 overflow-hidden z-50">
          {navegation !== "Home" && <Footer onClick={ handleFooterClick } />}
        </div>

        { backgroundChanged && (
          <div className="fixed bottom-16 right-9 bg-green-500 text-white py-2 px-4 rounded-md">
            <p>Background trocado com sucesso!</p>
          </div>
        ) }
      </div>
    </div>
  );
}

export default Home;