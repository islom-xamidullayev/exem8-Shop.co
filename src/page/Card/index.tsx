import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { updateQuantity, removeFromCart } from "../../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container  mx-auto py-8 px-4">
      <h1 className="font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6 ">
        YOURCART
      </h1>
      <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
        {cart.length === 0 ? (
          <div className="w-[55%] ">

                      <p className="text-gray-500">Savatchangiz bo‘sh.</p>
                    
                        
                        <Link to={"/shop"}>     <button className="bg-black mt-7 rounded-2xl cursor-pointer text-white p-5 w-[50%]">  Zakaz qiling   </button></Link>

          </div>
        ) : (
          <div className="space-y-6 w-[65%]  border-gray-300 p-8 rounded-3xl border">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex items-center p-4 justify-between border-b pb-6 mb-6 hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <div className="flex items-center">
                  <img
                    src={item.pictures}
                    alt={item.name}
                    className="w-28 h-28 object-cover mr-6 rounded-lg"
                  />
                  <div>
                    <div>
                      <h3 className="text-black font-bold text-base xl:text-xl">
                        {item.name}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm text-gray-600">Color: {item.colors}</p>
                    
                    <p className="font-bold text-black text-xl xl:text-2xl mt-5">
                      ${item.price}
                    </p>
                  </div>
                </div>
                <div className=" ">
                  <button
                    onClick={() => dispatch(removeFromCart(item.productId))}
                    className="ml-17 block pb-5  text-red-500 hover:text-red-700 transition duration-200 ease-in-out"
                  >
                    <img src="src\assets\delet.svg " alt="" />
                  </button>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: item.productId,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                    className="px-3 py-1 border border-gray-300 rounded-md mr-2 hover:bg-gray-100 transition duration-200 ease-in-out"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: item.productId,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className="px-3 py-1 border border-gray-300 rounded-md ml-2 hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className=" p-6 bg-gray-50 rounded-lg w-[37%]">
          <h2 className="text-xl md:text-2xl font-bold text-black">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between mt-4">
              <p className="md:text-xl text-black/60">Subtotal</p>
              <p className="font-semibold">${totalPrice}</p>
            </div>
            <div className="flex justify-between">
              <p className="md:text-xl text-black/60">Delivery Fee</p>
              <p className="md:text-xl font-bold text-red-600">$15</p>
            </div>
            <div className="flex justify-between">
              <p className="md:text-xl text-black/60">Tax</p>
              <p className="md:text-xl font-bold">${(totalPrice * 0.01).toFixed(2)}</p>
            </div>
            <div className="flex justify-between border-t pt-4">
              <p className="text-xl font-semibold">Total</p>
              <p className="md:text-xl font-bold mb-5">
                ${(totalPrice + 15 + totalPrice * 0.01).toFixed(2)}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="inline-flex items-center text-stone-100 justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow hover:bg-primary/90 px-4 text-sm md:text-base font-medium bg-black rounded-full w-full py-4 h-[54px] md:h-[60px] group"
          >
         Go to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
