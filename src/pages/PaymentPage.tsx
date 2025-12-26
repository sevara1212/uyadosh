
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast({
        title: "Payment method added!",
        description: "Your card has been saved successfully.",
      });
      navigate('/profile');
    }, 1500);
  };
  
  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center mb-6">
        <ArrowLeft 
          size={20} 
          className="mr-3 cursor-pointer" 
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold">Add Payment Method</h1>
      </div>
      
      {/* Payment Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-2">
            <CreditCard size={24} className="text-fitness-primary" />
          </div>
          <h2 className="text-lg font-semibold">Add Credit or Debit Card</h2>
          <p className="text-sm text-gray-500">
            Your payment information will be stored securely
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              placeholder="Name on card"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              required
              pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                required
                pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
              />
            </div>
            
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                required
                pattern="[0-9]{3,4}"
                maxLength={4}
              />
            </div>
          </div>
          
          <div className="pt-3">
            <Button 
              type="submit" 
              className="w-full bg-fitness-primary hover:bg-fitness-primary/90"
              disabled={processing}
            >
              {processing ? "Processing..." : "Save Card"}
            </Button>
          </div>
          
          <p className="text-xs text-center text-gray-500">
            By adding a payment method, you agree to our terms and conditions and authorize us to charge this card for future payments.
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default PaymentPage;
