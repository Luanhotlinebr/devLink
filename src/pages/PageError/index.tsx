import { Link } from "react-router";

export function PageError() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-white text-3xl font-bold">404</h1>
      <h1 className="text-white text-2xl font-bold">Página não encontrada</h1>
      <p className="text-white text-1xl">
        Você caiu em uma página que não existe!
      </p>
      <Link
        to="/"
        className="bg-gray-800 rounded-md h-9 p-3 flex items-center mt-3"
      >
        Voltar para home
      </Link>
    </div>
  );
}
