import { fireEvent, render, screen } from "@testing-library/react";
import SelectComponent from "~/framework/react/Select";

const options = [
  { label: "Chocolate", value: "chocolate" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Vanilla", value: "vanilla" },
];

afterEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (window as any).onSelectChange;
});

test("renders the React Select input", async () => {
  render(<SelectComponent openMenuOnClick={true} options={options} />);

  const input = await screen.findByRole("combobox");

  expect(input).toBeInTheDocument();
});

test("updates the selection and notifies the host on window", async () => {
  const onSelectChange = vi.fn();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).onSelectChange = onSelectChange;

  render(
    <SelectComponent
      isMulti={true}
      onSelectChange="onSelectChange"
      options={options}
      value={[options[0]]}
    />,
  );

  fireEvent.keyDown(await screen.findByRole("combobox"), { key: "ArrowDown" });
  fireEvent.click(await screen.findByText("Vanilla"));

  expect(onSelectChange).toHaveBeenCalledWith(
    JSON.stringify([options[0], options[2]]),
  );
  expect(screen.getByText("Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Vanilla")).toBeInTheDocument();
});

test("follows a new value from the host", async () => {
  const { rerender } = render(
    <SelectComponent isMulti={true} options={options} value={[options[0]]} />,
  );
  expect(await screen.findByText("Chocolate")).toBeInTheDocument();

  rerender(
    <SelectComponent isMulti={true} options={options} value={[options[1]]} />,
  );

  expect(await screen.findByText("Strawberry")).toBeInTheDocument();
  expect(screen.queryByText("Chocolate")).not.toBeInTheDocument();
});

test("keeps the user's selection when the host re-renders with an equal value", async () => {
  const { rerender } = render(
    <SelectComponent isMulti={true} options={options} value={[options[0]]} />,
  );

  fireEvent.keyDown(await screen.findByRole("combobox"), { key: "ArrowDown" });
  fireEvent.click(await screen.findByText("Vanilla"));

  rerender(
    <SelectComponent
      isMulti={true}
      options={options}
      value={[{ ...options[0] }]}
    />,
  );

  expect(screen.getByText("Vanilla")).toBeInTheDocument();
});
