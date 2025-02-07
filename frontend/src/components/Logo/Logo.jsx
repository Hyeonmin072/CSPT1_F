import logo from "../../images/Logo.jpg"

export default function Logo () {
    return (
        <div className={"flex flex-col items-center justify-center"}>
            <img src={logo} alt="HAIRISM Logo" className="w-[200px] h-auto mb-4 "/>
            <h1 className="text-[6rem] font-bold leading-[0.8]">HAIRISM</h1>
            <h2 className="text-[2.75rem] text-black leading-[1.0] font-semibold">MY HAIR PARTNER</h2>
        </div>
    );
}