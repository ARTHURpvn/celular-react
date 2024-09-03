import { BsArrowLeft } from "react-icons/bs";
import { AppProvider, useCellphoneContext } from "@/app/context/AppProvider";

export default function Sobre() {
    const { modelo, isAppClosing, dispatch } = useCellphoneContext();
    function handleClick() {
        dispatch({ type: 'setNavegation', payload: 'Configuração'+modelo });
    }

    return (
        <div className={`dark:bg-black bg-white h-full dark:text-white pt-12 ${isAppClosing && 'scale-50 translate-y-full'} transition-all duration-500`}>
            <BsArrowLeft className="mx-6 scale-150" onClick={handleClick}/>

            <div className="flex flex-col items-center justify-center h-20 w-full mt-16">
                <h1 className="text-4xl font-semibold font-sans  dark:text-slate-200"> Xiangmy <span className="text-blue-600">OS</span></h1>
                <p className="font-semibold text-[11px] font-sans text-[#6e6e6e] mt-4">LPN Phone 1.0</p>
            </div>

            <div className="flex flex-col gap-4 justify-around items-start py-3 mt-16 bg-[#c4c4c4] dark:bg-[#3c3c3c] rounded-md w-full h-30">
                <div className="flex gap-4">
                    <p className="text-[15px] font-sans ml-6 hyphens-manual"> Nome do Disposi &shy; tivo </p>
                    <p className="text-[12px] font-sans ml-6 hyphens-manual text-neutral-700 dark:text-neutral-400"> Xiangmy Note 1 Plus </p>

                </div>

                <div className="flex gap-12">                    
                    <p className="text-[15px] font-sans ml-6 "> Armazenamento </p>
                    <p className="text-[12px] font-sans ml-6 text-neutral-700 dark:text-neutral-400"> 0.0 GB / 128 GB </p>
                </div>
            </div>
        </div>
    );
}