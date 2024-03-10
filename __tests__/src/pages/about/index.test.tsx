import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import About from "../../../../src/pages/about";

describe("about page", () => {
  it("renders a heading", () => {
    render(
      <About
        aboutUsData={{
          title: "",
          content: "",
        }}
      />
    );

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});


