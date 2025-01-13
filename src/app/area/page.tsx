"use client";
import Image from "next/image";
import FormTemplate from "@/components/forms";
import Resume from "@/components/Resume";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Area() {
  const isAuthenticated = sessionStorage.getItem("authenticated");
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redireciona para a página de login se o usuário não estiver autenticado
      router.push("/login");
    } else {
      setAuthenticated(true);
    }
  }, [router, isAuthenticated]);

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
      <FormTemplate />
      <Resume />
    </main>
  );
}
