import {
  LeftPanel,
  MainPanel,
  RightPanel,
} from "../components/master-panel/Panel";
import PanelGroup, {
  PanelGroupRef,
} from "../components/master-panel/PanelGroup";
import { useRef } from "react";

export default function MasterPanel() {
  const panelGroupRef = useRef<PanelGroupRef>(null);

  return (
    <div className={"size-full"}>
      <PanelGroup ref={panelGroupRef}>
        <LeftPanel className={"bg-gray-100 size-full"} />
        <MainPanel className={"bg-white size-full"}>
          <div className={"size-full flex justify-between"}>
            <button
              className={"bg-blue-500 text-white p-2 h-[50px]"}
              onClick={() => {
                panelGroupRef.current?.collapseLeft();
              }}
            >
              Collapse Left Panel
            </button>
            <button
              className={"bg-blue-500 text-white p-2 h-[50px]"}
              onClick={() => {
                panelGroupRef.current?.collapseRight();
              }}
            >
              Collapse Right Panel
            </button>
          </div>
        </MainPanel>
        <RightPanel className={"bg-gray-100 size-full"} />
      </PanelGroup>
    </div>
  );
}
