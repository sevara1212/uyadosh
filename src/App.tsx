
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { telegramApp } from "@/utils/telegramApp";
import TelegramLogin from "./components/TelegramLogin";
import { emailService } from "@/services/emailService";
import Index from "./pages/Index";
import CreateRoomPage from "./pages/CreateRoomPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import EditRoomPage from "./pages/EditRoomPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import PaymentPage from "./pages/PaymentPage";
import NotFoundWithLayout from "./pages/NotFoundWithLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";
import ChatsPage from "./pages/ChatsPage";
import RequestsPage from "./pages/RequestsPage";
import SentRequestsPage from "./pages/SentRequestsPage";
import UpcomingPage from "./pages/UpcomingPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

const queryClient = new QueryClient();

const App = () => {
  // Initialize Telegram Mini App
  React.useEffect(() => {
    // Initialize EmailJS for OTP emails
    try {
      emailService.init();
      console.log('📧 Email service initialized successfully');
      
      // Test EmailJS connection (optional - remove in production)
      setTimeout(async () => {
        const isWorking = await emailService.testConnection();
        console.log('🧪 EmailJS connection test result:', isWorking);
      }, 2000);
    } catch (e) {
      console.error('❌ Email service initialization failed:', e);
    }

    if (telegramApp.isTelegramApp()) {
      console.log('🚀 Muvr Mini App launched in Telegram');
      
      // Set up Telegram-specific features
      telegramApp.expand(); // Expand to full height
      
      // Set up closing confirmation
      telegramApp.enableClosingConfirmation();
      
      // Listen for viewport changes
      telegramApp.onEvent('viewportChanged', () => {
        console.log('📱 Viewport changed');
      });
      
      // Listen for theme changes
      telegramApp.onEvent('themeChanged', () => {
        console.log('🎨 Theme changed');
        // Re-apply theme
        const root = document.documentElement;
        const themeParams = telegramApp.getThemeParams();
        if (themeParams) {
          root.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
          root.style.setProperty('--tg-theme-text-color', themeParams.text_color);
          root.style.setProperty('--tg-theme-button-color', themeParams.button_color);
          root.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color);
        }
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <TelegramLogin />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/create" element={<CreateRoomPage />} />
              <Route path="/room/:id" element={<RoomDetailPage />} />
              <Route path="/join/:id" element={<RoomDetailPage />} />
              <Route path="/edit-room/:id" element={<EditRoomPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/upcoming" element={<UpcomingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile-settings" element={<ProfileSettingsPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/category/:sport" element={<ActivitiesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/chat/:roomId" element={<ChatPage />} />
              <Route path="/chats" element={<ChatsPage />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="/sent-requests" element={<SentRequestsPage />} />
              <Route path="*" element={<NotFoundWithLayout />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;