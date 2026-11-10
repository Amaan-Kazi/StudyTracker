import { Center, Checkbox, Stack } from "@chakra-ui/react";
import { Field, Fieldset } from "@chakra-ui/react";
import { Input, Button, Link } from "@chakra-ui/react";

import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";

import { useState } from "react";
import { useNavigate } from "react-router";

import { authClient } from "@/lib/auth-client";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const [disabled, setDisabled] = useState<boolean>(false);

  const navigate = useNavigate();

  const login = () => {
    const toastId = "loginToast";

    authClient.signIn.email({
      email: email,
      password: password,
      rememberMe: rememberMe,
    }, {
      onRequest() {
        setDisabled(true);
        toaster.loading({
          id: toastId,
          title: "Logging in",
          description: null
        })
      },
      onSuccess() {
        setDisabled(false);
        toaster.update(toastId, {
          type: "success",
          title: "Logged in successfully",
          description: "Redirecting in 3 seconds"
        })

        setTimeout(() => {
          navigate("/");
        }, 3000);
      },
      onError(ctx) {
        setDisabled(false);
        toaster.update(toastId, {
          type: "error",
          title: "Error",
          description: ctx.error.message,
        })
      }
    })
  }

  return <Center height={"full"}>
    <Fieldset.Root width={"xl"} marginLeft={"4"} marginRight={"4"} >

      <Stack marginBottom={"4"}>
        <Fieldset.Legend>Login</Fieldset.Legend>
        <Fieldset.HelperText>
          Backend URL: {" "}
          <Link variant={"underline"} href={import.meta.env.VITE_BACKEND_URL}>{import.meta.env.VITE_BACKEND_URL}</Link></Fieldset.HelperText>
      </Stack>

      <Field.Root>
        <Field.Label>
          Email
          <Field.RequiredIndicator />
        </Field.Label>

        <Input value={email} onChange={e => setEmail(e.currentTarget.value)} />
      </Field.Root>

      <Field.Root marginTop={"8"}>
        <Field.Label>
          Password
          <Field.RequiredIndicator />
        </Field.Label>

        <PasswordInput value={password} onChange={e => setPassword(e.currentTarget.value)} />
      </Field.Root>

      <Field.Root marginTop={"8"}>
        <Checkbox.Root
          checked={rememberMe}
          onCheckedChange={e => setRememberMe(!!e.checked)}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Remember Me</Checkbox.Label>
        </Checkbox.Root>
      </Field.Root>

      <Button marginTop={"8"} disabled={email == "" || password == "" || disabled} onClick={login} >
        Login
      </Button>

      <Fieldset.HelperText>
        Dont have an account? {" "}
        <Link
          variant="underline"
          href="/signup"
        >
          Sign up
        </Link>
      </Fieldset.HelperText>

    </Fieldset.Root>
  </Center>

}
