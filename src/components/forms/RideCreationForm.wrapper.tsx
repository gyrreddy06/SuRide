import React from "react";
import RideCreationForm from "./RideCreationForm";
import { Tabs } from "@/components/ui/tabs";

const RideCreationFormWrapper = (props: any) => {
  return (
    <Tabs defaultValue="step1">
      <RideCreationForm {...props} />
    </Tabs>
  );
};

export default RideCreationFormWrapper;
