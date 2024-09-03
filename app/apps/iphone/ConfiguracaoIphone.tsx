import { BsFillPhoneFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { RiVolumeUpFill } from "react-icons/ri";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { useCellphoneContext } from "@/app/context/AppProvider";

const ConfiguracaoIphone = () => {
    const { navegation, dispatch } = useCellphoneContext();

    const handleNavegation = (navegation: string) => {
      dispatch({ type: 'setNavegation', payload: navegation });
      
    }

    return (
    <div className="dark:bg-black bg-white h-full w-full ">
        { navegation === "ConfiguraçãoIphone" && (
          <div className="dark:text-white pt-12">
            <h1 className="text-3xl font-light ml-6 font-sans  dark:text-slate-200"> Configurações </h1>

            <div className="flex items-center w-full h-14 rounded-md gap-4 hover:bg-[#4444445e] mt-10" onClick={() => handleNavegation("Sobre")}>
              <BsFillPhoneFill className="bg-slate-500 w-8 h-8 ml-6 p-1.5 rounded-md"/>
              <p className="text-md font-normal font-sans"> Sobre o Telefone </p>
              <IoIosArrowForward className="absolute right-6"/>
            </div>

            <div className="flex items-center w-full h-14 rounded-md gap-4 hover:bg-[#4444445e] mt-2" onClick={() => handleNavegation("Config")}>
              <HiDotsCircleHorizontal className="bg-slate-500 ml-6 w-8 h-8 p-1.5 rounded-md"/>
              <p className="text-md font-normal font-sans"> Configurações </p>
              <IoIosArrowForward className="absolute right-6"/>
            </div>

            <div className="flex items-center w-full h-14 rounded-md gap-4 hover:bg-[#4444445e] mt-2" onClick={() => handleNavegation("Sons")}>
              <RiVolumeUpFill className="bg-green-500 w-8 ml-6 h-8 p-1.5 rounded-md"/>
              <p className="text-md font-normal font-sans"> Sons e Vibração </p>
              <IoIosArrowForward className="absolute right-6"/>
            </div>
          </div>
        )}
    </div>
  );
}

export default ConfiguracaoIphone;