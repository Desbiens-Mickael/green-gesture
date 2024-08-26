import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";

import DisplayDate from "./DisplayDate";

const getFutureDateISO = (hoursToAdd: number) => {
  return new Date(
    new Date().setHours(new Date().getHours() + hoursToAdd)
  ).toISOString();
};

describe("DisplayDate component", () => {
  it("should properly render the message 'Commence dans'", async () => {
    const startDate = getFutureDateISO(1);
    const endDate = getFutureDateISO(2);

    render(
      <MockedProvider>
        <DisplayDate startDate={startDate} endDate={endDate} />
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );

    await waitFor(() =>
      expect(screen.getByText(/Commence dans/)).toBeVisible()
    );
  });

  it("should properly render the message 'Termine dans'", async () => {
    const startDate = new Date().toISOString();
    const endDate = getFutureDateISO(1);

    render(
      <MockedProvider>
        <DisplayDate startDate={startDate} endDate={endDate} />
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );

    await waitFor(() => expect(screen.getByText(/Termine dans/)).toBeVisible());
  });

  it("should properly render the message 'Challenge terminé'", async () => {
    const startDate = new Date(
      new Date().setHours(new Date().getHours() - 2)
    ).toISOString();
    const endDate = new Date(
      new Date().setHours(new Date().getHours() - 1)
    ).toISOString();

    render(
      <MockedProvider>
        <DisplayDate startDate={startDate} endDate={endDate} />
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );

    await waitFor(() =>
      expect(screen.getByText(/Challenge terminé/)).toBeVisible()
    );
  });
});
