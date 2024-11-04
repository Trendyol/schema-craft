import { render } from "@testing-library/react";

import { ConfigProvider } from "antd";

import AppLayout from "../app-layout";

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  ConfigProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

describe("AppLayout", () => {
  test("renders children within ConfigProvider", () => {
    const testContent = <div data-testid="test-content">Test Content</div>;
    const { getByTestId } = render(<AppLayout>{testContent}</AppLayout>);

    const content = getByTestId("test-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Test Content");
  });

  test("passes theme props to ConfigProvider", () => {
    render(
      <AppLayout>
        <div />
      </AppLayout>
    );

    expect(ConfigProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        theme: expect.objectContaining({
          cssVar: true,
          token: expect.objectContaining({
            colorPrimary: "#f27a1a",
            colorBgBase: "#22272d",
            wireframe: true,
          }),
          algorithm: expect.any(Function),
        }),
      }),
      expect.anything()
    );
  });
});
