import { useState } from "react";
import { Chevronright, LogoWin8 } from "../../../../assets";

const LNB = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div
        className={`relative z-20 shrink-0 overflow-hidden bg-blue-500 transition-all duration-300 ease-in-out ${isOpen ? "w-60 opacity-100" : "w-16 opacity-80"} `}
      >
        <div className="flex h-full flex-col items-center py-4">
          <LogoWin8 className="text-4xl text-white" />
        </div>
      </div>
      <div className="relative w-px shrink-0 bg-gray-500">
        <div className="absolute top-12 -left-4 z-30 flex h-[54px] items-center">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex size-8 items-center justify-center rounded-full border bg-blue-600 text-white hover:bg-blue-700"
            data-state={isOpen ? "open" : "closed"}
            aria-label={isOpen ? "사이드바 접기" : "사이드바 열기"}
          >
            <Chevronright
              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default LNB;
