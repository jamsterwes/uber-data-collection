"use client";

import Image from "next/image";
import { LocalTimeInput } from "@/app/components/local-time-input";

export const CollectionForm = () => {
  return <div className="flex flex-col gap-6">
      {/* Step 1 */}
      <section>
        <h2 className="text-xl font-semibold mb-0">Step 1 - Open ride in Uber (select UberX):</h2>
        <a href="uber://..." target="_blank" className="bg-white w-56 h-12 rounded-lg text-black px-3 py-2 font-bold text-2xl flex gap-1">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/7/79/Uber_App_Icon.svg" width={32} height={32} alt="Uber Logo" />
          Open in Uber
        </a>
      </section>
      {/* Step 2 */}
      <section>
        <h2 className="text-xl font-semibold mb-0">Step 2 - Enter ride price:</h2>
        <span className="bg-white w-56 h-12 rounded-lg text-black font-bold text-2xl grid grid-cols-[2rem_1fr]">
          <span className="w-4 px-2 py-2">$</span>
          <input name="price" type="text" placeholder="0.00" className="w-full py-2 rounded-r-lg" />
        </span>
      </section>
      {/* Step 3 */}
      <section>
        <h2 className="text-xl font-semibold mb-0">Step 3 - Enter leave time (in CST):</h2>
        <LocalTimeInput className="bg-white w-56 h-12 py-5 px-1 rounded-lg text-black font-bold text-md" tz="America/Chicago" autofill={true} />
      </section>
      {/* Step 4 */}
      <section>
        <h2 className="text-xl font-semibold mb-0">Step 4 - Enter arrive time (in CST):</h2>
        <LocalTimeInput className="bg-white w-56 h-12 py-5 px-1 rounded-lg text-black font-bold text-md" tz="America/Chicago" />
      </section>
      {/* Step 5 */}
      <section>
        <h2 className="text-xl font-semibold mb-0">Step 5 - Submit ride:</h2>
        <div className="bg-white text-black w-56 h-12 py-5 px-1 rounded-lg font-bold text-2xl flex items-center justify-center cursor-pointer">
          Submit
        </div>
      </section>
  </div>;
}