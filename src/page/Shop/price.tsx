import { useState, useEffect } from "react";
import { Range } from "react-range";
import { useSearchParams } from "react-router-dom";

function PriceRange() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL-dan qiymatlarni olish yoki default qilib qo‘yish
  const minURL = Number(searchParams.get("price-from")) || 50;
  const maxURL = Number(searchParams.get("price-to")) || 472;
  const [values, setValues] = useState([minURL, maxURL]);

  // Apply bosilganda URL-ni yangilash
  const applyChanges = () => {
    setSearchParams({
      "price-from": values[0].toString(),
      "price-to": values[1].toString(),
    });
  };

  // URL o‘zgarganda sliderni yangilash
  useEffect(() => {
    setValues([minURL, maxURL]);
  }, [searchParams]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#100909] py-8">Price</h2>
      <div className="relative w-full px-3">
        <Range
          step={1}
          min={0}
          max={500}
          values={values}
          onChange={setValues}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 bg-black rounded-lg w-full relative"
            >
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              className="w-6 h-6 bg-black rounded-full p-4 flex items-center justify-center text-white font-bold"
            >
              {values[index]}
            </div>
          )}
        />
      </div>
      <span className="text-[#000000] block mt-2">
        ${values[0]} - ${values[1]}
      </span>
      <button
        className="mt-4 px-6 py-2 bg-black text-white text-lg font-bold rounded-md"
        onClick={applyChanges}
      >
        Apply
      </button>
    </div>
  );
}

export default PriceRange;
