import React from "react";
import RideDetailsModal from "./RideDetailsModal";
import { Tabs } from "@/components/ui/tabs";

const RideDetailsModalWrapper = (props: any) => {
  return (
    <Tabs defaultValue="details">
      <RideDetailsModal {...props} />
    </Tabs>
  );
};

export default RideDetailsModalWrapper;
