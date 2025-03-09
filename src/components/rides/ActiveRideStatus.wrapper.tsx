import React from "react";
import ActiveRideStatus from "./ActiveRideStatus";
import { Tabs } from "@/components/ui/tabs";

const ActiveRideStatusWrapper = (props: any) => {
  return (
    <Tabs defaultValue="status">
      <ActiveRideStatus {...props} />
    </Tabs>
  );
};

export default ActiveRideStatusWrapper;
