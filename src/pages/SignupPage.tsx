import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { doc, setDoc, usersCollection } from "@/lib/firebase";
import { ActivityLevel, Gender } from "@/types";
import { ArrowLeft } from 'lucide-react';
import muvrLogo from '/public/images/muvr_logo.png';
import { emailService } from "@/services/emailService";

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const passwordChecks = [
  {
    label: "At least 8 characters",
    test: (pwd: string) => pwd.length >= 8,
  },
  {
    label: "At least one number",
    test: (pwd: string) => /\d/.test(pwd),
  },
  {
    label: "At least one uppercase letter",
    test: (pwd: string) => /[A-Z]/.test(pwd),
  },
  {
    label: "At least one lowercase letter",
    test: (pwd: string) => /[a-z]/.test(pwd),
  },
];

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const { currentUser, signup } = useAuth();
  

  
  // Redirect if already logged in
  useEffect(() => {
    console.log('🔍 Checking currentUser state:', currentUser ? `Logged in as ${currentUser.name}` : 'Not logged in');
    if (currentUser) {
      console.log('✅ User already logged in, redirecting to home...');
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);
  
  // Password strength check
  const checkPasswordStrength = (pwd: string) => {
    if (!pwd) return "";
    if (!strongPasswordRegex.test(pwd)) {
      return "Password must be at least 8 characters, include uppercase, lowercase, and number.";
    }
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(checkPasswordStrength(e.target.value));
  };

  // Test EmailJS function
  const testEmailJS = async () => {};

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't proceed if user is already logged in
    if (currentUser) {
      console.log('⚠️ User already logged in, redirecting to home...');
      navigate("/", { replace: true });
      return;
    }
    
    setFormError("");
    setLoading(true);
    
    // Validate password strength
    if (checkPasswordStrength(password)) {
      setPasswordError(checkPasswordStrength(password));
      setLoading(false);
      return;
    }
    
    // Validate gender selection
    if (!gender) {
      setFormError("Please select a gender.");
      setLoading(false);
      return;
    }
    
    // Validate age
    if (!age || +age < 14 || +age > 75) {
      setFormError("Age must be between 14 and 75.");
      setLoading(false);
      return;
    }
    
    try {
      console.log('📝 Starting signup process...');
      
      const result = await signup(
        email,
        password,
        name,
        gender || 'Other',
        age ? parseInt(age) : 14
      );
      
      if (result.success) {
        if (result.requiresVerification) {
          // User will be redirected to verification page by the auth hook
          console.log('✅ Signup successful, redirecting to verification...');
          return;
        } else {
          toast.success("Account created successfully!");
          console.log('✅ Signup successful, navigating to home...');
          
          // Force navigation to home page
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 100);
        }
      } else {
        console.error('❌ Signup failed:', result.error);
        setFormError(result.error || "Failed to create account");
        toast.error(result.error || "Failed to create account");
      }
    } catch (error: any) {
      console.error('❌ Signup error:', error);
      
      let errorMessage = "Failed to create account";
      
      // Handle specific error types
      if (error.message?.includes('IndexedDB') || error.message?.includes('persist')) {
        errorMessage = "Browser storage issue. Please try refreshing the page or use a different browser.";
      } else if (error.message?.includes('network') || error.message?.includes('connection')) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setFormError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const allPasswordChecksPassed = passwordChecks.every(check => check.test(password));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f5f6fa] to-[#e9e6f7]">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#35179d] hover:text-[#2a146a] transition-colors duration-200 font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
      </div>
      <Card className="w-full max-w-md p-8 shadow-xl border-0">
        <div className="flex flex-col items-center mb-6">
          <img src={muvrLogo} alt="Muvr Logo" className="h-14 mb-2" />
          <div className="text-2xl font-extrabold text-[#35179d] tracking-tight">Muvr</div>
        </div>
        <form onSubmit={handleSignup} className="space-y-5">
          <div className="text-lg font-semibold text-center mb-1 text-[#35179d]">Create an account</div>
          <div className="text-center text-gray-500 mb-4 text-sm">
            Enter your information to create an account
          </div>
          {formError && (
            <div className="text-center text-red-600 text-xs mb-2 bg-red-50 rounded p-2 border border-red-200">{formError}</div>
          )}
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                minLength={8}
                required
              />
              <div className="mt-2 space-y-1">
                {passwordChecks.map((check, idx) => {
                  const passed = check.test(password);
                  return (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <span className={passed ? "text-green-600" : "text-red-500"}>{passed ? "✔️" : "❌"}</span>
                      <span className={passed ? "text-green-700" : "text-gray-700"}>{check.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#35179d] text-black text-sm bg-white mt-1"
                required
              >
                <option value="">Select gender</option>
                <option value={Gender.Male}>Male</option>
                <option value={Gender.Female}>Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                min="14"
                max="75"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full py-2 rounded bg-[#35179d] text-white font-bold text-base mt-2 hover:bg-[#2a146a] transition" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </Button>
          
          {/* Test EmailJS button - remove in production */}
          {/* Removed: EmailJS test button since we now use Brevo OTP API */}
          
          <div className="text-center text-xs mt-3 text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#35179d] font-semibold hover:underline">Login</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage; 