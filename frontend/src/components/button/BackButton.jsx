import {LuArrowLeft} from "react-icons/lu";
import React from "react";

const BackButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="absolute top-8 -ml-[700px] text-3xl">
            <LuArrowLeft size={40} color="black" className="mr-1 ml-4"/>
        </button>
    );
};
export default BackButton;