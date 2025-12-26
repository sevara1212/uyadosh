import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { emailService } from "@/services/emailService";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Mail, RefreshCw } from 'lucide-react';
import muvrLogo from '/public/images/muvr_logo.png';

const VerifyEmailPage = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { finalizeSignupAfterOTP } = useAuth();

  useEffect(() => {
    // Get email and name from URL params or localStorage
    const emailParam = searchParams.get('email');
    const nameParam = searchParams.get('name');
    
    if (emailParam) {
      setEmail(emailParam);
    } else {
      const storedEmail = localStorage.getItem('signup_email');
      if (storedEmail) setEmail(storedEmail);
    }
    
    if (nameParam) {
      setName(nameParam);
    } else {
      const storedName = localStorage.getItem('signup_name');
      if (storedName) setName(storedName);
    }

    // Start countdown for resend
    setCountdown(60);
  }, [searchParams]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || !email) {
      setError("Please enter the verification code");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter a 6-digit verification code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log('🔍 Verifying OTP...');
      const result = await emailService.verifyOTP(email, otp);
      
      if (result.success) {
        console.log('✅ OTP verified successfully, creating account...');
        toast.success("Email verified successfully! Creating your account... 🎉");
        
        // Now create the account after OTP verification
        const accountResult = await finalizeSignupAfterOTP();
        
        if (accountResult.success) {
          console.log('✅ Account created successfully!');
          toast.success("Account created successfully! Welcome to Muvr! 🎉");
          
          // Clear stored data
          localStorage.removeItem('signup_email');
          localStorage.removeItem('signup_name');
          localStorage.removeItem('pending_signup');
          
          // Navigate to home page
          navigate("/", { replace: true });
        } else {
          console.error('❌ Account creation failed:', accountResult.error);
          setError(accountResult.error || "Failed to create account");
          toast.error(accountResult.error || "Failed to create account");
        }
      } else {
        console.error('❌ OTP verification failed:', result.error);
        setError(result.error || "Verification failed");
        toast.error(result.error || "Verification failed");
      }
    } catch (error: any) {
      console.error('❌ Verification error:', error);
      setError(error.message || "An error occurred");
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email || !name) {
      toast.error("Email and name are required");
      return;
    }

    setResendLoading(true);
    setError("");

    try {
      const result = await emailService.resendOTP(email, name);
      
      if (result.success) {
        toast.success("New verification code sent! 📧");
        setCountdown(60); // Reset countdown
      } else {
        setError(result.error || "Failed to resend code");
        toast.error(result.error || "Failed to resend code");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
      toast.error(error.message || "An error occurred");
    } finally {
      setResendLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    setError(""); // Clear error when user types
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f5f6fa] to-[#e9e6f7]">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate('/signup')}
          className="flex items-center gap-2 text-[#35179d] hover:text-[#2a146a] transition-colors duration-200 font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to Signup</span>
        </button>
      </div>
      
      <Card className="w-full max-w-md p-8 shadow-xl border-0">
        <div className="flex flex-col items-center mb-6">
          <img src={muvrLogo} alt="Muvr Logo" className="h-14 mb-2" />
          <div className="text-2xl font-extrabold text-[#35179d] tracking-tight">Muvr</div>
        </div>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#35179d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-[#35179d]" />
          </div>
          <h2 className="text-xl font-semibold text-[#35179d] mb-2">Verify Your Email</h2>
          <p className="text-gray-600 text-sm">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-[#35179d] font-medium">{email}</p>
        </div>

        <form onSubmit={handleVerifyOTP} className="space-y-4">
          {error && (
            <div className="text-center text-red-600 text-sm bg-red-50 rounded p-3 border border-red-200">
              {error}
            </div>
          )}
          
          <div>
            <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
              Verification Code
            </Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={handleOtpChange}
              className="text-center text-lg font-mono tracking-widest"
              maxLength={6}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full py-3 bg-[#35179d] text-white font-bold hover:bg-[#2a146a] transition" 
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm mb-3">
            Didn't receive the code?
          </p>
          
          <Button
            variant="outline"
            onClick={handleResendOTP}
            disabled={resendLoading || countdown > 0}
            className="w-full py-2 border-[#35179d] text-[#35179d] hover:bg-[#35179d] hover:text-white transition"
          >
            {resendLoading ? (
              <>
                <RefreshCw size={16} className="mr-2 animate-spin" />
                Sending...
              </>
            ) : countdown > 0 ? (
              `Resend in ${countdown}s`
            ) : (
              "Resend Code"
            )}
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            The verification code will expire in 10 minutes
          </p>
        </div>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;

