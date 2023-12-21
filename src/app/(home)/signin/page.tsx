import { signInAction } from "@/actions/auth";

const SignInPage: React.FC = () => {
  return (
    <div>
      <form action={signInAction}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
