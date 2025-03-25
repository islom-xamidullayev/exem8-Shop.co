import React from "react";
import VersaceLogo from "../../assets/versachi.svg";
import ZaraLogo from "../../assets/zara-logo-1 1.svg";
import GucciLogo from "../../assets/gucci-logo-1 1.svg";
import PradaLogo from "../../assets/prada-logo-1 1.svg";
import CalvinKleinLogo from "../../assets/Vector (5).svg";

type Brand = {
  id: string;
  src: string;
};

const brandsData: Brand[] = [
  { id: "versace", src: VersaceLogo },
  { id: "zara", src: ZaraLogo },
  { id: "gucci", src: GucciLogo },
  { id: "prada", src: PradaLogo },
  { id: "calvin-klein", src: CalvinKleinLogo },
];

const Brands: React.FC = () => {
  return (
    <div className="bg-black">
      <div className="container max-w-frame mx-auto flex flex-wrap items-center justify-center md:justify-between py-5 md:py-0 sm:px-4 xl:px-0 gap-7">
        {brandsData.map((brand) => (
          <div key={brand.id}>
            <img
              src={brand.src}
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
