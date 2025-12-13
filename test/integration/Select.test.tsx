import { render, screen } from "@testing-library/react";
import SelectComponent from "~/components/Select";

test("renders the React Select input", async () => {
  render(
    <SelectComponent
      openMenuOnClick={true}
      options={[
        { label: "Chocolate", value: "chocolate" },
        { label: "Strawberry", value: "strawberry" },
      ]}
    />,
  );

  const input = await screen.findByRole("combobox");

  expect(input).toBeInTheDocument();
});
