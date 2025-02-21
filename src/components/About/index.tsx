import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import ProductsPage2 from "../Products/products2";

interface Product {
  _id: string;
  name: string;
  price: number;
  pictures: string;
  description: string;
  size: string;
  colors: string[];
 
  rank: number;
  discount: number;
}

interface Review {
  _id: string;
  reviewerName: string;
  comment: string;
  stars: number;
}

const ProductDetail = () => {
  const { _id } = useParams<{ _id: string }>();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(5);
  const [reviewerName, setReviewerName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchProduct = async () => {
      if (!_id) {
        setError("Mahsulot ID topilmadi");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/products/${_id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Mahsulot ma'lumotlarini olishda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      const productId = _id || id;
      if (!productId) {
        console.error("Mahsulot ID topilmadi");
        return;
      }

      try {
        const response = await axios.get(
          `https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/reviews/product/${productId}`
        );
        console.log("API dan kelgan sharhlar:", response.data.reviews);
        setReviews(response.data.reviews);
      } catch (err) {
        console.error("Sharhlarni olishda xatolik yuz berdi", err);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [_id]);

  useEffect(() => {
    console.log("Yangilangan sharhlar:", reviews);
  }, [reviews]);

  const submitReview = async () => {
    if (!_id) {
      console.error("Mahsulot ID topilmadi");
      return;
    }

    if (!newComment.trim() || !reviewerName.trim()) return;

    try {
      await axios.post(
        `https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/reviews`,
        {
          productId: _id,
          reviewerName: reviewerName,
          comment: newComment,
          stars: newRating,
        }
      );

      setReviews([
        ...reviews,
        {
          _id: Date.now().toString(),
          reviewerName: reviewerName,
          comment: newComment,
          stars: newRating,
        },
      ]);
      setShowModal(false);
      setNewComment("");
      setNewRating(5);
      setReviewerName("");
    } catch (err) {
      console.error("Sharhni yuborishda xatolik yuz berdi:", err);
    }
  };

  // Mahsulotni savatchaga qo'shish funksiyasi
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        pictures: product.pictures,
        colors: product.colors,
        size: product.size,
        quantity,
      }));
    }
  };
  
  if (loading) return     <div className="container p-5">
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
        </div>;
  if (error) return <div>{error}</div>;

  const increasedPrice = product ? (product.price + product?.discount).toFixed(2) : "0";


  return (
    <div   className="container mx-auto py-6 flex flex-col gap-10 ">

      <div >

           <div  className=" lg:flex gap-10 justify-center">
        <img src={product?.pictures} alt={product?.name} className=" h-[470px] md:w-[470px] mb-6 rounded-3xl shadow-md" />
        <div className="flex flex-col w-[50%]">
          <h1 className="text-3xl font-bold text-black">{product?.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={`text-xl ${i < product!.rank ? "text-yellow-400" : "text-gray-300"}`}>&#9733;</span>
              ))}
            </div>
            <p className="text-gray-600">{Math.round(product?.rank ?? 0)}/5</p>

          </div>
          <div className="flex items-center gap-4 mt-4">
            <p className="text-3xl font-bold text-black">${product?.price}</p>
            <p className="text-xl text-gray-500 line-through">${increasedPrice}</p>
            <span className="text-red-500 bg-red-100 text-lg py-1 px-3 rounded-full">-{product?.discount}$</span>
          </div>
          <p className="mt-4 text-gray-600">{product?.description}</p>

          <h4 className="mt-6 text-black font-semibold">Select Colors:</h4>
          <div className="flex gap-3 mt-2">
            {product?.colors.map((color, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? "border-black" : "border-transparent"}`}
                style={{ backgroundColor: `#${color}` }}
                onClick={() => setSelectedColor(color)}
              ></button>
            ))}
          </div>

          <h4 className="mt-6 text-[black] font-semibold">Choose Size:</h4>
          <div className="flex gap-4 mt-2">
            <button>{product?.size}</button>
          </div>
          <p className="mt-5">ID: {product?._id}</p>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="px-3 py-2 text-xl">
                -
              </button>
              <p className="px-4">{quantity}</p>
              <button onClick={() => setQuantity((prev) => prev + 1)} className="px-3 py-2 text-xl">
                +
              </button>
            </div>
            <button className="bg-black text-white px-8 py-3 rounded-lg text-lg" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

        </div>
      </div>


      {/* Sharhlar bo'limi */}
      <div className="mt-8">
<div className="flex justify-between text-2xl border-b-2 pb-2 border-[#bebebe]">
  <h2>Product Details</h2>
  <h2 className="font-semibold ">Rating & Reviews</h2>
  <h2>FAQs</h2>
</div>

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">All Reviews</h2>

          <button
            className="mt-6 bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => setShowModal(true)}
          >
       Write a Review
          </button>
        </div>
        
        {reviews.length > 0 ? (
          <div className="mt-4 space-y-4 grid grid-cols-2 gap-3">
            {reviews.map((review, index) => (
              <div key={index} className="border border-gray-300 p-4 rounded-lg  shadow-2xl ">
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`text-xl ${i < review.stars ? "text-yellow-400" : "text-gray-300"}`}>&#9733;</span>
                  ))}
                </div>
                <h2>{review.reviewerName}</h2>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-2">Hozircha sharhlar yo‘q.</p>
        )}
      </div>



   <ProductsPage2/>


<div >
  {showModal && (
        <div  className="fixed inset-0 bg-[#0000009a] bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Sharh qoldirish</h2>

            <label className="block text-gray-700">Ismingiz:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
            />

            <label className="block text-gray-700 mt-4">Reyting:</label>
            <div className="flex my-2">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`text-2xl cursor-pointer ${i < newRating ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setNewRating(i + 1)}
                >
                  ★
                </span>
              ))}
            </div>

            <label className="block text-gray-700 mt-4">Sharhingiz:</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mt-2"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Bekor qilish
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={submitReview}
              >
                Yuborish
              </button>
            </div>
          </div>
        </div>
      )}

</div>

      {/* Modal oyna */}
    
      </div>
   
    </div>
  );
};

export default ProductDetail;