
import { NavLink } from "react-router-dom";

interface Product {
  id: number;
  _id: string;
  name: string;
  price: number;
  pictures: string;
  quantity: number;
  rank: number;
  discount:number
}

function Card({ product }: { product: Product }) {

  const increasedPrice = product ? (product.price + product?.discount).toFixed(2) : "0";

  
  return (
    <div key={product.id} className="p-4">
      <div className="w-[258px] bg-[#fbfbfb00]">
        <NavLink to={`/about/${product._id}`}>
          <img
            src={product.pictures}
            alt={product.name}
            className="w-[258px] h-[289px]"
          />
        </NavLink>
      

        <h2 className="text-[18px] font-semibold text-[#000000] pt-3 ">
          {product.name}
        </h2>
      
        <div className="flex items-center gap-2 ">
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`text-xl ${i < product!.rank ? "text-yellow-400" : "text-gray-300"}`}>&#9733;</span>
            ))}
          </div>
          <p className="text-gray-600">{Math.round(product?.rank ?? 0)}/5</p>


        </div>

        
        <div className="flex items-center gap-4 ">
            <p className="text-3xl font-bold text-black">${product?.price}</p>
            <p className="text-xl text-gray-500 line-through">${increasedPrice}</p>
            <span className="text-red-500 bg-red-100 text-lg py-1 px-3 rounded-full">-{product?.discount}$</span>
          </div>
      </div>
    </div>
  );
}

export default Card;



