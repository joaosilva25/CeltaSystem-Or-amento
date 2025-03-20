import Image from "next/image";

export default function Login() {
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
      <div className="bg-red-500 h-full font-bold"> Nome:</div>
      <div className="bg-blue-500 h-full"> Nome:</div>
    </main>
  );
}
