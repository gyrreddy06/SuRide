import React from "react";
import { useNavigate } from "react-router-dom";
import OfferRidePanel from "@/components/dashboard/OfferRidePanel";

const OfferRidePage = () => {
  const navigate = useNavigate();

  const handleRideCreated = () => {
    // Navigate back to home after creating a ride
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <OfferRidePanel
        onRideCreated={handleRideCreated}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default OfferRidePage;
