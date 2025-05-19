import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="flex items-center">
      <div className="mx-auto flex w-full max-w-96 flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Faça seu login</h1>
        <form className="flex w-full flex-col gap-2">
          <input
            type="email"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite seu e-mail"
          />
          <input
            type="password"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite sua senha"
          />
          <button className="w-full font-bold cursor-pointer bg-primary-400 text-white rounded-full border border-gray-300 px-4 py-2">
            Login
          </button>
        </form>
        <p>
          Ainda não tem conta?
          <Link to="/register" className="font-semibold text-blue-700">
            {" "}
            Registre-se aqui
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
