"use client";
import ButtonWithStatus from "@/components/Forms/ButtonWithStatus";
import InputGroup from "@/components/Forms/InputGroup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormState } from "react-dom";

interface Props {
  signInAction: (state: any, formData: FormData) => Promise<any>;
  forgotPasswordAction: (state: any, formData: FormData) => Promise<any>;
}

type SignInError = {
  path: string[];
  message: string;
};

type FormState = {
  auth: boolean;
  errors?: SignInError[];
} | null;

const SignInForm: React.FC<Props> = ({ forgotPasswordAction, signInAction }) => {
  const [signInState, signInFormAction] = useFormState<FormState, any>(signInAction, null);

  const [forgotState, forgotFormAction] = useFormState<FormState, any>(forgotPasswordAction, null);

  let usernameError = signInState?.errors?.find((error) => error.path.includes("username"));
  let passwordError = signInState?.errors?.find((error) => error.path.includes("password"));
  let internalError = signInState?.errors?.find((error) => error.path.includes("internal_error"));
  let emailerror = forgotState?.errors?.find((error) => error.path.includes("email"));

  return (
    <Tabs defaultValue="signin" className="w-full md:w-[500px] lg:w-[900px]" data-testid="teacher-form-tabs">
      <TabsList>
        <TabsTrigger value="signin" data-testid="tab-signin-trigger">
          Sign in
        </TabsTrigger>
        <TabsTrigger value="recovery" data-testid="tab-recovery-trigger">
          Account recovery
        </TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={signInFormAction} className="flex flex-col gap-5">
              <InputGroup
                name="username"
                text="Username"
                type="text"
                error={usernameError?.message}
                testId="username-input"
              />
              <InputGroup
                name="password"
                text="Password"
                type="password"
                error={passwordError?.message}
                testId="passowrd-input"
              />
              <ButtonWithStatus error={signInState?.errors} testId="signin-submit">
                Sign in
              </ButtonWithStatus>
              {internalError && <span className="text-red-500">{internalError.message}</span>}
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="recovery">
        <Card>
          <CardHeader>
            <CardTitle>Forgot password?</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={forgotFormAction} className="flex flex-col gap-5">
              <InputGroup name="email" text="Email" type="email" error={emailerror?.message} />
              <ButtonWithStatus>Send email</ButtonWithStatus>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SignInForm;
