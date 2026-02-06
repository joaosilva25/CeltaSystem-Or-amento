"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Login() {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {
    setIsLoading(true);
    setAccessError("");

    setTimeout(() => {
      if (accessCode === "") {
        setAccessError("Preencha o campo para acessar");
        setIsLoading(false);
        return;
      }

      if (accessCode === process.env.NEXT_PUBLIC_CODE) {
        sessionStorage.setItem("authenticated", "true");
        router.push("/area");
      } else {
        setAccessError("Código de acesso incorreto");
        setIsLoading(false);
      }
    }, 600);
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Left Side - Image & Content */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden bg-black">
        {/* Static Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/image6.jpg"
            alt="Background"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/35"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 p-16 flex flex-col items-start max-w-xl relative bottom-32"
        >
          <div className="space-y-6">
            <p className="text-2xl font-light text-white leading-snug drop-shadow-md">
              Transforme a maneira como você gerencia{" "}
              <span className="font-semibold text-white">
                propostas e orçamentos
              </span>
              .
            </p>
          </div>
        </motion.div>

        {/* Footer with Logo and Copyright */}
        <div className="absolute bottom-0 left-0 w-full py-6 px-12 z-20 flex justify-between items-center border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="opacity-90">
            <Image
              src="/CC_lockup_1_Negativo.png"
              width={100}
              height={35}
              alt="Celta Desk"
              className="object-contain"
            />
          </div>
          <div className="text-[10px] text-white/70 font-light tracking-wider uppercase">
            © Celta Desk {new Date().getFullYear()}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 lg:px-24 xl:px-32 bg-background relative">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-[420px] mx-auto"
        >
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="lg:hidden mb-12 flex justify-center">
            <div className="bg-black p-4 rounded-2xl shadow-xl">
              <Image src="/CC_Negativo.png" width={48} height={48} alt="Logo" />
            </div>
          </div>

          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-3xl leading-tight font-semibold tracking-tight text-foreground mb-4">
              Login<span className="font-semibold">*</span>
            </h2>
            <p className="text-muted-foreground text-sm font-regular">
              Por favor, insira seu código de acesso para continuar.
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <Input
                label="Código de Acesso"
                type="password"
                placeholder="Digite seu código..."
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  if (accessError) setAccessError("");
                }}
                error={accessError}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
                autoFocus
              />
            </div>

            <div className="pt-2">
              <Button
                onClick={handleLogin}
                className="w-full text-sm"
                isLoading={isLoading}
              >
                Login
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center gap-6 mt-8"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
