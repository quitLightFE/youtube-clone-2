import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Header", () => {
  test("testing header to be in the document ", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const header = document.querySelector("header");
    const btnCreate = screen.getByText(/yaratish/i);
    expect(header).toBeInTheDocument();
    expect(btnCreate).toBeVisible();
  });
  test("tashqari funktsiyalar testi", async () => {
    const handleDrawerOpen = jest.fn();
    const setIsLight = jest.fn();
    render(
      <MemoryRouter>
        <Header
          open={true}
          setIsLight={setIsLight}
          handleDrawerOpen={handleDrawerOpen}
          isLight={true}
        />
      </MemoryRouter>
    );
    await userEvent.click(screen.getByTestId("toggle-theme"));
    await userEvent.click(screen.getByTestId("drawer-toggle"));
    expect(setIsLight).toHaveBeenCalledTimes(1);
    expect(handleDrawerOpen).toHaveBeenCalledTimes(1);
  });
  test("snapshot header", () => {
    const { container } = render(
      <MemoryRouter>
        <Header
          open={true}
          setIsLight={() => {}}
          handleDrawerOpen={() => {}}
          isLight={true}
        />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
