import { screen, waitForElementToBeRemoved } from "@testing-library/dom";
import { Async } from ".";
import { render } from "@testing-library/react";

test("it renders correctly", async () => {
  render(<Async />);

  expect(screen.getByText("Hello World")).toBeInTheDocument();

  await waitForElementToBeRemoved(screen.queryByText("Button"));
});
