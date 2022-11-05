import "./App.css";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";
import RootLayout from "./RootLayout";

const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <>
      {isAuth ? (
        <Navigate to="/rooms" replace={true} />
      ) : (
        <>
          <Navigation />
          {children}
        </>
      )}
    </>
  );
};

const SemiProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <>
      {!isAuth ? (
        <Navigate to="/" replace={true} />
      ) : isAuth && !user.activated ? (
        <>
          <Navigation />
          {children}
        </>
      ) : (
        <Navigate to="/rooms" replace={true} />
      )}
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <>
      {!isAuth ? (
        <Navigate to="/" replace={true} />
      ) : isAuth && !user.activated ? (
        <Navigate to="/activate" replace={true} />
      ) : (
        <>
          <Navigation />
          {children}
        </>
      )}
    </>
  );
};

// const App = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <GuestRoute>
//         <Home />
//       </GuestRoute>
//     ),
//   },
//   {
//     path: "/authenticate",
//     element: (
//       <GuestRoute>
//         <Authenticate />
//       </GuestRoute>
//     ),
//   },
//   {
//     path: "/activate",
//     element: (
//       <SemiProtectedRoute>
//         <Activate />
//       </SemiProtectedRoute>
//     ),
//   },
//   {
//     path: "/rooms",
//     element: (
//       <ProtectedRoute>
//         <Rooms />
//       </ProtectedRoute>
//     ),
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={
          <GuestRoute>
            <Home />
          </GuestRoute>
        }
      />
      <Route
        path="/authenticate"
        element={
          <GuestRoute>
            <Authenticate />
          </GuestRoute>
        }
      />
      <Route
        path="/activate"
        element={
          <SemiProtectedRoute>
            <Activate />
          </SemiProtectedRoute>
        }
      />
      <Route
        path="/rooms"
        element={
          <ProtectedRoute>
            <Rooms />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
