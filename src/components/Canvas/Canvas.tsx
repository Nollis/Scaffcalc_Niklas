import { Canvas as CanvasR3F } from "@react-three/fiber";
import CanvasProps from "./Canvas.types";

const Canvas = (props: CanvasProps) => {
  const { children, ...rest } = props;

  return <CanvasR3F {...rest}>{children}</CanvasR3F>;
};

export default Canvas;
