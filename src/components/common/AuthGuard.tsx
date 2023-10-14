import { useAuthGuard } from "@libs/hooks";
import { ReactNode } from "react";

export const AuthGuard = ({ children }: AuthGuardProps) => {
  useAuthGuard();
  return <>{children}</>;
};

interface AuthGuardProps {
  children: ReactNode;
}
