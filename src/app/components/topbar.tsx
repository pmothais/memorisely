import { Search } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex flex-row justify-between py-3">
      <div className="relative flex items-center w-[400px] bg-white">
        {/* Left icon */}
        <span className="absolute left-2">
          <Search color="#212121" size={16} />
        </span>

        {/* Input field */}
        <input
          type="text"
          placeholder="Search..."
          className="pl-8 pr-10 py-[6px] font-normal text-base leading-6 text-[#787777] placeholder-[#787777] border-[1px] border-[#F2F0E9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F2F0E9] focus:border-[#F2F0E9] w-full"
        />

        {/* Right icon */}
        <span className="absolute right-2 font-normal text-[15px] leading-6 text-[#787777]">
          ⌘S
        </span>
      </div>

      {/* Avatar */}
      <div
        className="h-8 w-8 rounded-full bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(/img/avatar.jpeg)` }}
      ></div>
    </div>
  );
}
