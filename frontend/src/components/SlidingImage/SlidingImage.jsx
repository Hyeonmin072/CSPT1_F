    import loginImage from "../../images/login.png";

    export default function SlidingImage({ isSliding }) {
        return (
            <div
                className={`absolute right-0 top-0 h-full w-1/2 transition-transform duration-500 ${isSliding ? '-translate-x-full' : ''} z-20`}>
                <img
                    src={loginImage}
                    alt="Login"
                    className={`object-cover w-full h-full ${isSliding ? 'rounded-tr-xl rounded-br-xl' : 'rounded-bl-xl rounded-tl-xl'}`}
                />
            </div>
        );
    }
