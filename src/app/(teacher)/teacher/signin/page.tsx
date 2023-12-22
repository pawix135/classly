import { TeacherSignInAction, TeacherForgotPasswordAction } from "@/actions/Teacher/auth";
import SignInForm from "@/components/Teacher/Forms/SignInForm";

const TeacherSignInPage = () => {
  return (
    <div className="flex flex-grow items-center justify-center w-full p-5 md:p-0">
      <SignInForm signInAction={TeacherSignInAction} forgotPasswordAction={TeacherForgotPasswordAction} />
    </div>
  );
};

export default TeacherSignInPage;
