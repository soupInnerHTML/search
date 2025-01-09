import { createContext, FC, PropsWithChildren } from "react";

import { searchStore } from "./searchStore";

interface TStoreContext {
  searchStore: typeof searchStore;
}

export const StoreContext = createContext<TStoreContext>({ searchStore });

export const StoreContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreContext.Provider value={{ searchStore }}>
      {children}
    </StoreContext.Provider>
  );
};
