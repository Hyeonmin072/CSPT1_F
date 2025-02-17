import React from "react";
import { Check } from 'lucide-react';

export default function SelectButton(){

    return (
        <button className="mt-10 bg-[#03DAC5] text-white p-3
                    rounded-lg flex items-center justify-center w-30 h-[50px] ml-auto mx-20 "
        >
            <Check className="mr-1"/> 선택
        </button>
    );
}