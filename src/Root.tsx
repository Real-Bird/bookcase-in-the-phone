import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

function Root() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default Root;
