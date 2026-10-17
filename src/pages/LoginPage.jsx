import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useNavigate } from "react-router";

import { login } from "../api/auth.js";
import { appRoutes } from "../routes.js";
import { useAuthStore, useToasts } from "../stores/hooks.js";

const LoginPage = () => {
  const { t } = useTranslation();
  const token = useAuthStore((state) => state.token);
  const logIn = useAuthStore((state) => state.logIn);
  const navigate = useNavigate();
  const toasts = useToasts();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  if (token) {
    return <Navigate to={appRoutes.root()} replace />;
  }

  const handleSubmit = async (values) => {
    try {
      const data = await login(values);
      logIn(data);
      navigate(appRoutes.root(), { replace: true });
    } catch (error) {
      if (error.status === 401) {
        form.setErrors({
          username: true,
          password: t("login.invalidCredentials"),
        });
        return;
      }
      toasts.error(t("toasts.network"));
    }
  };

  return (
    <Container size={420} py="xl">
      <Paper withBorder shadow="sm" p="xl" radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Title order={2} ta="center">
              {t("login.title")}
            </Title>
            <TextInput
              label={t("login.username")}
              name="username"
              autoComplete="username"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label={t("login.password")}
              name="password"
              autoComplete="current-password"
              {...form.getInputProps("password")}
            />
            <Button type="submit" fullWidth loading={form.submitting}>
              {t("login.submit")}
            </Button>
            <Text size="sm" ta="center">
              {`${t("login.noAccount")} `}
              <Anchor component={Link} to={appRoutes.signup()}>
                {t("login.signupLink")}
              </Anchor>
            </Text>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
