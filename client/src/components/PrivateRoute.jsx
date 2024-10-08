import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
const PrivateRouter = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader2 size="64" className="animate-spin" />
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
