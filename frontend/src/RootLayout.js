import { Outlet } from "react-router-dom";
import Loader from "./components/shared/Loader/Loader";
import Navigation from "./components/shared/Navigation/Navigation";
import useLoadingWithRefresh from "./hooks/useLoadingWithRefresh";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RootLayout() {
  const { loading } = useLoadingWithRefresh();
  return (
    <>
      <main>
        {loading ? (
          <>
            <Navigation />
            <Loader message="Loading, please wait.." />
          </>
        ) : (
          <>
            <ToastContainer />
            <Outlet />
          </>
        )}
      </main>
    </>
  );
}

export default RootLayout;
