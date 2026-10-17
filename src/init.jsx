import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { createNotificationsStore, Notifications } from "@mantine/notifications";
import * as Sentry from "@sentry/react";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { BrowserRouter } from "react-router";

import App from "./App.jsx";
import ErrorFallback from "./components/ErrorFallback.jsx";
import resources from "./locales/index.js";
import subscribe from "./socket.js";
import theme from "./theme.js";
import createAuthStore from "./stores/authStore.js";
import StoresContext from "./stores/context.js";
import createUiStore from "./stores/uiStore.js";
import { createToasts, isNetworkError } from "./utils/toasts.js";

const init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    lng: "ru",
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  });

  const notificationsStore = createNotificationsStore();
  const stores = {
    authStore: createAuthStore(),
    uiStore: createUiStore(),
    toasts: createToasts(notificationsStore),
  };

  const handleError = (error) => {
    if (error.status === 401) {
      stores.authStore.getState().logOut();
      stores.uiStore.getState().reset();
      queryClient.clear();
      return;
    }
    if (!isNetworkError(error)) {
      Sentry.captureException(error);
    }
    stores.toasts.error(i18n.t("toasts.network"), { id: "network-error" });
  };

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: handleError,
    }),
    mutationCache: new MutationCache({
      onError: handleError,
    }),
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => error.status !== 401 && failureCount < 3,
      },
    },
  });

  subscribe(socket, {
    queryClient,
    i18n,
    uiStore: stores.uiStore,
    toasts: stores.toasts,
  });

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <StoresContext value={stores}>
          <MantineProvider theme={theme}>
            <Notifications position="top-right" store={notificationsStore} />
            <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </Sentry.ErrorBoundary>
          </MantineProvider>
        </StoresContext>
      </QueryClientProvider>
    </I18nextProvider>
  );
};

export default init;
