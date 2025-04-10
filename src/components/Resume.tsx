"use client";
import { useContext } from "react";
import { MyContext } from "./forms";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { AiOutlineLoading } from "react-icons/ai";
import { OrbitProgress } from "react-loading-indicators";
import { motion } from "motion/react";
import { LiaFileAlt } from "react-icons/lia";

export default function Resume() {
  const context = useContext(MyContext);

  if (!context) {
    return null;
  }
  const {
    attendent,
    modalOrder,
    cliente,
    email,
    telefone,
    cnpj,
    freteEntrega,
    freteRetirada,
    periodoMinimo,
    localUtilizacao,
    depositoRetirada,
    obs,
    tipoTransacao,
    errorReq,
    prodInputs,
    showAlert,
    setShowAlert,
    requisiton,
    loadReqText,
  } = context;

  function closeAlert() {
    setShowAlert({
      severity: "success",
      text: "",
      show: false,
    });
  }

  return (
    <div className="flex items-center flex-col lg:justify-center bg-white">
      {showAlert.show && (
        <motion.div
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1, transition: { duration: 0.3 } }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <Alert
            severity={showAlert.severity}
            className="flex relative bottom-4 w-[450px]"
            onClose={closeAlert}
          >
            <span className="text-xs">{showAlert.text}</span>
          </Alert>
        </motion.div>
      )}
      <div className="w-[400px] lg:h-[600px] p-10 bg-white border flex justify-center flex-col items-center gap-10">
        <div className="w-full ">
          <h1 className="text-2xl text-center">
            <span className="font-bold">Res</span>umo
          </h1>
          <p className="opacity-50 text-sm text-justify w-72 mt-8">
            Confira e confirme os dados inseridos antes de prosseguir com a
            ação.
          </p>
        </div>
        <div className="h-[300px] overflow-y-auto flex flex-col gap-3  w-full py-6">
          {/* Atendente */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Atendente:</h4>
            <h4 className="font-light text-sm">
              {attendent || "Não informado"}
            </h4>
          </div>

          {/* Modelo Contrato */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Modelo Contrato:</h4>
            <h4 className="font-light text-sm">
              {modalOrder || "Não informado"}
            </h4>
          </div>

          {/* Tipo Transação */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Tipo Transação:</h4>
            <h4 className="font-light text-sm">
              {tipoTransacao || "Não informado"}
            </h4>
          </div>

          {/* Nome / Empresa */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Nome / Empresa:</h4>
            <h4 className="font-light text-sm">{cliente || "Não informado"}</h4>
          </div>

          {/* Email */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Email:</h4>
            <h4 className="font-light text-sm">{email || "Não informado"}</h4>
          </div>

          {/* Telefone */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Telefone:</h4>
            <h4 className="font-light text-sm">
              {telefone || "Não informado"}
            </h4>
          </div>

          {/* CNPJ da Empresa */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">CNPJ da Empresa:</h4>
            <h4 className="font-light text-sm">{cnpj || "Não informado"}</h4>
          </div>

          {prodInputs.map((product, index) => (
            <div key={index}>
              <h4 className="font-bold text-sm">Produto {index + 1}:</h4>
              <h4 className="font-light text-sm">
                Produto= {product.produto || "Não informado"}
              </h4>
              <h4 className="font-light text-sm">
                Medidas= {product.medidas || "Não informado"}
              </h4>
              <h4 className="font-light text-sm">
                Quantidade= {product.quantidade || "Não informado"}
              </h4>
              <h4 className="font-light text-sm">
                Valor={`R$ ${product.valor}` || "Não informado"}
              </h4>
            </div>
          ))}

          {/* Deposito Retirada */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Deposito Retirada:</h4>
            <h4 className="font-light text-sm">
              {depositoRetirada || "Não informado"}
            </h4>
          </div>

          {/* Local de utilização */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Local de utilização:</h4>
            <h4 className="font-light text-sm">
              {localUtilizacao || "Não informado"}
            </h4>
          </div>

          {/* Frete de Entrega */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Frete de Entrega:</h4>
            <h4 className="font-light text-sm">
              {`R$ ${freteEntrega}` || "Não informado"}
            </h4>
          </div>

          {/* Frete Retirada */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Frete Retirada:</h4>
            <h4 className="font-light text-sm">
              {`R$ ${freteRetirada}` || "Não informado"}
            </h4>
          </div>

          {/* Período Minimo */}
          {tipoTransacao == "Aluguel" && (
            <div className="flex gap-2 mb-2">
              <h4 className="font-bold text-sm">Périodo Mínimo de Locação:</h4>
              <h4 className="font-light text-sm">
                {`${periodoMinimo} meses` || "Não informado"}
              </h4>
            </div>
          )}

          {/* Observação */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Observação:</h4>
            <h4 className="font-light text-sm">{obs || "Não informado"}</h4>
          </div>
        </div>
        <button
          onClick={requisiton}
          className="h-14 relative top-2 flex w-full justify-center gap-5 items-center bg-transparent border border-black px-3 py-1.5 text-sm/6 font-semibold hover:text-white shadow-sm hover:bg-black active:scale-105 focus-visible:outline"
        >
          {loadReqText ? (
            <>
              <AiOutlineLoading className="animate-spin" />
              Gerando Orçamento...
            </>
          ) : (
            <>
              Gerar Orçamento
              <LiaFileAlt className="text-2xl" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
