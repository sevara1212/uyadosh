import { testFirebaseConnection } from "@/services/chatService";
import { auth } from "@/lib/firebase";

export const testFirebaseSetup = async () => {
  console.log("🧪 Testing Firebase setup...");
  
  try {
    // Test authentication state
    const currentUser = auth.currentUser;
    console.log("👤 Current user:", currentUser ? currentUser.uid : "Not authenticated");
    
    // Test Firebase connection
    const connectionTest = await testFirebaseConnection();
    console.log("🔗 Firebase connection:", connectionTest ? "✅ Working" : "❌ Failed");
    
    // Test if user is authenticated
    if (!currentUser) {
      console.warn("⚠️ User not authenticated - this may cause chat issues");
      return {
        success: false,
        error: "User not authenticated",
        details: {
          authenticated: false,
          connection: connectionTest
        }
      };
    }
    
    return {
      success: connectionTest,
      error: connectionTest ? null : "Firebase connection failed",
      details: {
        authenticated: true,
        connection: connectionTest,
        userId: currentUser.uid
      }
    };
  } catch (error) {
    console.error("❌ Firebase test failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: {
        authenticated: !!auth.currentUser,
        connection: false
      }
    };
  }
};

export const debugChatConnection = async (roomId: string) => {
  console.log("🔍 Debugging chat connection for room:", roomId);
  
  const testResult = await testFirebaseSetup();
  console.log("📊 Test result:", testResult);
  
  if (!testResult.success) {
    console.error("❌ Chat connection will fail:", testResult.error);
    return false;
  }
  
  console.log("✅ Chat connection should work");
  return true;
}; 