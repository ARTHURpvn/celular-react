import { IoRadioButtonOn } from "react-icons/io5";

type FooterProp = {
  onClick: () => void;
};

export default function Footer({ onClick }: FooterProp) {
  return (
    <div className="absolute bottom-4 w-full flex justify-center items-center cursor-pointer">
      <div className={`fixed h-4 w-4`}>
        <IoRadioButtonOn onClick={onClick} style={{ scale: "1.5", position: "relative" }} className="dark:fill-white dark:outline-white fill-black outline-black"/>
      </div>
    </div>
  );
}