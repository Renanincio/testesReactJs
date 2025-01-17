import { render, screen } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("ActiveLink component", () => {
  it("active link renders correctly", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <p>Home</p>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  }),

  it("active link  is receiving active class", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <p>Home</p>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toHaveClass("active");
  })
});
