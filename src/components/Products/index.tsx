import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "./cart";

interface Product {
  id: number;
  _id: string;
  name: string;
  price: number;
  pictures: string;
  quantity: number;
  size: string;
  rank: number;
  discount: number
}

const fetchProducts = async (params: URLSearchParams) => {
  const queryParams = Object.fromEntries(params);
  const response = await axios.get(
    `https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/products`,
    {
      params: queryParams,
    }
  );
  return response.data;
};

const Products = () => {
  let [searchParams] = useSearchParams();

  const { data: dataPage1, isLoading: isLoadingPage1, isError: isErrorPage1 } = useQuery({
    queryKey: ["products", "page1", searchParams.toString()],
    queryFn: () => fetchProducts(new URLSearchParams({ page: "1", limit: "4", ...Object.fromEntries(searchParams) })),
  });

  const { data: dataPage2, isLoading: isLoadingPage2, isError: isErrorPage2 } = useQuery({
    queryKey: ["products", "page2", searchParams.toString()],
    queryFn: () => fetchProducts(new URLSearchParams({ page: "2", limit: "4", ...Object.fromEntries(searchParams) })),
  });

  if (isLoadingPage1 || isLoadingPage2)
    return (
      <div className="container p-5">
<div className="loading">
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

  if (isErrorPage1 || isErrorPage2) return <div>Xatolik yuz berdi</div>;

  return (
    <div>
      <div className="container py-6 flex justify-between">
        {/* Filterlar */}

        {/* Mahsulotlar ro‘yxati */}
        <div className="container">
          <h2 className="font-bold text-[50px] text-center">NEW ARRIVALS</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {dataPage1?.products?.length > 0 ? (
              dataPage1.products.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-3">Mahsulot topilmadi</p>
            )}
   </div>

<h2 className="font-bold text-[50px] text-center">Top selling</h2>
<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">

            {dataPage2?.products?.length > 0 ? (
              dataPage2.products.map((product: Product) => (          
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-3">Mahsulot topilmadi</p>
            )}
       
       </div>
          <Link to={"/shop"} className="text-center mt-9 block">
            <button className="py-[18px] px-[80px] border-[#0000001A] border rounded-[68px]">
              View All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;