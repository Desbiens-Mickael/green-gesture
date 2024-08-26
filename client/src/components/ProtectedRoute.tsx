import { ReactElement } from "react";
import { Navigate, Outlet, OutletProps } from "react-router-dom";

interface Props {
  isAllowed: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
}

function ProtectedRoute({ isAllowed, redirectPath = "/", children }: Props) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;
