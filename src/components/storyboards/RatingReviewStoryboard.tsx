import React from "react";
import RatingReviewForm from "../reviews/RatingReviewForm";

const RatingReviewStoryboard = () => {
  const handleSubmit = (rating: number, comment: string) => {
    console.log("Rating submitted:", rating, comment);
    alert(`Rating: ${rating}, Comment: ${comment}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Rating & Review System</h2>
        <RatingReviewForm
          userName="Alex Johnson"
          userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
          rideId="ride-123"
          onSubmit={handleSubmit}
          onCancel={() => console.log("Cancelled")}
        />
      </div>
    </div>
  );
};

export default RatingReviewStoryboard;
