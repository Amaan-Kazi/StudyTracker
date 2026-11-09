import { Center, Stack } from "@chakra-ui/react";
import { Field, Fieldset } from "@chakra-ui/react";
import { Input, Button, Link } from "@chakra-ui/react";

import { PasswordInput, PasswordStrengthMeter } from "@/components/ui/password-input";
import { type Options, passwordStrength } from "check-password-strength"
import { toaster } from "@/components/ui/toaster";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { authClient } from "@/lib/auth-client";

const strengthOptions: Options<string> = [
  { id: 1, value: "weak", minDiversity: 0, minLength: 0 },
  { id: 2, value: "medium", minDiversity: 2, minLength: 6 },
  { id: 3, value: "strong", minDiversity: 3, minLength: 8 },
  { id: 4, value: "very-strong", minDiversity: 4, minLength: 10 },
]

export default function SignUp() {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const [disabled, setDisabled] = useState<boolean>(false);

  const navigate = useNavigate();

  const strength = useMemo(() => {
    if (!password) return 0
    const result = passwordStrength(password, strengthOptions)
    return result.id
  }, [password])

  const createAccount = () => {
    const toastId = "signupToast";

    authClient.signUp.email({
      email: email,
      name: name,
      password: password,
    }, {
      onRequest() {
        setDisabled(true);
        toaster.loading({
          id: toastId,
          title: "Creating an account",
        })
      },
      onSuccess() {
        setDisabled(false);
        toaster.update(toastId, {
          type: "success",
          title: "Account created successfully",
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
        <Fieldset.Legend>Sign Up</Fieldset.Legend>
        <Fieldset.HelperText>Backend URL: <Link variant={"underline"} href={import.meta.env.VITE_BACKEND_URL}>{import.meta.env.VITE_BACKEND_URL}</Link></Fieldset.HelperText>
      </Stack>

      <Field.Root>
        <Field.Label>
          Name
          <Field.RequiredIndicator />
        </Field.Label>

        <Input value={name} onChange={e => setName(e.currentTarget.value)} />
      </Field.Root>

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
        <PasswordStrengthMeter value={strength} />
      </Field.Root>

      <Field.Root invalid={confirmPassword != "" && password != "" && password != confirmPassword}>
        <Field.Label>
          Confirm Password
          <Field.RequiredIndicator />
        </Field.Label>

        <PasswordInput value={confirmPassword} onChange={e => setConfirmPassword(e.currentTarget.value)} />

        <Field.ErrorText>
          The passwords do not match
        </Field.ErrorText>
      </Field.Root>

      <Button marginTop={"8"} disabled={name == "" || email == "" || password == "" || password != confirmPassword || disabled} onClick={createAccount} >
        Create Account
      </Button>

      <Fieldset.HelperText>
        Already have an account? {" "}
        <Link
          variant="underline"
          href="/login"
        >
          Log in
        </Link>
      </Fieldset.HelperText>

    </Fieldset.Root>
  </Center>

}
