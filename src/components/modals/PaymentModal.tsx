import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Calendar, Lock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  rideName: string;
  onPaymentComplete?: () => void;
}

const PaymentModal = ({
  isOpen,
  onClose,
  amount = 45,
  rideName = "San Francisco to Los Angeles",
  onPaymentComplete = () => {},
}: PaymentModalProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);

      // Redirect to confirmation after a delay
      setTimeout(() => {
        onClose();
        onPaymentComplete();
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {paymentSuccess ? "Payment Successful" : "Complete Payment"}
          </DialogTitle>
        </DialogHeader>

        {paymentSuccess ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Payment Successful!</h3>
            <p className="text-center text-gray-500">
              Your booking for {rideName} has been confirmed. Redirecting to
              confirmation page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-2">
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Ride Total</span>
                  <span className="text-lg font-bold">
                    ${amount.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{rideName}</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    className="pl-10"
                    value={cardDetails.number}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, number: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      className="pl-10"
                      value={cardDetails.expiry}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          expiry: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="cvc"
                      placeholder="123"
                      className="pl-10"
                      value={cardDetails.cvc}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, cvc: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="text-xs text-gray-500">
                <p>
                  By proceeding, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
                <p className="mt-1">
                  Your payment information is secure and encrypted.
                </p>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
