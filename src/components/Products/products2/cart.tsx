

import { NavLink } from "react-router-dom";

interface Product {
  id: number;
  _id: string;
  name: string;
  price: number;
  pictures: string;
  quantity: number; 
}

function Card({ product }: { product: Product }) {

  
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
      

        <h2 className="text-[20px] font-semibold text-[#000000] py-3 h-[80px]">
          {product.name}
        </h2>
        <p className="text-[25px] font-bold text-[#000000] ">${product.price}</p>
      </div>
    </div>
  );
}

export default Card;
