"use client";
import { useState, createContext } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { motion } from "motion/react";
import { IoAddCircle } from "react-icons/io5";
import Resume from "./Resume";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { LiaTrashAlt } from "react-icons/lia";
import { MyContextType } from "../../types/MyContext";
import CurrencyInput from "react-currency-input-field";

export const MyContext = createContext<MyContextType | null>(null);
export default function FormTemplate() {
  let [activeTab, setActiveTab] = useState(0);

  interface Produto {
    produto: string;
    medidas: string;
    quantidade: string;
    valor: string;
  }

  interface Alert {
    severity: "error" | "warning" | "info" | "success";
    text: string;
    show: boolean;
  }

  const [prodInputs, setProdInputs] = useState<Produto[]>([
    {
      produto: "",
      medidas: "",
      quantidade: "1",
      valor: "0",
    },
  ]);
  const [attendent, setAttendent] = useState("");
  const [modalOrder, setModalOrder] = useState("");
  const [cliente, setCliente] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [tipoTransacao, setTipoTransacao] = useState("");
  const [aluguel, setAluguel] = useState("");
  const [telefone, setTelefone] = useState("");
  const [freteEntrega, setFreteEntrega] = useState("0");
  const [freteRetirada, setFreteRetirada] = useState("0");
  const [periodoMinimo, setPeriodoMinimo] = useState("0");
  const [localUtilizacao, setLocalUtilizacao] = useState("");
  const [depositoRetirada, setDepositoRetirada] = useState("");
  const [obs, setObs] = useState("");
  const [loadReqText, setLoadReqText] = useState(false);
  const [errorReq, setErrorReq] = useState(false);

  const [showAlert, setShowAlert] = useState<Alert>({
    severity: "success",
    text: "",
    show: false,
  });

  const addNewProduct = () => {
    setProdInputs([
      ...prodInputs,
      {
        produto: "",
        medidas: "",
        quantidade: "1",
        valor: "",
      },
    ]);
    console.log(prodInputs);
  };

  const handleInputChange = (index: any, field: any, value: any) => {
    const updatedProdInputs: any = [...prodInputs];
    console.log(updatedProdInputs);
    updatedProdInputs[index][field] = value;
    setProdInputs(updatedProdInputs);
  };

  const deleteProduct = (indexProd: number) => {
    prodInputs.splice(indexProd, 1);
    setProdInputs([...prodInputs]);
  };

  const clearForm = () => {
    setAttendent("");
    setModalOrder("");
    setCliente("");
    setEmail("");
    setCnpj("");
    setTelefone("");
    setFreteEntrega("0");
    setFreteRetirada("0");
    setPeriodoMinimo("0");
    setLocalUtilizacao("");
    setDepositoRetirada("");
    setObs("");
    setTipoTransacao("");
    setProdInputs([
      {
        produto: "",
        medidas: "",
        quantidade: "1",
        valor: "0",
      },
    ]);
  };

  const requisiton = async () => {
    setLoadReqText(true);
    if (
      attendent &&
      cliente &&
      email &&
      telefone &&
      freteEntrega &&
      localUtilizacao &&
      tipoTransacao
    ) {
      let filterProducts = prodInputs.filter(
        (produto) =>
          produto.produto.trim() !== "" &&
          produto.quantidade.trim() !== "" &&
          produto.valor.trim() !== "" &&
          produto.medidas.trim() !== ""
      );
      const req = await fetch(
        "https://n8n.srv946688.hstgr.cloud/webhook/ccc9cfa3-6a89-47cf-b03c-51c86e2fd3a7",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Atendente: `${attendent}`,
            Modelo: `${modalOrder}`,
            Cliente: `${cliente}`,
            Email: `${email}`,
            CNPJ: `${cnpj || "N/I"}`,
            Telefone: `${telefone}`,
            FreteEntrega: `${freteEntrega}`,
            ...(tipoTransacao === "Aluguel" && {
              FreteRetirada: `${freteRetirada}`,
            }),
            ...(tipoTransacao === "Aluguel" && {
              PeriodoMinimo: `${periodoMinimo}`,
            }),
            LocalUtilizacao: `${localUtilizacao}`,
            DepositoRetirada: `${depositoRetirada}`,
            TipoTransacao: `${tipoTransacao}`,
            Obs: `${obs}`,
            Produtos: filterProducts.map((input) => ({
              Produto: input.produto,
              Quantidade: input.quantidade,
              Valor: input.valor,
              Medidas: input.medidas,
            })),
          }),
        }
      );
      if (req.ok) {
        setShowAlert({
          severity: "success",
          text: "Orçamento gerado com sucesso",
          show: true,
        });
      } else {
        setShowAlert({
          severity: "error",
          text: "Erro interno na requisição",
          show: true,
        });
      }
    } else {
      setShowAlert({
        severity: "error",
        text: "Preencha os campos para gerar Orçamento",
        show: true,
      });
    }
    setLoadReqText(false);
  };

  const tabs = [
    {
      title: "Configurar Orçamento",
      content: (
        <>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Atendente*
          </label>
          <select
            className="mb-4 h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
            value={attendent}
            onChange={(e) => setAttendent(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="Matheus">Matheus</option>
            <option value="Patricia">Patricia</option>
            <option value="Nathalia">Nathalia</option>
            <option value="Teste">Teste</option>
          </select>

          <label className="mt-4 block text-sm/6 font-bold text-gray-900">
            Modelo Contrato*
          </label>
          <select
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            value={modalOrder}
            onChange={(e) => setModalOrder(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="Reefer20">Reefer 20</option>
            <option value="Reefer40">Reefer 40</option>
            <option value="Dry / Modular">Dry / Modular</option>
            <option value="Dry Baby">Dry Baby</option>
          </select>

          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Tipo de Transação*
          </label>
          {/* teste */}
          <select
            className="mb-4 h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
            value={tipoTransacao}
            onChange={(e) => setTipoTransacao(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="Venda">Venda</option>
            <option value="Aluguel">Aluguel</option>
          </select>
        </>
      ),
      index: 1,
    },
    {
      title: "Informações Cliente",
      content: (
        <>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Nome / Empresa*
          </label>
          <input
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            placeholder="Cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />

          <label className="mt-4 block text-sm/6 font-bold text-gray-900">
            Email*
          </label>
          <input
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-4 block text-sm/6 font-bold text-gray-900">
            Telefone*
          </label>
          <input
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            placeholder="Telefone"
            type="number"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <label className="mt-4 block text-sm/6 font-bold text-gray-900">
            CNPJ da Empresa*
          </label>
          <input
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            placeholder="CNPJ da Empresa"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
        </>
      ),
      index: 2,
    },
    {
      title: "Produto",
      content: (
        <>
          {prodInputs.map((input, index) => (
            <div key={index}>
              <div className="flex gap-10 mt-10 mb-10">
                <h1 className="text-md font-bold">
                  Produto -{" "}
                  <span className="font-light text-md">{index + 1}</span>
                </h1>
                {index > 0 ? (
                  <button
                    className="active:scale-105"
                    onClick={() => deleteProduct(index)}
                  >
                    <FaDeleteLeft size={25} />
                  </button>
                ) : null}
              </div>
              <label className="mt-4 block text-sm/6 font-bold text-gray-900">
                Produto*
              </label>
              <input
                className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
                placeholder="Produto"
                value={input.produto}
                onChange={(e) =>
                  handleInputChange(index, "produto", e.target.value)
                }
              />
              <label className="mt-4 block text-sm/6 font-bold text-gray-900">
                Medidas*
              </label>
              <select
                className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                value={input.medidas}
                onChange={(e) =>
                  handleInputChange(index, "medidas", e.target.value)
                }
              >
                <option value="">Selecione...</option>
                <option value="3,0m x 2,44m x 2,60m (Dry Baby)">
                  3,0m x 2,44m x 2,60m (Dry Baby)
                </option>
                <option value="6,06m x 2,44m x 2,59m (20ST)">
                  6,06m x 2,44m x 2,59m (20ST)
                </option>
                <option value="6,06m x 2,44m x 2,90m (20HC)">
                  6,06m x 2,44m x 2,90m (20HC)
                </option>
                <option value="12,19m x 2,44m x 2,59m (40ST)">
                  12,19m x 2,44m x 2,59m (40ST)
                </option>
                <option value="12,19m x 2,44m x 2,90m (40HC)">
                  12,19m x 2,44m x 2,90m (40HC)
                </option>
              </select>
              <label className="mt-4 block text-sm/6 font-bold text-gray-900">
                Quantidade*
              </label>
              <input
                className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
                placeholder="Quantidade"
                type="number"
                min={1}
                value={input.quantidade}
                onChange={(e) =>
                  handleInputChange(index, "quantidade", e.target.value)
                }
              />
              <label className="mt-4 block text-sm/6 font-bold text-gray-900">
                Valor*
              </label>
              <CurrencyInput
                id="input-example"
                className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                name="valor"
                placeholder="R$0,00"
                prefix="R$"
                defaultValue={1}
                decimalsLimit={2}
                value={input.valor}
                onValueChange={(value, name) =>
                  handleInputChange(index, name, value)
                }
              />
            </div>
          ))}
          <button
            onClick={() => addNewProduct()}
            className="text-xl bg-transparent mt-10 h-14 flex w-full justify-center items-center px-3 py-1.5  font-semibold text-white shadow-sm focus-visible:outline"
          >
            <IoAddCircle size={40} className="text-black" />
          </button>
        </>
      ),
      index: 3,
    },
    {
      title: "Frete",
      content: (
        <>
          {tipoTransacao === "Aluguel" ? (
            <>
              <label className="mt-4 block text-sm/6 font-bold text-gray-900">
                Deposito Retirada*
              </label>
              <input
                className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                placeholder="Deposito Retirada"
                value={depositoRetirada}
                onChange={(e) => setDepositoRetirada(e.target.value)}
              />
            </>
          ) : null}

          <label className="mt-4 block text-sm/6 font-bold text-gray-900">
            Local de utilização*
          </label>
          <input
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            placeholder="Local de utilização"
            value={localUtilizacao}
            onChange={(e) => setLocalUtilizacao(e.target.value)}
          />

          <label className="mt-4 block text-sm/6 font-bold text-gray-900">
            Frete de Entrega*
          </label>
          <CurrencyInput
            id="frete-entrega"
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            name="freteEntrega"
            placeholder="Frete Entrega"
            prefix="R$"
            decimalsLimit={2}
            allowNegativeValue={false}
            allowDecimals={true}
            value={freteEntrega}
            onValueChange={(value) => setFreteEntrega(value ?? "")}
          />
          {tipoTransacao === "Aluguel" ? (
            <>
              <label className="mt-4 block text-sm/6 font-bold text-gray-900">
                Frete Retirada*
              </label>
              <CurrencyInput
                id="frete-retirada"
                className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                name="freteRetirada"
                placeholder="Frete Retirada"
                prefix="R$"
                decimalsLimit={2}
                allowNegativeValue={false}
                allowDecimals={true}
                value={freteRetirada}
                onValueChange={(value) => setFreteRetirada(value ?? "")}
              />
            </>
          ) : null}

          {tipoTransacao === "Aluguel" ? (
            <>
              <label className="mt-4 block text-sm/6 font-bold text-gray-900">
                Período Mínimo de Locação (meses)*
              </label>
              <input
                className="h-12 block w-full  bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                placeholder="Período Mínimo de Locação"
                type="number"
                min={1}
                value={periodoMinimo}
                onChange={(e) => setPeriodoMinimo(e.target.value)}
              />
            </>
          ) : null}
        </>
      ),
      index: 4,
    },
    {
      title: "Observação",
      content: (
        <>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Observação
          </label>
          <textarea
            className="mb-4 block w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            value={obs}
            rows={5}
            onChange={(e) => setObs(e.target.value)}
          ></textarea>
        </>
      ),
      index: 5,
    },
  ];

  const next = () => {
    let newActive = activeTab + 1;

    console.log(activeTab);
    if (newActive >= tabs.length) {
      newActive = 0; // Se ultrapassar o índice máximo, volta para 0
    }

    // Atualizando o estado com o novo índice
    setActiveTab(newActive);
  };

  const prev = () => {
    let newActive = activeTab - 1;

    console.log(activeTab);
    if (newActive >= tabs.length) {
      newActive = 0; // Se ultrapassar o índice máximo, volta para 0
    }

    // Atualizando o estado com o novo índice
    setActiveTab(newActive);
  };

  return (
    <MyContext.Provider
      value={{
        attendent,
        setAttendent,
        modalOrder,
        setModalOrder,
        cliente,
        setCliente,
        email,
        setEmail,
        cnpj,
        setCnpj,
        telefone,
        setTelefone,
        freteEntrega,
        setFreteEntrega,
        freteRetirada,
        setFreteRetirada,
        periodoMinimo,
        setPeriodoMinimo,
        localUtilizacao,
        setLocalUtilizacao,
        depositoRetirada,
        setDepositoRetirada,
        obs,
        tipoTransacao,
        prodInputs,
        errorReq,
        showAlert,
        setShowAlert,
        setObs,
        requisiton,
        loadReqText,
      }}
    >
      <div className="flex justify-center bg-white">
        <motion.div
          key={tabs[activeTab].index}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 0.4 } }}
          exit={{ x: -200, opacity: 0 }}
        >
          <div className="w-[450px] h-full flex justify-center flex-col items-center">
            {/* Abas de navegação */}
            <div className="flex space-x-4 mb-6 w-full">
              {/* {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`px-4 py-2 ${activeTab === index ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-black'} rounded-md`}
                        >
                            {tab.title}
                        </button>
                    ))} */}

              <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-bold">{tabs[activeTab].title}</h1>
                <h4 className="text-md">
                  {tabs[activeTab].index} /{" "}
                  <span className="font-bold">{tabs.length}</span>
                </h4>
              </div>
            </div>
            <div className="w-full bg-transparent flex gap-4 text-sm pb-4">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`bg-black h-3 w-3 rounded-full ${
                    activeTab === index
                      ? "bg-black text-white font-bold"
                      : "bg-gray-200 text-black"
                  }`}
                ></button>
              ))}
            </div>

            <form
              className="flex  w-full justify-center flex-col overflow-y-auto overscroll-auto  p-2"
              method="POST"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="max-h-[400px]">{tabs[activeTab].content}</div>
            </form>
            <div className="mt-2 py-12 w-full flex justify-around gap-10">
              <button
                onClick={() => clearForm()}
                className="h-14 flex w-full shadow-xl

justify-around  items-center bg-transparent border border-black px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-black hover:text-white focus-visible:outline
active:scale-105"
              >
                Limpar Tudo
                <LiaTrashAlt className="text-2xl" />
              </button>
              <div className="flex gap-1">
                <button onClick={() => prev()} className="">
                  <IoIosArrowDropleftCircle className="text-5xl" />
                </button>
                <button onClick={() => next()} className="">
                  <IoIosArrowDroprightCircle className="text-5xl" />
                </button>
              </div>
              {/* {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 mt-3 border-b ${
                  activeTab === index
                    ? "bg-black text-white"
                    : "bg-transparent text-black"
                }`}
              >
                <span className="text-xs">{tab.title}</span>
              </button>
            ))} */}
            </div>

            {/* <div className="flex flex-col w-1/2">
                    {tabs[activeTab].content}
                    <div className="mt-2 py-12">
                        <button onClick={()=>next()}className="h-14 flex w-full justify-center rounded-md items-center bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline">
                           Próximo
                        </button>
                    </div>
                </div> */}
          </div>
        </motion.div>
      </div>
      <Resume />
    </MyContext.Provider>
  );
}
