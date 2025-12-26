import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { telegramApp } from '@/utils/telegramApp';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Smartphone } from 'lucide-react';

const TelegramLogin: React.FC = () => {
  const { loginWithTelegram, currentUser, loading, error } = useAuth();
  const [isTelegramApp, setIsTelegramApp] = useState(false);
  const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);

  useEffect(() => {
    // Check if we're in Telegram Mini App
    const checkTelegramApp = () => {
      const isInTelegram = telegramApp.isTelegramApp();
      setIsTelegramApp(isInTelegram);
      
      if (isInTelegram && !currentUser && !autoLoginAttempted) {
        console.log('🚀 Auto-login in Telegram Mini App...');
        setAutoLoginAttempted(true);
        handleTelegramLogin();
      }
    };

    checkTelegramApp();
  }, [currentUser, autoLoginAttempted]);

  const handleTelegramLogin = async () => {
    try {
      const result = await loginWithTelegram();
      if (result.success) {
        console.log('✅ Telegram auto-login successful');
      } else {
        console.log('❌ Telegram auto-login failed:', result.error);
      }
    } catch (error) {
      console.error('❌ Telegram login error:', error);
    }
  };

  // If not in Telegram Mini App, show nothing
  if (!isTelegramApp) {
    return null;
  }

  // If user is already logged in, show nothing
  if (currentUser) {
    return null;
  }

  // If loading, show loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Loader2 className="h-8 w-8 animate-spin text-[#35179d]" />
            </div>
            <CardTitle className="text-lg">Connecting to Telegram</CardTitle>
            <CardDescription>
              Setting up your account...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // If there's an error, show error state
  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Smartphone className="h-8 w-8 text-red-500" />
            </div>
            <CardTitle className="text-lg text-red-600">Connection Error</CardTitle>
            <CardDescription className="text-red-500">
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={handleTelegramLogin}
              className="w-full bg-[#35179d] hover:bg-[#2a146a]"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show manual login button if auto-login didn't work
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Smartphone className="h-8 w-8 text-[#35179d]" />
          </div>
          <CardTitle className="text-lg">Welcome to Muvr</CardTitle>
          <CardDescription>
            Connect with your Telegram account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={handleTelegramLogin}
            className="w-full bg-[#35179d] hover:bg-[#2a146a]"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Smartphone className="mr-2 h-4 w-4" />
                Connect with Telegram
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TelegramLogin; 