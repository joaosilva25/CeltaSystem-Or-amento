import React, { Dispatch, SetStateAction } from "react";

interface Produto {
  produto: string;
  medidas: string;
  quantidade: string;
  valor: string;
}

export interface MyContextType {
  attendent: string;
  setAttendent: Dispatch<SetStateAction<string>>;
  modalOrder: string;
  setModalOrder: Dispatch<SetStateAction<string>>;
  cliente: string;
  setCliente: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  telefone: string;
  setTelefone: Dispatch<SetStateAction<string>>;
  cnpj: string;
  setCnpj: Dispatch<SetStateAction<string>>;
  freteEntrega: string;
  setFreteEntrega: Dispatch<SetStateAction<string>>;
  freteRetirada: string;
  setFreteRetirada: Dispatch<SetStateAction<string>>;
  periodoMinimo: string;
  setPeriodoMinimo: Dispatch<SetStateAction<string>>;
  localUtilizacao: string;
  setLocalUtilizacao: Dispatch<SetStateAction<string>>;
  depositoRetirada: string;
  setDepositoRetirada: Dispatch<SetStateAction<string>>;
  obs: string;
  setObs: Dispatch<SetStateAction<string>>;
  errorReq: boolean;
  prodInputs: Produto[];
  showAlert: {
    severity: "error" | "warning" | "info" | "success";
    text: string;
    show: boolean;
  };
  setShowAlert: Dispatch<
    SetStateAction<{
      severity: "error" | "warning" | "info" | "success";
      text: string;
      show: boolean;
    }>
  >;
  loadReqText: boolean;
  requisiton: () => void;
}
