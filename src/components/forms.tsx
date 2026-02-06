"use client";
import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";
import { IoAddCircle } from "react-icons/io5";
import { showToast } from "./ui/CustomToast";
import Resume from "./Resume";
import { LiaTrashAlt } from "react-icons/lia";
import CurrencyInput from "react-currency-input-field";
import DashboardLayout from "./layout/DashboardLayout";
import Button from "./ui/Button";
import {
  FileText,
  FilePlus,
  Settings,
  User,
  Package,
  Truck,
  MessageSquare,
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  Mail,
  Phone,
  Ruler,
  Hash,
  DollarSign,
  MapPin,
  Calendar,
  ArrowRightLeft,
} from "lucide-react";

import { MyContext } from "../context/FormContext";

// Custom UI Components for "Clean and Elegant" look
const InputLabel = ({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) => (
  <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
    {children}
    {required && <span className="text-destructive ml-1">*</span>}
  </label>
);

const SmoothInput = ({
  icon: Icon,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ElementType;
}) => (
  <div className="relative w-full">
    {Icon && (
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
        <Icon className="h-5 w-5" strokeWidth={1.3} />
      </div>
    )}
    <input
      {...props}
      className={`w-full h-12 rounded-lg border border-input bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 text-sm shadow-sm hover:border-accent-foreground/50 ${
        Icon ? "pl-10 pr-4" : "px-4"
      } ${className || ""}`}
    />
  </div>
);

const SmoothSelect = ({
  icon: Icon,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  icon?: React.ElementType;
}) => (
  <div className="relative w-full">
    {Icon && (
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground z-10">
        <Icon className="h-5 w-5" strokeWidth={1.3} />
      </div>
    )}
    <select
      {...props}
      className={`w-full h-12 pr-10 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 text-sm appearance-none cursor-pointer shadow-sm hover:border-accent-foreground/50 [&>option]:bg-card [&>option]:text-foreground ${
        Icon ? "pl-10" : "pl-4"
      } ${className || ""}`}
    >
      {children}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-muted-foreground">
      <ChevronRight className="h-4 w-4 rotate-90" strokeWidth={1.3} />
    </div>
  </div>
);

const SmoothCurrencyInput = ({ icon: Icon, className, ...props }: any) => (
  <div className="relative w-full">
    {Icon && (
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
        <Icon className="h-5 w-5" strokeWidth={1.3} />
      </div>
    )}
    <CurrencyInput
      {...props}
      className={`w-full h-12 rounded-lg border border-input bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 text-sm shadow-sm hover:border-accent-foreground/50 ${
        Icon ? "pl-10 pr-4" : "px-4"
      } ${className || ""}`}
    />
  </div>
);

const SmoothTextArea = ({
  icon: Icon,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  icon?: React.ElementType;
}) => (
  <div className="relative w-full">
    {Icon && (
      <div className="absolute top-4 left-3 pointer-events-none text-muted-foreground">
        <Icon className="h-5 w-5" strokeWidth={1.3} />
      </div>
    )}
    <textarea
      {...props}
      className={`w-full p-4 rounded-lg border border-input bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 text-sm resize-none shadow-sm hover:border-accent-foreground/50 ${
        Icon ? "pl-10" : ""
      } ${className || ""}`}
    />
  </div>
);

export default function FormTemplate() {
  let [activeTab, setActiveTab] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  interface Produto {
    produto: string;
    medidas: string;
    quantidade: string;
    valor: string;
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
    setActiveTab(0);
    setProdInputs([
      {
        produto: "",
        medidas: "",
        quantidade: "1",
        valor: "0",
      },
    ]);
    showToast.success("Sucesso!", "Formulário limpo com sucesso!");
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
          produto.medidas.trim() !== "",
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
        },
      );
      setIsResumeOpen(false); // Close drawer first
      setTimeout(() => {
        if (req.ok) {
          showToast.success("Sucesso!", "Orçamento gerado com sucesso");
        } else {
          showToast.error("Erro!", "Erro interno na requisição");
        }
      }, 600);
    } else {
      setIsResumeOpen(false); // Close drawer for validation error too
      setTimeout(() => {
        showToast.error("Atenção!", "Preencha os campos para gerar Orçamento");
      }, 600);
    }
    setLoadReqText(false);
  };

  const tabIcons = [Settings, User, Package, Truck, MessageSquare];

  const tabs = [
    {
      title: "Configurar Orçamento",
      content: (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InputLabel required>Atendente</InputLabel>
              <SmoothSelect
                value={attendent}
                icon={User}
                onChange={(e) => setAttendent(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="Matheus">Matheus</option>
                <option value="Patricia">Patricia</option>
                <option value="Nathalia">Nathalia</option>
                <option value="Juliana">Juliana</option>
                <option value="Luana">Luana</option>
                <option value="Vitor">Vitor</option>
                <option value="Sabrina">Sabrina</option>
                <option value="Teste">Teste</option>
              </SmoothSelect>
            </div>

            <div>
              <InputLabel required>Modelo Contrato</InputLabel>
              <SmoothSelect
                value={modalOrder}
                icon={FileText}
                onChange={(e) => setModalOrder(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="Reefer20">Reefer 20</option>
                <option value="Reefer40">Reefer 40</option>
                <option value="Dry / Modular">Dry / Modular</option>
                <option value="Dry Baby">Dry Baby</option>
              </SmoothSelect>
            </div>

            <div className="md:col-span-2">
              <InputLabel required>Tipo de Transação</InputLabel>
              <SmoothSelect
                value={tipoTransacao}
                icon={ArrowRightLeft}
                onChange={(e) => setTipoTransacao(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="Venda">Venda</option>
                <option value="Aluguel">Aluguel</option>
              </SmoothSelect>
            </div>
          </div>
        </>
      ),
      index: 1,
    },
    {
      title: "Informações Cliente",
      content: (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <InputLabel required>Nome / Empresa</InputLabel>
              <SmoothInput
                placeholder="Nome ou Empresa"
                value={cliente}
                icon={User}
                onChange={(e) => setCliente(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <InputLabel required>Email</InputLabel>
              <SmoothInput
                placeholder="email@exemplo.com"
                value={email}
                icon={Mail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <InputLabel required>Telefone</InputLabel>
              <SmoothInput
                placeholder="(00) 00000-0000"
                type="number"
                value={telefone}
                icon={Phone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            <div>
              <InputLabel required>CNPJ da Empresa</InputLabel>
              <SmoothInput
                placeholder="00.000.000/0000-00"
                value={cnpj}
                icon={FileText}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </div>
          </div>
        </>
      ),
      index: 2,
    },
    {
      title: "Produto",
      content: (
        <>
          {prodInputs.map((input, index) => (
            <div
              key={index}
              className="mb-8 p-6 bg-card rounded-xl border border-border shadow-sm"
            >
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                  Dados do Produto
                </h1>
                {index > 0 && (
                  <button
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    onClick={() => deleteProduct(index)}
                    title="Remover Produto"
                  >
                    <FaDeleteLeft size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <InputLabel required>Produto</InputLabel>
                  <SmoothInput
                    placeholder="Nome do Produto"
                    value={input.produto}
                    icon={Package}
                    onChange={(e) =>
                      handleInputChange(index, "produto", e.target.value)
                    }
                  />
                </div>

                <div>
                  <InputLabel required>Medidas</InputLabel>
                  <SmoothSelect
                    value={input.medidas}
                    icon={Ruler}
                    onChange={(e) =>
                      handleInputChange(index, "medidas", e.target.value)
                    }
                  >
                    <option value="">Selecione...</option>
                    <option value="3,0m x 2,44m x 2,60m (CxLxA)">
                      3,0m x 2,44m x 2,60m (CxLxA)
                    </option>
                    <option value="6,06m x 2,44m x 2,59m (CxLxA)">
                      6,06m x 2,44m x 2,59m (20ST)
                    </option>
                    <option value="6,06m x 2,44m x 2,90m (CxLxA)">
                      6,06m x 2,44m x 2,90m (20HC)
                    </option>
                    <option value="12,19m x 2,44m x 2,59m (CxLxA)">
                      12,19m x 2,44m x 2,59m (40ST)
                    </option>
                    <option value="12,19m x 2,44m x 2,90m (CxLxA)">
                      12,19m x 2,44m x 2,90m (40HC)
                    </option>
                  </SmoothSelect>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputLabel required>Quantidade</InputLabel>
                    <SmoothInput
                      placeholder="1"
                      type="number"
                      min={1}
                      value={input.quantidade}
                      icon={Hash}
                      onChange={(e) =>
                        handleInputChange(index, "quantidade", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <InputLabel required>Valor</InputLabel>
                    <SmoothCurrencyInput
                      id={`valor-${index}`}
                      name="valor"
                      placeholder="R$ 0,00"
                      prefix="R$ "
                      defaultValue={1}
                      decimalsLimit={2}
                      value={input.valor}
                      icon={DollarSign}
                      onValueChange={(
                        value: string | undefined,
                        name: string | undefined,
                      ) => handleInputChange(index, name, value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => addNewProduct()}
            className="w-full h-14 border border-dashed border-border rounded-xl flex items-center justify-center gap-2 text-muted-foreground font-medium hover:border-primary hover:text-primary hover:bg-accent transition-all duration-200"
          >
            <IoAddCircle className="h-6 w-6" />
            Adicionar Outro Produto
          </button>
        </>
      ),
      index: 3,
    },
    {
      title: "Frete e Logística",
      content: (
        <>
          <div className="space-y-6">
            {tipoTransacao === "Aluguel" && (
              <div>
                <InputLabel required>Deposito Retirada</InputLabel>
                <SmoothInput
                  placeholder="Local de Retirada"
                  value={depositoRetirada}
                  icon={MapPin}
                  onChange={(e) => setDepositoRetirada(e.target.value)}
                />
              </div>
            )}

            <div>
              <InputLabel required>Local de utilização</InputLabel>
              <SmoothInput
                placeholder="Endereço de utilização"
                value={localUtilizacao}
                icon={MapPin}
                onChange={(e) => setLocalUtilizacao(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InputLabel required>Frete de Entrega</InputLabel>
                <SmoothCurrencyInput
                  id="frete-entrega"
                  name="freteEntrega"
                  placeholder="R$ 0,00"
                  prefix="R$ "
                  decimalsLimit={2}
                  allowNegativeValue={false}
                  allowDecimals={true}
                  value={freteEntrega}
                  icon={Truck}
                  onValueChange={(value: string | undefined) =>
                    setFreteEntrega(value ?? "")
                  }
                />
              </div>

              {tipoTransacao === "Aluguel" && (
                <div>
                  <InputLabel required>Frete Retirada</InputLabel>
                  <SmoothCurrencyInput
                    id="frete-retirada"
                    name="freteRetirada"
                    placeholder="R$ 0,00"
                    prefix="R$ "
                    decimalsLimit={2}
                    allowNegativeValue={false}
                    allowDecimals={true}
                    value={freteRetirada}
                    icon={Truck}
                    onValueChange={(value: string | undefined) =>
                      setFreteRetirada(value ?? "")
                    }
                  />
                </div>
              )}
            </div>

            {tipoTransacao === "Aluguel" && (
              <div>
                <InputLabel required>
                  Período Mínimo de Locação (meses)
                </InputLabel>
                <SmoothInput
                  placeholder="Ex: 12"
                  type="number"
                  min={1}
                  value={periodoMinimo}
                  icon={Calendar}
                  onChange={(e) => setPeriodoMinimo(e.target.value)}
                />
              </div>
            )}
          </div>
        </>
      ),
      index: 4,
    },
    {
      title: "Observações Finais",
      content: (
        <>
          <div className="space-y-6">
            <div>
              <InputLabel>Observação</InputLabel>
              <SmoothTextArea
                placeholder="Digite aqui observações adicionais sobre o orçamento..."
                value={obs}
                rows={8}
                icon={MessageSquare}
                onChange={(e) => setObs(e.target.value)}
              />
            </div>
          </div>
        </>
      ),
      index: 5,
    },
  ];

  const next = () => {
    let newActive = activeTab + 1;

    if (newActive >= tabs.length) {
      setIsResumeOpen(true);
      return;
    }

    // Atualizando o estado com o novo índice
    setActiveTab(newActive);
  };

  const prev = () => {
    let newActive = activeTab - 1;

    if (newActive < 0) {
      newActive = tabs.length - 1;
    }

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
        setObs,
        requisiton,
        loadReqText,
      }}
    >
      <DashboardLayout>
        <div className="min-h-screen bg-background/50 p-6 md:p-12 font-sans">
          <div className="max-w-5xl mx-auto w-full">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-start mb-8 gap-8">
              <div>
                <h1 className="text-2xl font-semibold text-foreground tracking-tight flex items-center gap-3">
                  <FilePlus className="h-6 w-6" strokeWidth={1.3} />
                  Gerar Orçamento
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Gerencie e crie novas propostas comerciais.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => clearForm()}
                  className="flex items-center gap-2 bg-card border border-border text-foreground px-6 py-3.5 rounded-lg font-medium transition-all text-sm shadow-sm hover:shadow hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LiaTrashAlt className="h-5 w-5 text-destructive" />
                  <span>Limpar</span>
                </button>
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className="flex items-center gap-2 bg-card border border-border text-foreground px-6 py-3.5 rounded-lg font-medium transition-all text-sm shadow-sm hover:shadow hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-500"
                >
                  <FileText
                    className="h-5 w-5 text-blue-500"
                    strokeWidth={1.3}
                  />
                  <span>Resumo Orçamento</span>
                </button>
              </div>
            </div>

            {/* Main Card */}
            <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden flex flex-col min-h-[600px]">
              {/* Stepper Header */}
              <div className="bg-card px-8 py-6">
                <div className="flex items-center justify-between max-w-3xl mx-auto relative mt-6">
                  {/* Connecting Line */}
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-0 -translate-y-1/2" />

                  {tabs.map((tab, index) => {
                    const isActive = activeTab === index;
                    const isCompleted = activeTab > index;

                    return (
                      <div
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className="relative z-10 flex flex-col items-center bg-card px-2 cursor-pointer group"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 border-2 
                              ${
                                isActive
                                  ? "border-primary bg-primary text-primary-foreground scale-110 shadow-md"
                                  : isCompleted
                                    ? "border-primary bg-card text-primary group-hover:bg-accent"
                                    : "border-border bg-card text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground"
                              }`}
                        >
                          {isCompleted ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <span
                          className={`text-[10px] font-medium mt-2 uppercase tracking-wider transition-colors duration-300 absolute -bottom-6 w-32 text-center
                              ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
                        >
                          {tab.title.split(" ")[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 p-8 md:p-12 overflow-y-auto mt-6">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="mb-8 text-center">
                    <h2 className="text-xl font-semibold text-foreground flex items-center justify-center gap-2">
                      {(() => {
                        const Icon = tabIcons[activeTab];
                        return <Icon className="h-6 w-6" strokeWidth={1.3} />;
                      })()}
                      {tabs[activeTab].title}
                    </h2>
                  </div>

                  <form onSubmit={(e) => e.preventDefault()}>
                    {tabs[activeTab].content}
                  </form>
                </motion.div>
              </div>

              {/* Footer Navigation */}
              <div className="px-8 py-6 border-t border-border flex justify-end items-center mt-auto gap-3">
                {activeTab > 0 && (
                  <button
                    onClick={() => prev()}
                    className="flex items-center gap-2 bg-card text-foreground border border-border px-8 py-4 rounded-lg font-medium hover:bg-accent hover:border-primary transition-all text-xs shadow-sm hover:shadow uppercase"
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={1.3} />
                    <span>Voltar</span>
                  </button>
                )}
                <button
                  onClick={() => next()}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-all text-xs shadow-md hover:shadow-lg hover:-translate-y-0.5 uppercase"
                >
                  <span>
                    {activeTab === tabs.length - 1 ? "Finalizar" : "Próxima"}
                  </span>
                  <ChevronRight className="h-4 w-4" strokeWidth={1.3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      {/* Drawer - Preview Resume */}
      <AnimatePresence mode="wait">
        {isResumeOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResumeOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-card shadow-2xl flex flex-col h-full"
            >
              <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-card">
                <h1 className="text-base font-semibold text-foreground flex items-center gap-3">
                  <FileText
                    className="w-5 h-5 text-blue-500"
                    strokeWidth={1.3}
                  />
                  Resumo do Orçamento
                </h1>
                <button
                  onClick={() => setIsResumeOpen(false)}
                  className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground border border-border"
                >
                  <X className="w-5 h-5" strokeWidth={1.3} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-muted/30">
                <Resume />
              </div>

              <div className="px-6 py-6 border-t border-border bg-card">
                <Button
                  onClick={requisiton}
                  isLoading={loadReqText}
                  className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm flex items-center justify-center gap-3 rounded-xl text-sm font-medium tracking-wide"
                >
                  Gerar Orçamento
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MyContext.Provider>
  );
}
