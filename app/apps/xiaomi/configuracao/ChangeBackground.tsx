import { useState, ChangeEvent } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { IoIosClose, IoIosAddCircle } from "react-icons/io";
import { useCellphoneContext } from "@/app/context/AppProvider";

const backgroundImages = [
    "https://t2.tudocdn.net/522357?w=1000&fit=clip",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_wR7OwE6JJVJuyPFqEBUmwRXtyVRR1stt8g&s",
    "https://i.pinimg.com/736x/a8/91/ce/a891ceed4f03cab2629beb40b1bc15fc.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjBfT0lnzhFwSRwshzjLRmNB4G6q1B4RI2IQ&s",
    "https://static.displate.com/270x380/displate/2023-06-01/223be9f8eccefa8cc09e5de8495b3719_44285b86c3c11293120f7be853096240.jpg",
    "https://i.pinimg.com/originals/e2/7d/2e/e27d2ea5f95d58130e974554c3b8850b.jpg",
];

const ChangeBackground = () => {
    const [add, setAdd] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { isAppClosing, dispatch } = useCellphoneContext();

    const handleSetBackgroundUrl = (url: string) => {
        dispatch({ type: 'setBackgroundUrl', payload: url });
        localStorage.setItem('backgroundUrl', url);
        dispatch({ type: 'setBackgroundChanged', payload: true });
        setTimeout(() => dispatch({ type: 'setBackgroundChanged', payload: false }), 1000);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

    const renderBackgroundOptions = () =>
        backgroundImages.map((url, index) => (
            <input
                type="button"
                key={index}
                value={url}
                className={`text-transparent w-32 h-64 rounded-lg bg-cover hover:border hover:border-neutral-400 ${!add ? 'hover:scale-105' : ''} transition-none duration-300`}
                onClick={() => !add && handleSetBackgroundUrl(url)}
                style={{ backgroundImage: `url(${url})` }}
            />
        ));

    return (
        <div className={`w-full h-full pb-4 pt-10 ${isAppClosing && 'scale-50 translate-y-full'} transition-all duration-500`} onClick={() => add && setAdd(false)}>
            <BsArrowLeft className="mx-6 scale-150" onClick={() => dispatch({ type: 'setNavegation', payload: "Config" })} />
            <ul className="flex flex-wrap gap-4 ml-4 mt-6 w-full">
                <li onClick={() => setAdd(true)}>
                    <IoIosAddCircle className="absolute mt-24 left-[70px] scale-[3]" />
                    <p className="absolute mt-[130px] left-[35px] text-md font-bold font-sans"> ADICIONAR </p>
                    <input
                        type="button"
                        className={`text-transparent w-32 h-64 rounded-lg bg-gray-700 hover:border hover:border-neutral-400 ${!add ? 'transition-all' : ''} transition-none duration-300`}
                    />
                </li>
                {!add ? renderBackgroundOptions() : renderBackgroundOptions().slice(0, 3)}
            </ul>
            {add && (
                <div className="absolute bottom-0 bg-black pt-6 pb-10 w-full border-t-1 border-gray-400">
                    <IoIosClose className="absolute right-2 top-2 scale-150" onClick={() => setAdd(false)} />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="bg-gray-800 text-white p-2 ml-6 rounded-md w-[75%]"
                        placeholder="Insira o URL da imagem"
                    />
                    <button
                        onClick={() => handleSetBackgroundUrl(inputValue)}
                        className="bg-blue-500 ml-6 text-white p-2 rounded-md mt-2">
                        Confirmar
                    </button>
                </div>
            )}
        </div>
    );
}

export default ChangeBackground;
