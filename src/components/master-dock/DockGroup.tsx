import {motion, Reorder, AnimatePresence} from "framer-motion";
import {forwardRef, useImperativeHandle, useState} from "react";
import {Tab} from "./Tab";
import {TabContent} from "../../types/tab.type";
import {removeItem, closestItem} from "../../utils/array-utils";
import {AddIcon} from "../../icons/AddIcon";
import {DefaultTabContent} from "./DefaultTabContent";
import "../../styles/dock.css";

interface DockGroupProps {
  initialTabs?: Array<TabContent>;
}

export interface DockGroupRef {
  addTab: (newTab: TabContent) => void;
  removeTab: (tab: TabContent) => void;
}

const DockGroup = forwardRef<DockGroupRef, DockGroupProps>((props: DockGroupProps, ref) => {
    const [tabs, setTabs] = useState<Array<TabContent>>(props.initialTabs || []);
    const [selectedTab, setSelectedTab] = useState<TabContent>(tabs[0]);

    const remove = (item: TabContent) => {
      if (item === selectedTab) {
        setSelectedTab(closestItem(tabs, item));
      }

      setTabs(removeItem(tabs, item));
    };

    const add = () => {
      const nextTab: TabContent = {
        index: tabs.length,
        label: "Untitled",
        content: <DefaultTabContent/>,
      };

      if (nextTab) {
        setTabs([...tabs, nextTab]);
        setSelectedTab(nextTab);
      }
    };

    useImperativeHandle(ref, () => ({
      addTab(newTab: TabContent) {
        if (newTab) {
          setTabs([...tabs, newTab]);
          setSelectedTab(newTab);
        }
      },
      removeTab(tab: TabContent) {
        remove(tab);
      }
    }));

    return (
      <div className={"size-full bg-white overflow-hidden shadow-custom flex flex-col"}>
        <nav
          className={"bg-[#fdfdfd] p-[5px] rounded-[10px] rounded-b-none border-b border-[#eee] h-[44px] flex justify-start items-center overflow-hidden"}>
          <Reorder.Group
            as={"ul"}
            axis={"x"}
            onReorder={setTabs}
            className={"flex-grow flex justify-start items-end flex-nowrap h-full pr-[10px]"}
            values={tabs}
          >
            <AnimatePresence initial={false}>
              {tabs.map((item) => (
                <Tab
                  key={item.index}
                  item={item}
                  isSelected={selectedTab === item}
                  onClick={() => setSelectedTab(item)}
                  onRemove={() => remove(item)}
                />
              ))}
            </AnimatePresence>
          </Reorder.Group>
          <motion.button
            className="add-item flex justify-center items-center"
            onClick={add}
            whileTap={{scale: 0.9}}
          >
            <AddIcon/>
          </motion.button>
        </nav>
        <main className={"flex justify-center items-center font-[128px] flex-grow select-none"}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              animate={{opacity: 1, y: 0}}
              initial={{opacity: 0, y: 20}}
              exit={{opacity: 0, y: -20}}
              transition={{duration: 0.15}}
            >
              {selectedTab ? selectedTab.content : "😋"}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    )
  }
);

DockGroup.displayName = "DockGroup";
export default DockGroup;