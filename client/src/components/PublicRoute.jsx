import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function PublicRoute({ children }) {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader2 size="64" />
      </div>
    );
  }

  return user ? <Navigate to="/" /> : children;
}
