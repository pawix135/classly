import TeacherSignInPage from '@/app/(teacher)/teacher/signin/page';
import { render, screen } from '@testing-library/react';

describe('renders teacher sign in page', () => {
  it('recives successful sign in', () => {
    render(<TeacherSignInPage />);

    let usernameInput = screen.getByTestId('username-input');
    let passwordInput = screen.getByTestId('password-input');
    let submitButton = screen.getByTestId('signin-submit');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
