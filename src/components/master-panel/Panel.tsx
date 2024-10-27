import { ReactElement } from "react";

export const LeftPanel = ({
  children,
  className,
}: {
  children?: ReactElement;
  className?: string;
}) => {
  return (
    <div id={"left-panel"} className={`${className} size-full select-none`}>
      {children}
    </div>
  );
};

export const RightPanel = ({
  children,
  className,
}: {
  children?: ReactElement;
  className?: string;
}) => {
  return (
    <div id={"right-panel"} className={`${className} size-full select-none`}>
      {children}
    </div>
  );
};

export const MainPanel = ({
  children,
  className,
}: {
  children?: ReactElement;
  className?: string;
}) => {
  return (
    <div id={"main-panel"} className={`${className} size-full select-none`}>
      {children}
    </div>
  );
};
