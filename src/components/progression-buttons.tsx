import { Button } from "antd";
import { CopyOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { ComponentProps } from "react";

type ProgressionButtonsProps = {
  currentStep: number;
  maxStep: number;
  onPrev: ComponentProps<typeof Button>["onClick"];
  onNext: ComponentProps<typeof Button>["onClick"];
  onCopy: ComponentProps<typeof Button>["onClick"];
};

function ProgressionButtons({ currentStep, maxStep, onPrev, onNext, onCopy }: ProgressionButtonsProps) {
  return (
    <div style={{ marginTop: "24px" }}>
      {currentStep > 0 && (
        <Button onClick={onPrev} icon={<ArrowLeftOutlined />} style={{ margin: "0 8px" }}>
          Previous
        </Button>
      )}
      {currentStep < maxStep && (
        <Button type="primary" onClick={onNext} icon={<ArrowRightOutlined />}>
          Next
        </Button>
      )}
      {currentStep === maxStep && (
        <Button type="primary" onClick={onCopy} icon={<CopyOutlined />}>
          Copy to clipboard
        </Button>
      )}
    </div>
  );
}

export default ProgressionButtons;
