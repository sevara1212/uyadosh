import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import logo from '/public/images/logo.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const { currentUser, login, error: authError, loading: authLoading } = useAuth();
  
  // Clear error when user starts typing
  useEffect(() => {
    // Only show authError if user has actually attempted to log in
    if (authError && hasAttemptedLogin) {
      setLocalError(authError);
    } else {
      setLocalError(null);
    }
  }, [authError, hasAttemptedLogin]);

  // Clear local error when user starts typing
  useEffect(() => {
    if (localError && (email || password)) {
      setLocalError(null);
      setHasAttemptedLogin(false);
    }
  }, [email, password, localError]);
  
  // Redirect if already logged in (but not if there's an error or loading)
  useEffect(() => {
    if (currentUser && !authError && !authLoading) {
      console.log('✅ User already logged in, redirecting to home...');
      navigate("/", { replace: true });
    }
  }, [currentUser, authError, authLoading, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't proceed if user is already logged in
    if (currentUser) {
      console.log('⚠️ User already logged in, redirecting to home...');
      navigate("/", { replace: true });
      return;
    }
    
    setHasAttemptedLogin(true);
    setLoading(true);
    
    try {
      console.log('🔐 Starting login process...');
      
      const result = await login(email, password);
      if (result.success) {
        console.log('✅ Login successful, navigating to home...');
        // Navigation will be handled by the useEffect when auth state changes
      } else {
        console.log("❌ Login failed:", result.error);
        // Error toast is already shown by the auth hook
      }
    } catch (error: any) {
      console.error('❌ Login error:', error);
      toast.error(error.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
      </div>
      <Card className="w-full max-w-md p-8 shadow-lg border border-gray-100 bg-white">
        <div className="flex flex-col items-center mb-8">
          {/* Uyadosh Logo Circle */}
          <div className="flex items-center justify-center rounded-lg overflow-hidden mb-4" style={{ height: '80px', width: '80px', minWidth: '80px' }}>
            <img src={logo} alt="Uyadosh Logo" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 text-center leading-tight" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}>
            Uyadosh
          </h1>
          <p className="text-gray-500 text-sm mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>Find your perfect roommate</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="text-lg font-semibold text-center mb-1 text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>Login</div>
          <div className="text-center text-gray-500 mb-4 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            Enter your email and password to access your account
          </div>
          <div className="space-y-3">
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pr-10 bg-gray-50 border-gray-200 focus:border-gray-600 focus:ring-gray-600"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" stroke="none"/><path d="M4 4l8 8 8-8"/></svg>
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 bg-gray-50 border-gray-200 focus:border-gray-600 focus:ring-gray-600"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          {localError && (
            <div className="text-center text-red-600 text-sm mb-2 bg-red-50 rounded p-3 border border-red-200">
              <div className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{localError}</div>
            </div>
          )}
          <Button 
            type="submit" 
            className="w-full py-2 rounded-xl bg-gray-800 text-white font-semibold text-base mt-2 hover:bg-gray-900 transition" 
            disabled={loading}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <div className="text-center text-sm mt-4 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Don't have an account?{' '}
            <Link to="/signup" className="text-gray-800 font-semibold hover:text-gray-900 transition">Sign up</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage; 