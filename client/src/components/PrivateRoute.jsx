import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
const PrivateRouter = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return <Loader2 />;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
