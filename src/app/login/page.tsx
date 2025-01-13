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
      localStorage.setItem("authenticated", "true");
    } else {
      setAccessError("Código de acesso incorreto");
    }
  }

  return (
    <main className="bg-white h-screen grid grid-rows-[auto,1fr] grid-cols-2 w-full">
      {/* Header */}
      <header className="col-span-2 p-0">
        <div className="h-[95px] w-[70px] bg-black p-0 relative left-56 flex items-center justify-center">
          <Image
            src="/CC_Negativo.png"
            width={30}
            height={30}
            alt="Descrição da imagem significativa"
          />
        </div>
      </header>
      <div className="h-full flex font-bold justify-center">
        <div className="flex flex-col gap-6  w-1/2 mt-32">
          <div className="">
            <h1 className="text-7xl">
              Bem <span className="font-light">Vindo</span>
            </h1>
            <h5 className="text-justify opacity-50 mt-6">
              Sistema de Geração de Orçamentos. Organização, Padronização e
              Controle sobre Propostas
            </h5>
          </div>
          <div className="mt-10">
            <label>Código Acesso*</label>
            <input
              placeholder="Username"
              value={accessCode}
              onChange={(e) => setAcessCode(e.target.value)}
              className="h-20 block w-full mt-3 bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
            ></input>
          </div>
          <button
            onClick={acessLogin}
            className="h-20 flex w-full justify-center text-md items-center bg-black px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-black focus-visible:outline mt-8"
          >
            Acessar
          </button>
          <p className="text-center text-red-500">{accessError}</p>
          <h5 className="text-center mt-8 text-md">
            <span className="font-light">Acesso somente de</span> usuários
            autorizados
          </h5>
        </div>
      </div>
      <div className="h-full pl-12 pr-12 pb-8 flex justify-center">
        <div className="h-full flex w-3/4 bg-black items-center justify-center">
          <Image
            src="/CC_lockup_1_Negativo.png"
            width={300}
            height={300}
            alt="Descrição da imagem significativa"
          />
        </div>
      </div>
    </main>
  );
}
