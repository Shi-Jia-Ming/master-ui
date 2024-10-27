import {
  forwardRef,
  ReactElement,
  useEffect,
  useState,
  MouseEvent,
  Children,
  useImperativeHandle,
} from "react";
import { LeftPanel, MainPanel, RightPanel } from "./Panel";
import { AnimatePresence, motion } from "framer-motion";

interface PanelGroupProps {
  children: Array<ReactElement>;
  className?: string;
  handleLeftCollapse?: (isCollapsed: boolean) => void;
  handleRightCollapse?: (isCollapsed: boolean) => void;
}

export interface PanelGroupRef {
  collapseLeft: () => void;
  collapseRight: () => void;
}

const PanelGroup = forwardRef<PanelGroupRef, PanelGroupProps>(
  (props: PanelGroupProps, ref) => {
    const [panels, setPanels] = useState<Array<ReactElement>>([]);

    const [leftPanelWidth, setLeftPanelWidth] = useState(300);
    const [leftWidthCache, setLeftWidthCache] = useState(leftPanelWidth);
    const [needAnimationL, setNeedAnimationL] = useState(false);

    const [rightPanelWidth, setRightPanelWidth] = useState(300);
    const [rightWidthCache, setRightWidthCache] = useState(rightPanelWidth);
    const [needAnimationR, setNeedAnimationR] = useState(false);

    const [isLeftDraggerPressed, setIsLeftDraggerPressed] = useState(false);
    const [isLeftDraggerHovered, setIsLeftDraggerHovered] = useState(false);

    const [isRightDraggerPressed, setIsRightDraggerPressed] = useState(false);
    const [isRightDraggerHovered, setIsRightDraggerHovered] = useState(false);

    const [isLeftDraggerShow, setIsLeftDraggerShow] = useState(false);
    const [isRightDraggerShow, setIsRightDraggerShow] = useState(false);

    useEffect(() => {
      setIsLeftDraggerShow(isLeftDraggerHovered || isLeftDraggerPressed);
    }, [isLeftDraggerHovered, isLeftDraggerPressed]);

    useEffect(() => {
      setIsRightDraggerShow(isRightDraggerHovered || isRightDraggerPressed);
    }, [isRightDraggerHovered, isRightDraggerPressed]);

    const handleLeftDraggerMouseDown = (event: MouseEvent) => {
      const startX = event.clientX;
      const startLeftWidth = leftPanelWidth;
      setIsLeftDraggerPressed(true);

      const handleMouseMove = (moveEvent: WindowEventMap["mousemove"]) => {
        const newLeftWidth = startLeftWidth + (moveEvent.clientX - startX);
        setLeftPanelWidth(newLeftWidth);
      };

      const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        setIsLeftDraggerPressed(false);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    const handleRightDraggerMouseDown = (event: MouseEvent) => {
      const startX = event.clientX;
      const startRightWidth = rightPanelWidth;
      setIsRightDraggerPressed(true);

      const handleMouseMove = (moveEvent: WindowEventMap["mousemove"]) => {
        const newRightWidth = startRightWidth - (moveEvent.clientX - startX);
        setRightPanelWidth(newRightWidth);
      };

      const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        setIsRightDraggerPressed(false);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    useEffect(() => {
      const newPanels = Children.toArray(props.children) as Array<ReactElement>;
      if (newPanels.length !== 3) {
        throw new Error("PanelGroup must have exactly 3 children");
      }

      const [leftPanel, mainPanel, rightPanel] = newPanels;
      if (
        leftPanel.type !== LeftPanel ||
        mainPanel.type !== MainPanel ||
        rightPanel.type !== RightPanel
      ) {
        throw new Error(
          "PanelGroup children must be in order: LeftPanel, MainPanel, RightPanel"
        );
      }

      setPanels(newPanels);
    }, [props.children]);

    useImperativeHandle(ref, () => ({
      collapseLeft() {
        setNeedAnimationL(true);
        setTimeout(() => {
          setNeedAnimationL(false);
        }, 300);
        if (leftPanelWidth === 0) {
          setLeftPanelWidth(leftWidthCache);
          if (props.handleLeftCollapse) props.handleLeftCollapse(false);
        } else {
          setLeftWidthCache(leftPanelWidth);
          setLeftPanelWidth(0);
          if (props.handleLeftCollapse) props.handleLeftCollapse(true);
        }
        // cannot detect the collapse when user drag the panel to collapse
      },
      collapseRight() {
        setNeedAnimationR(true);
        setTimeout(() => {
          setNeedAnimationR(false);
        }, 300);
        if (rightPanelWidth === 0) {
          setRightPanelWidth(rightWidthCache);
          if (props.handleRightCollapse) props.handleRightCollapse(false);
        } else {
          setRightWidthCache(rightPanelWidth);
          setRightPanelWidth(0);
          if (props.handleRightCollapse) props.handleRightCollapse(true);
        }
      },
    }));

    return (
      <div id={"panel-group"} className={`size-full flex ${props.className}`}>
        <div
          id={"left-panel-container"}
          className={`h-full ${needAnimationL ? "transition-width duration-300" : ""
            }`}
          style={{ width: `${leftPanelWidth}px` }}
        >
          {panels[0]}
        </div>
        <motion.div
          id={"left-dragger-container"}
          className={"w-[1px] h-full bg-[#e3e3e3] relative cursor-col-resize"}
          onMouseDown={handleLeftDraggerMouseDown}
          onMouseEnter={() => {
            setIsLeftDraggerHovered(true);
          }}
          onMouseLeave={() => {
            setIsLeftDraggerHovered(false);
          }}
        >
          {isLeftDraggerShow && (
            <AnimatePresence>
              <motion.div
                id={"left-dragger"}
                className={
                  "bg-blue-500 w-[5px] h-full cursor-col-resize select-none absolute right-0"
                }
                onMouseDown={handleLeftDraggerMouseDown}
                onMouseEnter={() => {
                  setIsLeftDraggerHovered(true);
                }}
                onMouseLeave={() => {
                  setIsLeftDraggerHovered(false);
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.3 } }}
              />
            </AnimatePresence>
          )}
        </motion.div>
        <div
          id={"main-panel-container"}
          className={"h-full flex justify-between flex-1"}
        >
          {panels[1]}
        </div>
        <motion.div
          id={"right-dragger-container"}
          className={"w-[1px] h-full bg-[#e3e3e3] relative cursor-col-resize"}
          onMouseDown={handleRightDraggerMouseDown}
          onMouseEnter={() => {
            setIsRightDraggerHovered(true);
          }}
          onMouseLeave={() => {
            setIsRightDraggerHovered(false);
          }}
        >
          {isRightDraggerShow && (
            <AnimatePresence>
              <motion.div
                id={"right-dragger"}
                className={
                  "bg-blue-500 w-[5px] h-full cursor-col-resize select-none absolute right-0"
                }
                onMouseDown={handleRightDraggerMouseDown}
                onMouseEnter={() => {
                  setIsRightDraggerHovered(true);
                }}
                onMouseLeave={() => {
                  setIsRightDraggerHovered(false);
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.3 } }}
              />
            </AnimatePresence>
          )}
        </motion.div>
        <div
          id={"right-panel-container"}
          className={`h-full ${needAnimationR ? "transition-width duration-300" : ""
            }`}
          style={{ width: `${rightPanelWidth}px` }}
        >
          {panels[2]}
        </div>
      </div>
    );
  }
);

PanelGroup.displayName = "PanelGroup";
export default PanelGroup;
