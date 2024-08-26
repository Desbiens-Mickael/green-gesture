import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

function StepBackButton({ onClick, ...props }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      type="button"
      className="self-start rounded-full p-2"
      {...props}
    >
      <ArrowLeft color="#e8eede" size={24} />
    </Button>
  );
}

export default StepBackButton;
