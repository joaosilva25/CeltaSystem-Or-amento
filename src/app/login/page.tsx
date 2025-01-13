"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [accessCode, setAcessCode] = useState("");
  const [accessError, setAccessError] = useState("");

  function acessLogin() {
    if (accessCode === "") {
      return setAccessError("Preencha o campo para acessar");
    }
    if (accessCode === process.env.NEXT_PUBLIC_CODE) {
      router.push("/area");
      sessionStorage.setItem("authenticated", "true");
    } else {
      setAccessError("Código de acesso incorreto");
    }
  }

  return (
    <main className="bg-white h-screen grid grid-rows-[auto,1fr] grid-cols-2 w-full">
      {/* Header */}
      <header className="col-span-2 p-0">
        <div className="h-[95px] w-[70px] bg-black p-0 flex items-center justify-center">
          <Image
            src="/CC_Negativo.png"
            width={30}
            height={30}
            alt="Descrição da imagem significativa"
          />
        </div>
      </header>
      <div className="h-full flex font-bold justify-center items-center">
        <div className="flex flex-col gap-6 w-1/2">
          <div className="">
            <h1 className="text-8xl lg:text-[45px]">
              Bem <span className="font-light">Vindo</span>
            </h1>
            <h5 className="text-justify opacity-60 mt-6 text-sm font-light">
              Sistema de Orçamentos: Organização, Padronização e Controle de
              Propostas
            </h5>
          </div>
          <div className="mt-10">
            <label className="lg:text-sm">Código Acesso*</label>
            <input
              placeholder="Username"
              value={accessCode}
              onChange={(e) => setAcessCode(e.target.value)}
              className="lg:h-12 block w-full mt-3 bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
            ></input>
          </div>
          <button
            onClick={acessLogin}
            className="h-12 flex w-full shadow-xl relative top-4
justify-center  items-center bg-transparent border border-black px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-black hover:text-white focus-visible:outline"
          >
            Acessar
          </button>
          <p className="text-center text-red-500 text-sm">{accessError}</p>
          <h5 className="text-center mt-8 text-md lg:text-sm">
            <span className="font-light">Acesso somente de</span> usuários
            autorizados
          </h5>
        </div>
      </div>
      <div className="h-full pl-12 pr-12 pb-8 flex justify-center">
        <div className="h-full flex w-3/4 bg-black items-center justify-center">
          <Image
            src="/CC_lockup_1_Negativo.png"
            width={250}
            height={250}
            alt="Descrição da imagem significativa"
          />
        </div>
      </div>
    </main>
  );
}
