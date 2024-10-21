import ShortsClient from "./client";

async function fetchShorts() {
  const response = await fetch(
    "https://api.interviews.memorisely.com/api/shorts"
  );

  // Check if the response is okay
  if (!response.ok) {
    throw new Error(`Failed to fetch shorts: ${response.statusText}`);
  }

  return response.json();
}

export default async function Shorts() {
  let initialShorts = [];

  try {
    initialShorts = await fetchShorts(); // Fetch initial data
  } catch (error) {
    console.error(error); // Log any errors
  }

  return (
    <div>
      <h1 className="pt-6 pb-4 font-semibold text-[22px] leading-7 text-[#0A0A0A]">
        Shorts
      </h1>
      <ShortsClient initialShorts={initialShorts} />
    </div>
  );
}
