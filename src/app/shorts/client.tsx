"use client";

import { useState } from "react";

type Shorts = {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
};

interface ShortsClientProps {
  initialShorts: Shorts[];
}

export default function ShortsClient({ initialShorts }: ShortsClientProps) {
  const categories = {
    figma: "Figma",
    "ui-design": "UI Design",
    "design-system": "Design Systems",
    "ux-design": "UX Design",
    "visual-design": "Visual Design",
    career: "Career",
  };

  const [filteredShorts, setFilteredShorts] = useState(initialShorts);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [error, setError] = useState(null);

  const filterShorts = async (category: string) => {
    setError(null);

    if (activeCategory === category) {
      // If the category is already active, clear the filter
      setFilteredShorts(initialShorts);
      setActiveCategory(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.interviews.memorisely.com/api/shorts?category=${category}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch filtered shorts: ${response.statusText}`
        );
      }

      const data = await response.json();
      setFilteredShorts(data);
      setActiveCategory(category);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <ul className="flex flex-row flex-wrap gap-2 py-3">
        {Object.entries(categories).map(([key, category]) => (
          <li key={category}>
            <button
              onClick={() => filterShorts(key)}
              className={`rounded-full border-[1px] border-[#F2F0E9] px-3 py-[6px] transition-colors font-medium text-sm leading-5 ${
                activeCategory === key
                  ? "bg-[#E9E8DD] text-[#212121]" // Active filter styles
                  : "text-[#414141]" // Default styles
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
      {error && <p className="text-red-500">{error}</p>}{" "}
      <ul className="grid grid-cols-5 gap-x-3 gap-y-5">
        {filteredShorts.map((short) => (
          <li
            key={short.id}
            className="aspect-[9/16] flex flex-col gap-1 rounded-xl border-[1px] border-[#F2F0E9] justify-end px-[10px] py-3"
            style={{ backgroundImage: `url(${short.thumbnail})` }}
          >
            <div className="font-medium text-sm leading-5 text-white">
              {short.title}
            </div>
            <div className="w-fit rounded-md border-[0.5px] border-[#F2F0E9] p-1 font-normal text-[10px] leading-[12px] text-[#E9E8DD]">
              {categories[short.category as keyof typeof categories]}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
