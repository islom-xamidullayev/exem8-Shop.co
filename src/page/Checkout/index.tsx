import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";

const Checkout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const cart = useSelector((state: RootState) => state.cart.cart);

  const initialFormData = {
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    apartment: "",
    state: "",
    zip: "",
    email: "",
    phoneNumber: "",
    notes: "",
    items: cart.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
    })),
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Yuborilayotgan ma’lumot:", formData);

    try {
      const response = await fetch(
        "https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      console.log("Serverdan kelgan javob:", result);

      if (!response.ok) {
        throw new Error(result.message || "Order submission failed");
      }

      toast.success("Zakaz muvaffaqiyatli jo'natildi!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setIsOpen(true); // Modal oynani ochish
      setFormData(initialFormData); // Formani tozalash
    } catch (error) {
      console.error("Error submitting order:", error);
      setIsErrorModalOpen(true); // Xatolik modalini ochish
    }
  };


  return (
    <>
      <ToastContainer />

      <div onClick={() => setIsOpen(false)}>
        <h2 className="text-center text-5xl mb-9 font-semibold">Check Out</h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-[1000px] mx-auto p-6 bg-[#efefef] shadow-md rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">
                Country / Region *
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              >
                <option value="">Select a country</option>
                <option value="Uzbekistan">Uzbekistan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Town / City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Street Address *</label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">State *</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              >
                <option value="">Select a state</option>
                <option value="Tashkent">Tashkent</option>
                <option value="Samarkand">Samarkand</option>
                <option value="Farg'ona">Farg'ona</option>
                <option value="Buxoro">Buxoro</option>
                <option value="Andijon">Andijon</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Zip *</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">
              Order Notes (Optional)
            </label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              placeholder="Any additional notes..."
            />
          </div>
          <button
            type="submit"
            className="block mt-6 text-white bg-black hover:bg-[#353542] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Buyurtma berish
          </button>
        </form>

        {isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg animate-fade-in">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-xl font-semibold">Buyurtmangiz</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✖
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {cart.length > 0 ? (
                  cart.map((product) => (
                    <div
                      key={String(product.productId)}
                      className="flex justify-between border-b py-2"
                    >
                      <span>{product.name}</span>
                      <span>
                        {product.quantity} × {product.price.toFixed(2)} so'm
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Buyurtmalar yo‘q</p>
                )}
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg"
                >
                  <Link to={"/shop"}>
                   Yana buyurtma berish
                  </Link>
                 
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Muvaffaqiyatli zakaz berildi
                </button>
              </div>
            </div>
          </div>
        )}

        {isErrorModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg animate-fade-in">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-xl font-semibold">Xatolik</h3>
                <button
                  onClick={() => setIsErrorModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✖
                </button>
              </div>
              <div className="mt-4">
                <p className="text-red-500">Zakaz jo'natishda xatolik yuz berdi!</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setIsErrorModalOpen(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;