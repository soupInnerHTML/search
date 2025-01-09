"use client";
import React from "react";
import { Alert } from "@nextui-org/alert";
import { observer } from "mobx-react-lite";
import { AnimatePresence, motion } from "framer-motion";

import { useStores } from "@/store";

export const SearchErrorAlert = observer(() => {
  const { searchStore } = useStores();

  return (
    <AnimatePresence>
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        className={"fixed top-4 right-4"}
        exit={{ x: 300, opacity: 0 }}
        initial={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Alert color={"danger"} title={searchStore.errorMessage} />
      </motion.div>
    </AnimatePresence>
  );
});
