import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "../src/components/CartProvider/ShopPage/Form/Form";

describe("Search form", () => {
  it("triggers handleChange when typing", async () => {
    const user = userEvent.setup();
    const mockHandleChange = vi.fn();

    render(
      <Form
        handleSubmit={vi.fn()}
        handleChange={mockHandleChange}
        loading={false}
        input=""
      />,
    );

    const searchInput = screen.getByTestId("search-input");
    await user.type(searchInput, "Slippers");
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("triggers handleSubmit on click", async () => {
    const user = userEvent.setup();
    const mockHandleSubmit = vi.fn((e) => e.preventDefault());

    render(
      <Form
        handleSubmit={mockHandleSubmit}
        handleChange={vi.fn()}
        loading={false}
        input="Slippers"
      />,
    );

    const submitBtn = screen.getByRole("button", { name: /search/i });
    await user.click(submitBtn);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenCalledWith(expect.any(Object));
  });

  it("disables the submit button when loading is true", () => {
    render(
      <Form
        handleSubmit={vi.fn()}
        handleChange={vi.fn()}
        loading={true}
        input=""
      />,
    );
    const submitBtn = screen.getByRole("button", { name: /search/i });
    expect(submitBtn).toBeDisabled();
  });
});
