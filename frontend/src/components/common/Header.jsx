import LoginButton from "./LoginButton";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Myong</h1>
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
