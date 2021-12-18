import {
  MouseEventHandler,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { observer } from "mobx-react-lite";

import { Bitburner } from "bitburner.types";
import { FileContext } from "App";
import EditorSection from "components/editor/section";

export default observer(function EditorContainer() {
  const fileContext = useContext(FileContext);
  const [activeTab, setActiveTab] = useState(Bitburner.SaveDataKey.PlayerSave);
  const navRef = useRef<HTMLElement>();

  const clickTab = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      setActiveTab(event.currentTarget.value as Bitburner.SaveDataKey);
      navRef.current.scrollTo({
        left: event.currentTarget.offsetLeft - 32,
      });
    },
    []
  );

  const scrollRight = useCallback(() => {
    navRef.current.scrollBy({ left: navRef.current.scrollWidth * 0.2 });
  }, []);
  const scrollLeft = useCallback(() => {
    navRef.current.scrollBy({ left: navRef.current.scrollWidth * -0.2 });
  }, []);

  return (
    <div className="h-full w-full mt-4 flex flex-col">
      <div className="w-full relative group px-6">
        <button
          className="absolute left-0 inset-y-0 bg-gray-800 rounded-tl py-1 px-2 opacity-25 group-hover:opacity-100 hover:text-green-900 transition duration-200 ease-in"
          onClick={scrollLeft}
        >
          {"<"}
        </button>
        <nav
          className="w-full scroll-hidden overflow-x-scroll flex gap-x-4 scroll-smooth"
          ref={navRef}
        >
          {Object.values(Bitburner.SaveDataKey).map((key) => (
            <button
              // @ts-ignore
              key={key}
              property={key}
              className={clsx(
                "px-4 py-2 -b-px font-semibold border-b-2 border-transparent transition-colors duration-200 ease-in",
                activeTab === key && "border-green-700"
              )}
              value={key}
              onClick={clickTab}
            >
              {key}
            </button>
          ))}
        </nav>
        <button
          className="absolute right-0 inset-y-0 bg-gray-800 rounded-tr py-1 px-2 opacity-25 group-hover:opacity-100 hover:text-green-900 transition duration-200 ease-in"
          onClick={scrollRight}
        >
          {">"}
        </button>
      </div>
      <div className="w-full h-full flex-1 mt-4 p-4 rounded shadow shadow-green-900">
        {!fileContext.ready && <span>Upload a file to begin...</span>}
        {fileContext.ready && <EditorSection tab={activeTab} />}
      </div>
    </div>
  );
});
