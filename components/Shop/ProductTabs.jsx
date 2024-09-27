import moment from "moment";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Ratings from "./Ratings";
import { ApiClint } from "@/lib/api-client";
import { GETCUSTOMPRODUCTS } from "@/lib/constant";
import SmallProducts from "./SmallProducts";

const ProductTabs = ({
  product,
  userInfo,
  loadingProductReview,
  submitHundler,
  comment,
  setComment,
  rating,
  setRating,
}) => {
  const [activeTab, setActiveTav] = useState(1);
  const [products, setProducts] = useState(1);
  const getCustomProducts = async () => {
    try {
      const data = await ApiClint(GETCUSTOMPRODUCTS);
      if (data.data) {
        setProducts(data.data.products);
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  useEffect(() => {
    getCustomProducts();
  }, []);
  return (
    <div className={`flex  flex-col md:flex-row w-full`}>
      <section className="mr-20 w-80">
        <div
          className={`cursor-pointer text-lg p-4 flex-1 ${
            activeTab === 1 ? "font-bold" : ""
          }`}
          onClick={() => setActiveTav(1)}
        >
          Write Your Review
        </div>
        <div
          className={`cursor-pointer text-lg p-4 flex-1 ${
            activeTab === 2 ? "font-bold" : ""
          }`}
          onClick={() => setActiveTav(2)}
        >
          All Reviews
        </div>
        <div
          className={`cursor-pointer text-lg p-4 flex-1 ${
            activeTab === 3 ? "font-bold" : ""
          }`}
          onClick={() => setActiveTav(3)}
        >
          Related Products
        </div>
      </section>
      <section className="mt-4 w-full">
        {activeTab === 1 && (
          <section>
            {userInfo ? (
              <form onSubmit={submitHundler} className="w-full">
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Rating
                  </label>
                  <select
                    name="rating"
                    id="rating"
                    value={rating}
                    required
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 rounded-lg bg-black border"
                  >
                    <option value="">Please Rating</option>
                    <option value="1">⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="5">⭐⭐⭐⭐⭐⭐</option>
                  </select>
                </div>
                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    id="comment"
                    // required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="block w-80 p-2 rounded-lg border bg-black text-white"
                  ></textarea>
                </div>
                <div className="my-6">
                  <button
                    className="bg-pink-500 font-semibold px-4 py-3 rounded-lg hover:bg-pink-700"
                    disabled={loadingProductReview}
                  >
                    Adding Review
                  </button>
                </div>
              </form>
            ) : (
              <p>
                Please
                <Link href="/loggin" className="text-pink-500 font-semibold">
                  {""} Loggin{" "}
                </Link>
                first
              </p>
            )}
          </section>
        )}
        {activeTab === 2 && (
          <div>
            {product.numReviews > 0 ? (
              <div className="px-5">
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-[#1A1A1A] p-4 rounded-lg mb-5"
                  >
                    <div className="flex  justify-between">
                      <strong>{review.name}</strong>
                      <p className="text-[#B0B0B0]">
                        {review.createdAt.substring(0, 10)}
                      </p>
                    </div>
                    <p className="my-4 ">{review.comment}</p>
                    <Ratings value={review.rating} />
                  </div>
                ))}
              </div>
            ) : (
              <h2 className="text-3xl font-sans"> No Reviews.. </h2>
            )}
          </div>
        )}
        {activeTab === 3 && (
          <div className="grid grid-cols-3 -ml-56 mt-32">
            {products.map((prod) => (
              <div key={prod._id}>
                <SmallProducts product={prod} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
