"use client";

import React from "react";
import { Check, X, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface CustomToastProps {
  t: string | number;
  type: "success" | "error";
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const CustomToast = ({
  t,
  type,
  title,
  description,
  action,
}: CustomToastProps) => {
  return (
    <div className="flex items-start w-full gap-3 p-4 bg-zinc-950 border border-zinc-800 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] min-w-[340px] relative overflow-hidden group dark:bg-white dark:border-gray-200 dark:shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
      {/* Background Glow Effect */}
      <div
        className={`absolute top-0 left-0 w-full h-full opacity-[0.05] dark:opacity-[0.02] pointer-events-none ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        }`}
      />

      {/* Icon */}
      <div className="shrink-0 relative mt-0.5">
        {type === "success" ? (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-900/30 border border-green-800/50 text-green-400 dark:bg-green-50 dark:border-green-100 dark:text-green-600">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        ) : (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-900/30 border border-red-800/50 text-red-400 dark:bg-red-50 dark:border-red-100 dark:text-red-600">
            <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 pt-0.5 pr-6">
        <h3 className="text-[14px] font-semibold text-zinc-50 leading-tight mb-1 dark:text-gray-900">
          {title}
        </h3>
        {description && (
          <p className="text-[13px] text-zinc-400 font-normal leading-relaxed dark:text-gray-500">
            {description}
          </p>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={() => {
          if (action) action.onClick();
          toast.dismiss(t);
        }}
        className="absolute top-3 right-3 p-1 rounded-full text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-all duration-200 dark:text-gray-400 dark:hover:text-gray-600 dark:hover:bg-gray-100"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

// Helper function for easy usage
export const showToast = {
  success: (title: string, description?: string) => {
    toast.custom((t) => (
      <CustomToast
        t={t}
        type="success"
        title={title}
        description={description}
        action={{ label: "Entendi", onClick: () => {} }}
      />
    ));
  },
  error: (title: string, description?: string) => {
    toast.custom((t) => (
      <CustomToast
        t={t}
        type="error"
        title={title}
        description={description}
        action={{ label: "Fechar", onClick: () => {} }}
      />
    ));
  },
};
