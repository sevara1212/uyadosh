
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundWithLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout hideNav={true}>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="text-6xl font-bold text-fitness-primary mb-4">404</div>
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-fitness-primary hover:bg-fitness-primary/90"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundWithLayout;
