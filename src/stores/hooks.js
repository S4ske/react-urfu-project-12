import { useContext } from "react";
import { useStore } from "zustand";

import StoresContext from "./context.js";

export const useStores = () => useContext(StoresContext);

export const useAuthStore = (selector) => useStore(useStores().authStore, selector);

export const useUiStore = (selector) => useStore(useStores().uiStore, selector);

export const useToasts = () => useStores().toasts;
