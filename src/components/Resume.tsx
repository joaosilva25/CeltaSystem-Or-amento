"use client";
import { useContext } from "react";
import { MyContext } from "../context/FormContext";
import {
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  Truck,
  MapPin,
  Calendar,
  MessageSquare,
  Package,
  CreditCard,
  DollarSign,
  Box,
} from "lucide-react";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 mt-6 first:mt-0 flex items-center gap-2">
    {children}
  </h3>
);

const ResumeItem = ({
  icon: Icon,
  label,
  value,
  subValue,
}: {
  icon: any;
  label: string;
  value: string | number | null;
  subValue?: string;
}) => (
  <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-accent transition-colors duration-200 group">
    <div className="p-2 bg-muted rounded-lg text-muted-foreground group-hover:bg-background group-hover:text-foreground group-hover:shadow-sm transition-all duration-200 border border-transparent group-hover:border-border">
      <Icon className="w-5 h-5" strokeWidth={1.3} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-muted-foreground mb-0.5">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground truncate">
        {value || "Não informado"}
      </p>
      {subValue && (
        <p className="text-xs text-muted-foreground mt-0.5">{subValue}</p>
      )}
    </div>
  </div>
);

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
    prodInputs,
  } = context;

  const formatCurrency = (value: string | number) => {
    if (!value) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value));
  };

  return (
    <div className="flex flex-col h-full text-card-foreground">
      <div className="flex-1 space-y-8 p-6">
        {/* Informações Gerais */}
        <div>
          <SectionTitle>Dados Gerais</SectionTitle>
          <div className="bg-card rounded-xl p-4 border border-border grid grid-cols-1 gap-1">
            <ResumeItem icon={User} label="Atendente" value={attendent} />
            <ResumeItem
              icon={FileText}
              label="Modelo de Contrato"
              value={modalOrder}
            />
            <ResumeItem
              icon={CreditCard}
              label="Tipo de Transação"
              value={tipoTransacao}
            />
          </div>
        </div>

        {/* Informações do Cliente */}
        <div>
          <SectionTitle>Cliente</SectionTitle>
          <div className="bg-card rounded-xl p-4 border border-border grid grid-cols-1 gap-1">
            <ResumeItem
              icon={Building2}
              label="Nome / Empresa"
              value={cliente}
              subValue={cnpj ? `CNPJ: ${cnpj}` : undefined}
            />
            <ResumeItem icon={Mail} label="Email" value={email} />
            <ResumeItem icon={Phone} label="Telefone" value={telefone} />
          </div>
        </div>

        {/* Produtos */}
        <div>
          <SectionTitle>Produtos Selecionados</SectionTitle>
          <div className="space-y-4">
            {prodInputs.map((product, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {product.produto || "Produto Sem Nome"}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3 pl-7">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Box
                      className="w-4 h-4 text-muted-foreground"
                      strokeWidth={1.3}
                    />
                    <span>{product.medidas || "Medidas não inf."}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Package
                      className="w-4 h-4 text-muted-foreground"
                      strokeWidth={1.3}
                    />
                    <span>{product.quantidade} unidade(s)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <DollarSign
                      className="w-4 h-4 text-muted-foreground"
                      strokeWidth={1.3}
                    />
                    <span>{formatCurrency(product.valor)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logística */}
        <div>
          <SectionTitle>Logística e Entrega</SectionTitle>
          <div className="bg-card rounded-xl p-4 border border-border grid grid-cols-1 gap-1">
            <ResumeItem
              icon={MapPin}
              label="Local de Utilização"
              value={localUtilizacao}
            />
            <ResumeItem
              icon={Truck}
              label="Frete de Entrega"
              value={formatCurrency(freteEntrega)}
            />
            {tipoTransacao === "Aluguel" && (
              <>
                <ResumeItem
                  icon={Truck}
                  label="Frete de Retirada"
                  value={formatCurrency(freteRetirada)}
                />
                <ResumeItem
                  icon={Calendar}
                  label="Período Mínimo"
                  value={periodoMinimo ? `${periodoMinimo} meses` : null}
                />
                <ResumeItem
                  icon={Building2}
                  label="Depósito de Retirada"
                  value={depositoRetirada}
                />
              </>
            )}
          </div>
        </div>

        {/* Observações */}
        {obs && (
          <div>
            <SectionTitle>Observações</SectionTitle>
            <div className="bg-muted/50 rounded-xl p-4 border border-border flex gap-3">
              <MessageSquare
                className="w-5 h-5 text-muted-foreground shrink-0"
                strokeWidth={1.3}
              />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {obs}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
