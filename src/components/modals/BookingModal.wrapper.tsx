import React from "react";
import BookingModal from "./BookingModal";
import { Tabs } from "@/components/ui/tabs";

const BookingModalWrapper = (props: any) => {
  return (
    <Tabs defaultValue="details">
      <BookingModal {...props} />
    </Tabs>
  );
};

export default BookingModalWrapper;
