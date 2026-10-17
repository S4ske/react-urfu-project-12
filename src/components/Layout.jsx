import {
  Anchor,
  AppShell,
  Button,
  Container,
  Group,
} from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router";

import { appRoutes } from "../routes.js";
import { useAuthStore, useUiStore } from "../stores/hooks.js";

const Layout = () => {
  const { t } = useTranslation();
  const token = useAuthStore((state) => state.token);
  const logOut = useAuthStore((state) => state.logOut);
  const resetUi = useUiStore((state) => state.reset);
  const queryClient = useQueryClient();

  const handleLogOut = () => {
    logOut();
    resetUi();
    queryClient.clear();
  };

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between" wrap="nowrap">
            <Anchor component={Link} to={appRoutes.root()} fw={700} fz="xl" c="dark" underline="never">
              {t("appName")}
            </Anchor>
            {token && (
              <Button variant="default" onClick={handleLogOut}>
                {t("logOut")}
              </Button>
            )}
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Main h="100dvh">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
