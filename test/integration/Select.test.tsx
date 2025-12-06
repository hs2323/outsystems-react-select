import { render, screen, waitFor } from "@testing-library/react";

import SelectComponent from "~/components/Select";

test("Renders Home page", async () => {
 const container = render(<SelectComponent/>)

  await waitFor(() => container.findByText("React Select"));
  expect(container.getByText("React Select")).toBeInTheDocument();
});
