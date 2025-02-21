import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ProductCard from "./cart";

interface Product {
  id: number;
  _id: string;
  name: string;
  price: number;
  pictures: string;
  quantity: number;
  size: string;
}

const fetchProducts = async (params: URLSearchParams) => {
  const queryParams = Object.fromEntries(params);
  const response = await fetch(
    `https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/products?page=1&limit=4&${new URLSearchParams(queryParams)}`
  );
  if (!response.ok) {
    throw new Error("Mahsulotlarni yuklashda xatolik yuz berdi");
  }
  return response.json();
};

const ProductsPage2 = () => {
  let [searchParams, setSearchParams] = useSearchParams();


  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", searchParams.toString()],
    queryFn: () => fetchProducts(searchParams),
  });

 

  if (isLoading)
    return (
      <div className="container p-5">
        <button
          disabled
          className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            className="inline w-4 h-4 me-3 animate-spin"
            viewBox="0 0 100 101"
            fill="none"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
          Yuklanmoqda...
        </button>
      </div>
    );

  if (isError) return <div>Xatolik yuz berdi</div>;

  return (
    <div>
      <div className="container py-6 flex justify-between">
        {/* Filterlar */}
    

        {/* Mahsulotlar ro‘yxati */}
        <div className=" container">

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {data?.products?.length > 0 ? (
              data.products.map((product: Product) => (
                <ProductCard key={product._id} product={product} />


              ))
            ) : (
              <p className="text-center col-span-3">Mahsulot topilmadi</p>
            )}
          </div>
             
            <Link to={"/shop"} className="text-center mt-9 block"><button className="py-[18px] px-[80px] border-[#0000001A] border rounded-[68px] ">View All</button></Link> 
           
        </div>
      </div>
    </div>
  );
};

export default ProductsPage2;
