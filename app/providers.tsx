// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { createContext, useEffect, useState } from "react";

export function UIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextUIProvider>{children}</NextUIProvider>
  );
}

// Context Provider

export const ArrayContext = createContext();

export const ArrayProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [array, setArray] = useState(() => {
    const storedArray = sessionStorage.getItem(
      "savedWallets"
    );
    // If 'savedWallets' data exist in localStorage, use it; otherwise, start with an empty array
    return storedArray
      ? JSON.parse(storedArray)
      : [];
  });
  useEffect(() => {
    // When 'array' changes, update it in localStorage
    sessionStorage.setItem(
      "savedWallets",
      JSON.stringify(array)
    );
  }, [array]);

  return (
    <ArrayContext.Provider
      value={{ array, setArray }}
    >
      {children}
    </ArrayContext.Provider>
  );
};
