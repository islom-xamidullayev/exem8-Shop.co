import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ProductCard from "../../components/Products/cart";
import PriceRange from "./price"; // PriceRange komponentining joylashuviga qarab yo'lni to'g'rilang

interface Product {
  id: number;
  _id: string;
  name: string;
  price: number;
  pictures: string;
  quantity: number;
  size: string;
  rank: number;
  discount:number;
}

const fetchProducts = async (params: URLSearchParams) => {
  const queryParams = Object.fromEntries(params);
  console.log("Yuborilayotgan so‘rov:", queryParams);

  const response = await fetch(
    `https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/products?limit=9&${new URLSearchParams(
      queryParams
    )}`
  );
  if (!response.ok) {
    throw new Error("Mahsulotlarni yuklashda xatolik yuz berdi");
  }
  return response.json();
};

const Shop = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(""); // Qidiruv uchun state

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", searchParams.toString()],
    queryFn: () => fetchProducts(searchParams),
  });

  console.log("API dan kelgan data:", data);

  useEffect(() => {
    console.log("Query ishlayapti:", searchParams.toString());
  }, [searchParams]);

  const changeParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    changeParams("page", newPage.toString());
  };

  // **Qidiruvni qo‘shish**
  const filteredProducts = data?.products?.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="container p-5">
      <div className="loading m-auto ">
      <span className="l">L</span>
      <span className="o">o</span>
      <span className="a">a</span>
      <span className="d">d</span>
      <span className="i">i</span>
      <span className="n">n</span>
      <span className="g">g</span>
      <span className="d1">.</span>
      <span className="d2">.</span>
      <div className="load">
          <div className="progress"></div>
          <div className="progress"></div>
          <div className="progress"></div>
          <div className="progress"></div>
      </div>
      </div>
            </div>
    );

  if (isError) return <div>Xatolik yuz berdi</div>;

  return (
    <div>
      <div className="container flex flex-wrap md:flex-nowrap  gap-5">
        {/* Filterlar */}
        <div className="p-4 flex-grow gap-5 rounded-xl h-fit border-4 border-[#0000001A] flex flex-col mb-6 md:max-w-[300px] md:min-w-[300px]">
          <h2 className="text-2xl font-bold text-[#000000] md:text-center py-3">Filters</h2>

          {/* Kategoriya filtrlari */}  <hr />
          <ul className="space-y-2 ml-3">
            {["T-shirts", "Shirts", "Jeans", "Shorts", "Hoodie"].map((type) => {
              const isActive = searchParams.get("category") === type;
              return (
                <li
                  key={type}
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    if (isActive) {
                      newParams.delete("type");
                    } else {
                      newParams.set("type", type);
                    }
                    setSearchParams(newParams);
                  }}
                  className={`text-xl font-bold cursor-pointer transition-colors mt-5  duration-300 ${
                    isActive ? "text-[#000000]" : "text-[#acacac] hover:text-[#434242]"
                  }`}
                >
                  {type}
                </li>
              );
            })}
          </ul>

          {/* Narx filtri */}
          <PriceRange />

          {/* Rang filtrlari */}
          <h2 className="text-2xl font-bold text-[#000] py-8">Colors</h2>
          <div className="grid grid-cols-5  gap-2">
            {["7D06F5", "00C12B", "F50606", "F5DD06", "F57906", "063AF5", "06CAF5", "F506A4", "FFFFFF" , "000000" ].map(
              (color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border-2 ${
                    searchParams.get("colors") === color ? "border-black" : "border-transparent"
                  }`}
                  style={{ backgroundColor: `#${color}` }} // Rang to‘g‘ri ishlaydi
                  onClick={() => changeParams("colors", color)}
                />
              )
            )}
          </div>

          {/* O'lcham filtrlari */}
          <h2 className="text-2xl font-bold text-[#3D3D3D] py-8">Size</h2>
          <div className="grid grid-cols-2 gap-2 w-52 md:w-auto">
            {[
              "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large",
            ].map((size) => (
              <button
                key={size}
                className={`px-5 py-3 rounded-[70px] text-sm ${
                  searchParams.get("size") === size
                    ? "bg-black text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => changeParams("size", size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Kiyim uslublari */}
          <h2 className="text-2xl font-bold text-[#3D3D3D] py-8">Dress Style</h2>
          <ul className="space-y-2 ml-3">
            {["Casual", "Formal", "Party", "Gym"].map((dressStyle) => (
              <li
                key={dressStyle}
                onClick={() => changeParams("dressStyle", dressStyle)}
                className="text-xl   font-bold text-[#797979] hover:text-[#000000] duration-300 cursor-pointer"
              >
                {dressStyle}
              </li>
            ))}
          </ul>
        </div>

        {/* Mahsulotlar ro'yxati */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Mahsulot nomini kiriting..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#F0F0F0]  rounded-2xl p-3  placeholder:text-black/40 outline-none ml-2  xl:w-[400px] py-[12px] px-[15px mb-4"
          />
          <div className="grid lg:grid-cols-3 gap-3 mt-6">
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-3">Mahsulot topilmadi</p>
            )}
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(data?.count / 9) || 1 }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 border ${
                  Number(searchParams.get("page") || 1) === i + 1
                    ? "bg-[#000000] text-white"
                    : "bg-white text-black"
                } rounded`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;