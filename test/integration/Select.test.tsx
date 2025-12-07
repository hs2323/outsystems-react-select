import { render, screen, waitFor } from "@testing-library/react";

import SelectComponent from "~/components/Select";

test("Renders Home page", async () => {
  render(<SelectComponent />);

  await waitFor(() => screen.findByText("React Select"));
  expect(screen.getByText("React Select")).toBeInTheDocument();
});
