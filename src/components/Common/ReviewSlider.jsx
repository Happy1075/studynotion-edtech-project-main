import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import "../../App.css";

// Get API function and endpoint
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );
        if (data?.success) {
          setReviews(data?.data.slice(0, 4)); // ✅ Only 4 reviews
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    })();
  }, []);

  return (
    <div className="mx-auto w-full px-4 py-12">

      {/* ✅ Flexbox with Equal Height Cards */}
      <div className="py-8 flex justify-center items-center gap-6">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25 h-[250px] w-[250px]" // ✅ Fixed height
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  review?.user?.image
                    ? review?.user?.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                }
                alt="User"
                className="h-9 w-9 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h1 className="font-semibold text-richblack-5">
                  {review?.user?.firstName} {review?.user?.lastName}
                </h1>
                <h2 className="text-[12px] font-medium text-richblack-500 min-h-[40px] truncate"> {/* ✅ Fixed height */}
                  {review?.course?.courseName.length > 30
                    ? review?.course?.courseName.slice(0, 30) + "..."
                    : review?.course?.courseName}
                </h2>
              </div>
            </div>
            <p className="font-medium text-richblack-25">
              {review?.review.split(" ").length > truncateWords
                ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
                : review?.review}
            </p>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-yellow-100">
                {review.rating.toFixed(1)}
              </h3>
              <ReactStars
                count={5}
                value={review.rating}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaStar />}
                fullIcon={<FaStar />}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewSlider;
