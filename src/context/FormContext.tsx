"use client";
import { createContext } from "react";
import { MyContextType } from "../../types/MyContext";

export const MyContext = createContext<MyContextType | null>(null);
