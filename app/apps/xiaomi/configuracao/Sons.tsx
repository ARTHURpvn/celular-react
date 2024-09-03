import { BsArrowLeft } from "react-icons/bs";
import { RiVolumeMuteFill, RiVolumeUpFill } from "react-icons/ri";
import { Slider } from "@nextui-org/slider";
import React, { useEffect } from "react";
import { useCellphoneContext } from "@/app/context/AppProvider";

export default function Sons() {
    const { volume, muted, modelo, isAppClosing, dispatch } = useCellphoneContext();

    function handleSetVolume(volume: number | number[]) {
        dispatch({type: 'setMuted' , payload: volume === 0});
        localStorage.setItem('volume', volume.toString());
        localStorage.setItem('muted', volume === 0 ? 'true' : 'false');
      };
    function handleVolumeChance(value: number | number[]) {
        handleSetVolume(value);
        dispatch({ type: 'setVolume', payload: value });
    }


    function handleBack() {
        dispatch({ type: 'setNavegation', payload: 'Configuração' + modelo });
    }

    if (volume <= 0 && !muted) {
        dispatch({ type: 'setMuted', payload: true });
    } else if (volume > 0 && muted) {
        dispatch({ type: 'setMuted', payload: false });
    }

    return (
        <div className={`dark:bg-black bg-white h-full dark:text-white pt-12 px-6  ${isAppClosing && 'scale-50 translate-y-full'} transition-all duration-500`}>
            <BsArrowLeft className="scale-150" onClick={handleBack} />

            <h1 className="text-3xl font-light font-sans mt-4 text-slate-600 dark:text-slate-200"> Sons e vibração </h1>

            <p className="mt-10 font-medium text-sm text-neutral-500"> Ajustar Volume </p>

            <div className="mt-6">
                <div className="flex items-center gap-4">
                    {muted ? <RiVolumeMuteFill /> : <RiVolumeUpFill />}
                    Midia
                </div>
                <div className="rounded-full">
                    <Slider
                        size="lg"
                        aria-label="Sound progress"
                        color="primary"
                        hideThumb={true}
                        defaultValue={volume}
                        onChangeEnd={(value) => handleVolumeChance(value)}
                        className="max-w-md"
                    />
                </div>
            </div>
        </div>
    );
}
