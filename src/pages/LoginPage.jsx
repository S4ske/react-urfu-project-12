import {
  Alert,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

import { login } from "../api/auth.js";
import { appRoutes } from "../routes.js";
import useAuthStore from "../stores/authStore.js";

const LoginPage = () => {
  const token = useAuthStore((state) => state.token);
  const logIn = useAuthStore((state) => state.logIn);
  const navigate = useNavigate();
  const [networkError, setNetworkError] = useState(false);

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
    setNetworkError(false);
    try {
      const data = await login(values);
      logIn(data);
      navigate(appRoutes.root(), { replace: true });
    } catch (error) {
      if (error.status === 401) {
        form.setErrors({
          username: true,
          password: "Неверные имя пользователя или пароль",
        });
        return;
      }
      setNetworkError(true);
    }
  };

  return (
    <Container size={420} py="xl">
      <Paper withBorder shadow="sm" p="xl" radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Title order={2} ta="center">
              Войти
            </Title>
            {networkError && <Alert color="red">Ошибка соединения</Alert>}
            <TextInput
              label="Ваш ник"
              name="username"
              autoComplete="username"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="Пароль"
              name="password"
              autoComplete="current-password"
              {...form.getInputProps("password")}
            />
            <Button type="submit" fullWidth loading={form.submitting}>
              Войти
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
