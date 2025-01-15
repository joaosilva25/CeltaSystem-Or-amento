"use client";
import Image from "next/image";
import FormTemplate from "@/components/forms";
import Resume from "@/components/Resume";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function Area() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!sessionStorage.getItem("authenticated")) {
        router.push("/login");
      } else {
        setAuthenticated(true);
      }
    }
  }, [router]);

  return (
    <motion.div
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: 0.7 } }}
      exit={{ x: -200, opacity: 0 }}
      className="overflow-x-hidden text-black"
    >
      <main className="h-[700px] grid grid-rows-[auto,1fr] grid-cols-2 w-full">
        {/* Header */}
        <header className="col-span-2 p-0">
          <div className="h-[80px] w-[70px] bg-black p-0 flex items-center justify-center">
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
    </motion.div>
  );
}
