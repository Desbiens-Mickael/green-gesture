import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import Register from "./Register/Register";

describe("Register component", () => {
  beforeEach(() =>
    render(
      <MockedProvider>
        <Register />
      </MockedProvider>,
      { wrapper: BrowserRouter }
    )
  );

  it("should properly render the register page", async () => {
    await waitFor(() => expect(screen.getByText(/S'inscrire/)).toBeVisible());
  });

  it("should properly render the form", async () => {
    await waitFor(() => {
      expect(screen.getByText(/S'inscrire/)).toBeVisible();
      expect(screen.getByText(/Votre prénom/)).toBeVisible();
      expect(screen.getByText(/Votre nom/)).toBeVisible();
      expect(screen.getByText(/Votre adresse email/)).toBeVisible();
      expect(screen.getByText(/Votre mot de passe/)).toBeVisible();
    });
  });

  afterAll(() => cleanup());
});
