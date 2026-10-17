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
import {
  hasLength,
  isNotEmpty,
  matchesField,
  useForm,
} from "@mantine/form";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useNavigate } from "react-router";

import { signup } from "../api/auth.js";
import { appRoutes } from "../routes.js";
import { useAuthStore, useToasts } from "../stores/hooks.js";

const SignupPage = () => {
  const { t } = useTranslation();
  const token = useAuthStore((state) => state.token);
  const logIn = useAuthStore((state) => state.logIn);
  const navigate = useNavigate();
  const toasts = useToasts();
  const required = isNotEmpty(t("errors.required"));

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validateInputOnBlur: true,
    validate: {
      username: (value) => required(value) ?? hasLength({ min: 3, max: 20 }, t("errors.length", { min: 3, max: 20 }))(value),
      password: (value) => required(value) ?? hasLength({ min: 6 }, t("errors.minLength", { min: 6 }))(value),
      confirmPassword: (value, values) => required(value) ?? matchesField("password", t("errors.passwordsMustMatch"))(value, values),
    },
  });

  if (token) {
    return <Navigate to={appRoutes.root()} replace />;
  }

  const handleSubmit = async ({ username, password }) => {
    try {
      const data = await signup({ username: username.trim(), password });
      logIn(data);
      navigate(appRoutes.root(), { replace: true });
    } catch (error) {
      if (error.status === 409) {
        form.setFieldError("username", t("signup.userExists"));
        return;
      }
      toasts.error(t("toasts.network"));
    }
  };

  return (
    <Container size={420} py="xl">
      <Paper withBorder shadow="sm" p="xl" radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
          <Stack>
            <Title order={2} ta="center">
              {t("signup.title")}
            </Title>
            <TextInput
              label={t("signup.username")}
              name="username"
              autoComplete="username"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label={t("signup.password")}
              name="password"
              autoComplete="new-password"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label={t("signup.confirmPassword")}
              name="confirmPassword"
              autoComplete="new-password"
              {...form.getInputProps("confirmPassword")}
            />
            <Button type="submit" fullWidth loading={form.submitting}>
              {t("signup.submit")}
            </Button>
            <Text size="sm" ta="center">
              {`${t("signup.hasAccount")} `}
              <Anchor component={Link} to={appRoutes.login()}>
                {t("signup.loginLink")}
              </Anchor>
            </Text>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupPage;
