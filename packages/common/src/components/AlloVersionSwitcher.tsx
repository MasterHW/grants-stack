import { useState } from "react";
import { getConfig, switchAlloVersion } from "../config";
import AlloV1 from "../icons/AlloV1";
import AlloV2 from "../icons/AlloV2";
import classNames from "classnames";

export default function AlloVersionSwitcher() {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentVersion = getConfig().allo.version;

  return (
    <div className="relative">
      <button
        title="Switch between Allo versions"
        className={classNames(
          "py-[8px] px-[16px] flex items-center justify-center cursor-pointer"
        )}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        {currentVersion === "allo-v1" && (
          <AlloV1 color="white" className="h-[24px]" />
        )}
        {currentVersion === "allo-v2" && (
          <AlloV2 color="white" className="h-[24px]" />
        )}
        <svg
          fill="none"
          height="7"
          width="14"
          className="ml-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            xmlns="http://www.w3.org/2000/svg"
          ></path>
        </svg>
      </button>
      <div
        className={classNames(
          "absolute bg-white/80 p-4 rounded-[8px] hover:bg-white backdrop-blur-sm mt-0.5 font-mono font-medium right-0 whitespace-nowrap z-30",
          {
            hidden: !isExpanded,
          }
        )}
      >
        <button
          onClick={() => {
            setIsExpanded(false);
            switchAlloVersion(
              currentVersion === "allo-v1" ? "allo-v2" : "allo-v1"
            );
          }}
        >
          Switch to Allo {currentVersion === "allo-v1" ? "v2" : "v1"}
        </button>
      </div>
    </div>
  );
}
