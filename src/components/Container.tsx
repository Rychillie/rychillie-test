import cn from "classnames";

type ContainerProps = {
  children: React.ReactNode;
  isLarge?: boolean;
};

export default function Container({ children, isLarge }: ContainerProps) {
  return (
    <>
      <div
        className={cn(
          isLarge ? "px-0" : " px-6 md:px-12",
          "mx-auto md:max-w-4xl"
        )}
      >
        {children}
      </div>
    </>
  );
}
