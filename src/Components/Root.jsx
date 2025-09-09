import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Root = () => {
  return (
    <div className="w-[80%] mx-auto flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
