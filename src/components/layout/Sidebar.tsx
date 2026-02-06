"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import {
  FilePlus,
  Moon,
  Sun,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function Sidebar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  const sidebarVariants = {
    expanded: {
      width: "280px",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    collapsed: {
      width: "80px",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  interface NavItem {
    icon: React.ElementType;
    label: string;
    href: string;
    active: boolean;
    onClick?: () => void;
  }

  const navGroups: { label: string; items: NavItem[] }[] = [
    {
      label: "Principal",
      items: [
        {
          icon: FilePlus,
          label: "Gerar Orçamento",
          href: "/area",
          active: pathname === "/area" || pathname === "/",
        },
      ],
    },
    {
      label: "Configurações",
      items: [
        {
          icon: theme === "dark" ? Sun : Moon,
          label: theme === "dark" ? "Modo Claro" : "Modo Escuro",
          onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
          href: "#",
          active: false,
        },
      ],
    },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("authenticated");
    router.push("/login");
  };

  return (
    <motion.div
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      className={`h-screen bg-card text-card-foreground flex flex-col border-r border-border relative transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Header / Logo */}
      <div className="p-6 flex items-center h-[88px]">
        {/* Logo & Title Group */}
        <div
          className={`flex items-center gap-2 transition-all duration-300 w-full ${isCollapsed ? "justify-center" : ""}`}
        >
          <div className="w-10 h-10 bg-foreground/5 rounded-xl flex items-center justify-center shrink-0 border border-black/30 dark:border-white/30">
            <div className="relative w-6 h-6">
              <Image
                src="/CC_Negativo.png"
                alt="Logo"
                fill
                className="object-contain invert dark:invert-0"
              />
            </div>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="font-semibold text-xl tracking-tight text-foreground whitespace-nowrap overflow-hidden flex items-center"
              >
                Celta Desk ®
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stores Dropdown (Visual Only) */}
      <div
        className={`px-4 mb-6 transition-all duration-300 ${isCollapsed ? "mt-4" : ""}`}
      >
        <div
          className={`bg-muted/50 border border-border rounded-xl p-2 flex items-center transition-all duration-300 ${isCollapsed ? "justify-center w-10 h-10 p-0 mx-auto" : "gap-3"}`}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0 text-primary-foreground font-bold text-sm">
            C
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 min-w-0 overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium truncate text-foreground whitespace-nowrap">
                    Celta Containers
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2 px-3 space-y-6 overflow-x-hidden">
        {navGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.h3
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs font-medium text-muted-foreground mb-2 px-3 uppercase tracking-wider whitespace-nowrap overflow-hidden"
                >
                  {group.label}
                </motion.h3>
              )}
            </AnimatePresence>
            <div className="space-y-1">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      else if (item.href !== "#") router.push(item.href);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
                      ${
                        item.active
                          ? "bg-primary/10 text-primary" // Active state
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground" // Inactive state
                      }
                      ${isCollapsed ? "justify-center px-0" : ""}
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 ${item.active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                      strokeWidth={1.5}
                    />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="font-medium text-sm whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Active Indicator (Dot) for Collapsed State */}
                    {isCollapsed && item.active && (
                      <div className="absolute right-2 w-1.5 h-1.5 bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-3 border-t border-border mt-auto space-y-2">
        {/* Collapse Button (Footer) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-muted-foreground hover:bg-accent hover:text-foreground group ${
            isCollapsed ? "justify-center px-0" : ""
          }`}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="w-5 h-5 shrink-0" strokeWidth={1.5} />
          ) : (
            <PanelLeftClose className="w-5 h-5 shrink-0" strokeWidth={1.5} />
          )}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="font-medium text-sm whitespace-nowrap overflow-hidden"
              >
                Recolher
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-muted-foreground hover:bg-destructive/10 hover:text-destructive group ${
            isCollapsed ? "justify-center px-0" : ""
          }`}
        >
          <LogOut
            className="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-destructive"
            strokeWidth={1.5}
          />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="font-medium text-sm whitespace-nowrap overflow-hidden"
              >
                Sair
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}
