"use client";
import FormTemplate from "@/components/forms";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function Area() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!sessionStorage.getItem("authenticated")) {
        router.push("/login");
      } else {
        setAuthenticated(true);
      }
    }
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <FormTemplate />
    </motion.div>
  );
}
