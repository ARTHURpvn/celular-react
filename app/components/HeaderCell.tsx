import { IoBatteryFull, IoCellular  } from "react-icons/io5";
import { RiVolumeMuteFill } from "react-icons/ri";

type HeaderCellProps = {
    muted : boolean;
    styles?: string;
    
}

const HeaderCell = (props: HeaderCellProps) => {
    return (
        <div className={`flex justify-between fixed content-between items-center bg-transparent rounded-xl ${props.styles} transition-all duration-300` }>
            <p className={`relative left-4 top-2 dark:text-white text-black font-sans text-[11px] font-bold ${props.styles} transition-all duration-300`}>11:58</p>
            
            <span className="relative top-2 left-32 bg-black w-3 h-3 rounded-full"></span>

            <div className="relative flex gap-3 -right-[180px] top-2 transition-all duration-300">
                <RiVolumeMuteFill className={` ${props.muted ? "opacity-100" : "opacity-0"} ${props.styles} transition-all duration-300`}/>
                <IoCellular className={`${props.styles} transition-all duration-300`}/>
                <IoBatteryFull style={{ scale:"1.2"}} className={ `${props.styles} transition-all duration-300` } />
            </div>
        
        </div>
    )
}

export default HeaderCell