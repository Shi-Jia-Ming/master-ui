import { ReactElement } from "react";

export type TabContent = {
  index: number;
  label: string;
  icon?: string;
  content: ReactElement;
};
