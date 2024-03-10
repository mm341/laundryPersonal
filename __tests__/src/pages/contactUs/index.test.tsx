import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ContactUs from "../../../../src/pages/contactUs";

describe("ContactUs", () => {
  it("renders a heading", () => {
    render(<ContactUs homeServices={[]} homeAreas={[]} masterData={undefined} footerSocialLinks={[]} />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
