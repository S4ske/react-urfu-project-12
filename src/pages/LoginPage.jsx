import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const LoginPage = () => {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = () => {};

  return (
    <Container size={420} py="xl">
      <Paper withBorder shadow="sm" p="xl" radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Title order={2} ta="center">
              Войти
            </Title>
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
            <Button type="submit" fullWidth>
              Войти
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
