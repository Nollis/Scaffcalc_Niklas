import ContainerProps from "./Container.types";

const Container = (props: ContainerProps) => {
  const { children, ...rest } = props;

  return <div {...rest}>{children}</div>;
};

export default Container;
