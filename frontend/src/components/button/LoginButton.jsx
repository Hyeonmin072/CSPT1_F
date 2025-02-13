import { Link } from 'react-router-dom';

export default function LoginButton() {
    return (
        <Link to="/loginandregister">
            <button className="px-4 py-2 bg-[#70EFDE] text-black rounded transition-colors duration-200 font-bold">
                로그인
            </button>
        </Link>
    );
}