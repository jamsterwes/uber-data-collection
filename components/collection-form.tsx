"use client";

import Image from "next/image";
import { LocalTimeInput } from "@/components/local-time-input";

export const CollectionForm = () => {
  const textInput = "bg-stone-50 dark:bg-white text-stone-950 "

  const uberButton = textInput + "w-56 h-12 border dark:border-black rounded-lg px-3 py-2 font-bold text-2xl flex gap-1"

  const priceInput = textInput + "w-56 h-12 rounded-lg font-bold text-2xl grid grid-cols-[2rem_1fr] "
  const priceSubPiece = "w-full h-12 border-y px-2 py-2 dark:border-black bg-stone-50 dark:bg-white "

  const localTimeInput = textInput + "border dark:border-black w-56 h-12 py-5 px-1 rounded-lg font-bold text-md "

  const submitButton = "bg-stone-50 dark:bg-white text-stone-950 border dark:border-black w-56 h-12 py-5 px-1 rounded-lg font-bold text-2xl flex items-center justify-center cursor-pointer"

  return <div className="flex flex-col gap-6">
      {/* Step 1 */}
      <section>
        <h2 className="text-xl font-semibold mb-0">Step 1 - Open ride in Uber (select UberX):</h2>
        <a href="uber://..." target="_blank" className={uberButton}>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/7/79/Uber_App_Icon.svg" width={32} height={32} alt="Uber Logo" />
          Open in Uber
        </a>
      </section>
      {/* Step 2 */}
      <section>
        <h2 className="text-xl font-semibold mb-0">Step 2 - Enter ride price:</h2>
        <span className={priceInput}>
          <span className={priceSubPiece + "border-l rounded-l-lg"}>$</span>
          <input name="price" type="text" placeholder="0.00" className={priceSubPiece + "border-r rounded-r-lg"} />
        </span>
      </section>
      {/* Step 3 */}
      <section>
        <h2 className="text-xl font-semibold mb-0">Step 3 - Enter leave time (in CST):</h2>
        <LocalTimeInput className={localTimeInput} tz="America/Chicago" autofill={true} />
      </section>
      {/* Step 4 */}
      <section>
        <h2 className="text-xl font-semibold mb-0">Step 4 - Enter arrive time (in CST):</h2>
        <LocalTimeInput className={localTimeInput} tz="America/Chicago" />
      </section>
      {/* Step 5 */}
      <section>
        <h2 className="text-xl font-semibold mb-0">Step 5 - Submit ride:</h2>
        <div className={submitButton}>
          Submit
        </div>
      </section>
  </div>;
}