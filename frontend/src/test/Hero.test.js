import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "../landing_page/home/Hero";

describe("Hero Component", () => {
  // Image checks
  test("renders the hero image with the correct source", () => {
    render(<Hero />);
    const heroImage = screen.getByRole("img");
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", "media/images/homeHero.png");
  });

  test("hero image has an alt text", () => {
    render(<Hero />);
    const heroImage = screen.getByRole("img");
    // Make sure the alt attribute exists and is not empty
    expect(heroImage).toHaveAttribute("alt");
    expect(heroImage.getAttribute("alt")).not.toBe("");
  });

  // Text checks
  test("renders the main heading", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { name: /invest in everything/i })
    ).toBeInTheDocument();
  });

  test("renders the description paragraph", () => {
    render(<Hero />);
    expect(
      screen.getByText(/online platform to invest in stocks/i)
    ).toBeInTheDocument();
  });

  // Button checks
  test("renders the Signup Now button", () => {
    render(<Hero />);
    expect(
      screen.getByRole("button", { name: /signup now/i })
    ).toBeInTheDocument();
  });

  test("Signup Now button has the expected styling", () => {
    render(<Hero />);
    const button = screen.getByRole("button", { name: /signup now/i });
    expect(button).toHaveClass("btn", "btn-primary");
    expect(button).toHaveStyle({ width: "20%" });
  });
});