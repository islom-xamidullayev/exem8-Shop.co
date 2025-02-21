import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Navigation uchun stil

interface Review {
  _id: number;
  productId: number;
  reviewerName: string;
  stars: number;
  comment: string;
  createdAt: string;
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, ] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/reviews"
        );
        if (!response.ok) {
          throw new Error("Maʼlumotlarni yuklashda xatolik yuz berdi");
        }
        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  if (error) {
    return <div>Xatolik: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className=" text-5xl mb-9 font-black my-9  "
      >
        OUR HAPPY CUSTOMERS
      </motion.h1>

      <div className="relative w-full">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center text-5xl mb-9 font-black">OUR HAPPY CUSTOMERS</p>
          ) : (
            <Swiper
              slidesPerView={2}
              spaceBetween={25}
              centeredSlides={false}
           
       
              className="cursor-grab"
              breakpoints={{
                640: {
                  slidesPerView: 0,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {reviews.map((review) => (
                <SwiperSlide
                  key={review._id}
                  className=" w-[400px] px-[32px] py-5   bg-white flex flex-col items-start aspect-auto border border-black/10 rounded-[20px] p-6 sm:px-8 sm:py-7 overflow-hidden"
                >
                  <motion.div
                    className=" pb-4 mb-4 w-full h-[250px] "
                    initial={{ x: "100px", opacity: 0 }}
                    animate={{ x: "0", opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i < review.stars
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-3xl flex items-center gap-1 text-gray-900">
                        {review.reviewerName}
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          color="green"
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"></path>
                        </svg>
                      </p>
                    </div>
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                 
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewsPage;
