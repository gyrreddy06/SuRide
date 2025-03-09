import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, CheckCircle, Calendar, MapPin, Car } from "lucide-react";

interface PaymentReceiptProps {
  receiptId: string;
  amount: number;
  date: string;
  startLocation: string;
  endLocation: string;
  driverName: string;
  vehicleInfo: string;
  onDownload?: () => void;
}

const PaymentReceipt = ({
  receiptId = "REC-12345",
  amount = 45,
  date = "May 15, 2023",
  startLocation = "San Francisco, CA",
  endLocation = "Los Angeles, CA",
  driverName = "Alex Johnson",
  vehicleInfo = "Toyota RAV4 (Silver)",
  onDownload = () => {},
}: PaymentReceiptProps) => {
  // Calculate tax and total
  const serviceFee = amount * 0.1;
  const total = amount + serviceFee;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-2">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-xl">Payment Receipt</CardTitle>
        <p className="text-sm text-gray-500">Receipt #{receiptId}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <MapPin className="h-3 w-3 text-green-600" />
              </div>
              <div className="w-0.5 h-8 bg-gray-300 my-1"></div>
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                <MapPin className="h-3 w-3 text-red-600" />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-2">
                <p className="text-sm font-medium">{startLocation}</p>
                <p className="text-xs text-gray-500">Pickup point</p>
              </div>
              <div>
                <p className="text-sm font-medium">{endLocation}</p>
                <p className="text-xs text-gray-500">Dropoff point</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>Date: {date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Car className="h-4 w-4 text-gray-500" />
            <span>Driver: {driverName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="ml-6">Vehicle: {vehicleInfo}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Ride fare</span>
            <span>${amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Service fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
          <p>
            Payment processed on {new Date().toLocaleDateString()} via Credit
            Card ending in 4242
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" onClick={onDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download Receipt
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentReceipt;
