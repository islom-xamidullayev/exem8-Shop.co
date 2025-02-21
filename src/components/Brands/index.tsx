import React from "react";

type Brand = {
  id: string;
  srcUrl: string;
};

const brandsData: Brand[] = [
  { id: "versace", srcUrl: "src/assets/versachi.svg" },
  { id: "zara", srcUrl: "src/assets/zara-logo-1 1.svg" },
  { id: "gucci", srcUrl: "src/assets/gucci-logo-1 1.svg" },
  { id: "prada", srcUrl: "src/assets/prada-logo-1 1.svg" },
  { id: "calvin-klein", srcUrl: "src/assets/Vector (5).svg" },
];

const Brands: React.FC = () => {
  return (
    <div className="bg-black">
      <div className="container max-w-frame mx-auto flex flex-wrap items-center justify-center md:justify-between py-5 md:py-0 sm:px-4 xl:px-0 gap-7">
        {brandsData.map((brand) => (
          <div key={brand.id}>
            <img
              src={brand.srcUrl}
              alt={brand.id}
              className="h-auto w-auto max-w-[116px] lg:max-w-48 max-h-[26px] lg:max-h-9 my-5 md:my-11"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
