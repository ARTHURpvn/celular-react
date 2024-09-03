import { BsArrowLeft } from "react-icons/bs";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { useState, ChangeEvent } from "react";
import { useCellphoneContext } from "@/app/context/AppProvider";

const Config = () => {
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedSize, setSelectedSize] = useState<number>(2); // Define o valor inicial como número
    const { theme, modelo, isAppClosing, dispatch } = useCellphoneContext();

    const handleNavegation = (nav: string) => dispatch({ type: 'setNavegation', payload: nav });
    const handleBack = () => dispatch({ type: 'setNavegation', payload: `Configuração${modelo}` });

    const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => setSelectedModel(e.target.value);
    const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setSelectedSize(value);
    };

    const handleSetTheme = (theme: string) => {
        localStorage.setItem('theme', theme);
        dispatch({ type: 'setTheme', payload: theme });
    };

    const handleSetSize = () => {
        const size = selectedSize || 2;
        localStorage.setItem('scale', size.toString()); 
        dispatch({ type: 'setScale', payload: size });
    };

    const handleSetModel = () => {
        const model = selectedModel || 'Xiaomi';
        localStorage.setItem('modelo', model);
        dispatch({ type: 'setModelo', payload: model });
    };

    return (
        <div className={`dark:text-white dark:bg-black h-full bg-white pt-12 ${isAppClosing && 'scale-50 translate-y-full'} transition-all duration-500`}>
            <BsArrowLeft className="mx-6 scale-150" onClick={handleBack} />
            <div className="mt-6">
                <div className="flex justify-around ">
                    <div className="hover:text-blue-600 dark:hover:text-blue-900" onClick={() => handleSetTheme("Light")}>
                        <input 
                            type="button" 
                            className={ `text-transparent w-32 h-48 rounded-lg bg-neutral-500 hover:border dark:hover:border-blue-600 ${theme == 'light' || theme == 'Light' && 'border-blue-700 border-2'}` }
                        />
                        <p className={`font-normal text-center font-sans mt-2 mb-6 ${theme == 'light' || theme == 'Light' && 'text-blue-600'}`}>Modo Claro</p>
                    </div>

                    <div className="hover:text-blue-200" onClick={() => handleSetTheme("Dark")}>
                        <input 
                            type="button" 
                            className={ `text-transparent w-32 h-48 rounded-lg bg-neutral-900 hover:border dark:hover:border-blue-600 ${theme == 'dark' || theme == 'Dark' && 'border-blue-700 border-2'} ` }
                        />
                        <p className={`font-normal text-center font-sans mt-2 mb-10 ${theme == 'dark' || theme == 'Dark' && 'text-blue-600'}`}>Modo Escuro</p>
                    </div>
                </div>
            </div>
            <div className="mb-6">
                <p className="text-md ml-4 font-sans">Tamanho do Celular</p>
                <div className="flex justify-around items-center mt-2">
                    <select
                        value={selectedSize}
                        onChange={handleSizeChange}
                        className="bg-gray-400 dark:bg-gray-800 text-white h-10 px-4 rounded-md"
                    >
                        <option value={1}>75%</option>
                        <option value={2}>100%</option>
                        <option value={3}>125%</option>
                    </select>
                    <button
                        onClick={handleSetSize}
                        className="bg-blue-700 dark:bg-blue-500 text-white h-10 px-4 rounded-md">
                        Confirmar
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-md ml-4 font-sans">Modelo</p>
                <div className="flex justify-around items-center mt-2">
                    <select
                        value={selectedModel}
                        onChange={handleModelChange}
                        className="bg-gray-400 dark:bg-gray-800 text-white h-10 px-4 rounded-md"
                    >
                        <option value="Xiaomi">Xiaomi</option>
                        <option value="Iphone">Iphone</option>
                    </select>
                    <button
                        onClick={handleSetModel}
                        className="bg-blue-700 dark:bg-blue-500 text-white h-10 px-4 rounded-md">
                        Confirmar
                    </button>
                </div>
            </div>
            <div className="flex items-center w-full h-14 rounded-md gap-4 hover:bg-[#4444445e] mt-2" onClick={() => handleNavegation("ChangeBackground")}>
                <HiDotsCircleHorizontal className="bg-slate-500 ml-6 w-8 h-8 p-1.5 rounded-md" />
                <p className="text-md font-normal font-sans">Trocar Background</p>
                <IoIosArrowForward className="absolute right-6" />
            </div>
        </div>
    );
}

export default Config;
