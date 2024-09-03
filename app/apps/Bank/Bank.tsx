'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { GoPlus } from 'react-icons/go';
import { PiFilesLight, PiHandDepositLight } from 'react-icons/pi';
import { MdOutlinePayments } from 'react-icons/md';
import { GrAtm } from 'react-icons/gr';
import { IoHomeOutline, IoCloseOutline } from 'react-icons/io5';
import { useCellphoneContext } from '@/app/context/AppProvider';
import Deposit from './Deposit';

// Tipagem para o estado do componente
interface BancoState {
  navegation: string;
  selectCard: string;
  clickedCard: string;
  select: boolean;
  confirm: boolean;
  clicked: boolean;
}

// Array de URLs de cartões
const cardsArray = [
  "https://i.postimg.cc/SR5c7TBK/Frame-21.png",
  "https://i.postimg.cc/Y012Q1XW/premium-Card.png",
  "https://i.postimg.cc/bwZsCFwx/Frame-3.png",
  "https://i.postimg.cc/FKtsPrqv/Frame-4.png",
  "https://i.postimg.cc/FzK9f7fy/Frame-5.png",
  "https://i.postimg.cc/mZdLvNq8/Frame-6.png",
  "https://i.postimg.cc/tJm9FpPL/Frame-7.png",
  "https://i.postimg.cc/rmjVFSpy/Frame-8.png",
];

const CardButton = ({ url, isClicked, onClick }: { url: string; isClicked: boolean; onClick: (url: string) => void }) => (
  <button
    type="button"
    onClick={() => !isClicked && onClick(url)}
    className={`relative w-[143px] h-[90px] overflow-hidden ${!isClicked ? 'hover:scale-105' : ''} transition-transform duration-300`}
  >
    <Image
      src={url}
      alt="Button background"
      layout="fill"
      objectFit="cover"
      priority
    />
  </button>
);

const Banco = () => {
  const { card, dispatch, isAppClosing } = useCellphoneContext();
  const [state, setState] = useState<BancoState>({
    navegation: "Bank",
    selectCard: card,
    clickedCard: "",
    select: false,
    confirm: false,
    clicked: false,
  });

  const handleSelect = () => {
    setState(prevState => ({ ...prevState, confirm: true }));
    handleSetCard(state.clickedCard);
  };

  const handleSetCard = (url: string) => {
    setState(prevState => ({ ...prevState, clicked: true, clickedCard: url }));

    if (state.confirm) {
      dispatch({ type: 'setCard', payload: url });
      localStorage.setItem('card', url);
      setState(prevState => ({
        ...prevState,
        selectCard: url,
        confirm: false,
        select: false,
        clicked: false,
      }));
    }
  };

  return (
    <div className={`bg-neutral-900 h-full ${isAppClosing ? 'scale-50 translate-y-full' : ''} transition-all duration-500`}>
      {state.navegation === "Bank" ? (
        <>
          {state.select && (
            <div className="flex justify-evenly pt-24 gap-y-2 flex-wrap absolute w-full h-full bg-neutral-900 z-10">
              <IoCloseOutline className="absolute top-12 right-6 text-white scale-150 cursor-pointer" onClick={() => setState(prevState => ({ ...prevState, select: false }))} />
              <div className="flex flex-wrap gap-y-4 absolute justify-evenly">
                {cardsArray.map((url, index) => (
                  <CardButton key={index} url={url} isClicked={state.clicked} onClick={handleSetCard} />
                ))}
              </div>
              {state.clicked && (
                <div className="flex justify-center items-center gap-6 z-20 absolute bottom-0 right-0 w-full h-32 bg-neutral-950">
                  <button className="p-2 rounded-lg bg-blue-600 text-white" onClick={handleSelect}> Confirmar </button>
                  <button className="p-2 rounded-lg text-white" onClick={() => setState(prevState => ({ ...prevState, clicked: false }))}> Cancelar </button>
                </div>
              )}
            </div>
          )}

          <div className="text-white pt-12 px-6 text-xl font-sans font-light">
            <div className="flex items-center gap-6">
              <h1> Meu Cartão </h1>
              <div className="p-2 bg-neutral-500/40 rounded-lg cursor-pointer" onClick={() => setState(prevState => ({ ...prevState, select: true }))}>
                <GoPlus />
              </div>
            </div>

            <div className="mt-6 relative">
              <Image src={state.selectCard} width={300} height={100} alt="Cartão" />
              <p className="absolute bottom-4 left-4 font-normal"> R$ 100.000.000 </p>
            </div>

            <div className="flex justify-evenly mt-4">
              <div className="flex flex-col items-center justify-center gap-2 w-20 h-20 bg-neutral-600/40 rounded-xl cursor-pointer" onClick={() => setState(prevState => ({ ...prevState, navegation: "Depositar" }))}>
                <PiHandDepositLight className="fill-neutral-300 scale-105" />
                <p className="text-center font-normal text-sm"> Depositar </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 w-20 h-20 bg-neutral-600/40 rounded-xl cursor-pointer">
                <MdOutlinePayments className="fill-neutral-300 scale-105" />
                <p className="text-center font-normal text-sm"> Transferir </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 w-20 h-20 bg-neutral-600/40 rounded-xl cursor-pointer">
                <GrAtm className="stroke-neutral-300" />
                <p className="text-center font-normal text-sm"> Multas </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center font-bold">
                <p className="text-[17px]"> Transações Recentes </p>
                <p className="text-sm text-blue-500 cursor-pointer"> Ver Tudo </p>
              </div>
              <div className="mt-4 flex flex-col gap-4 ">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="flex justify-center items-center w-10 h-10 bg-green-500/40 rounded-full">
                      <PiHandDepositLight className="fill-neutral-300 scale-105" />
                    </div>
                    <p className="font-medium text-[20px]"> Depósito </p>
                  </div>
                  <p className="text-[15px]"> R$ 100.000 </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="flex justify-center items-center w-10 h-10 bg-red-500/40 rounded-full">
                      <PiHandDepositLight className="fill-neutral-300 scale-105" />
                    </div>
                    <p className="font-medium text-[20px]"> Saque </p>
                  </div>
                  <p className="text-[15px]"> R$ 100.000,00 </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : state.navegation === "Depositar" && <Deposit />}

      <footer className="flex justify-evenly pt-4 absolute bottom-0 w-full h-20 bg-neutral-600/40">
        <IoHomeOutline className={`scale-150 cursor-pointer ${state.navegation === "Bank" ? 'stroke-neutral-300' : 'stroke-neutral-600'}`} onClick={() => setState(prevState => ({ ...prevState, navegation: "Bank" }))} />
        <PiFilesLight className={`scale-150 cursor-pointer ${state.navegation === "Extract" ? 'fill-neutral-300' : 'fill-neutral-600'}`} />
        <PiHandDepositLight className={`scale-150 cursor-pointer ${state.navegation === "Depositar" ? 'fill-neutral-300' : 'fill-neutral-600'}`} onClick={() => setState(prevState => ({ ...prevState, navegation: "Depositar" }))} />
        <MdOutlinePayments className={`scale-150 cursor-pointer ${state.navegation === "Sacar" ? 'fill-neutral-300' : 'fill-neutral-600'}`} />
        <GrAtm className={`scale-150 cursor-pointer ${state.navegation === "Payments" ? 'stroke-neutral-300' : 'stroke-neutral-600'}`} />
      </footer>
    </div>
  );
};

export default Banco;
