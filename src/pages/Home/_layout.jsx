import Header from "../../components/Header";
import { Outlet } from "react-router";

function HomeLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header logged />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
