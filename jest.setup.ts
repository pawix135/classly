import "@testing-library/jest-dom";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormState: () => [, () => {}],
  useFormStatus: () => ({ pending: false }),
}));
