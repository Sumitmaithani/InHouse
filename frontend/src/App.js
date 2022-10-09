import "./App.css";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Register from "./pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";

const App = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navigation />
        <Home />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Navigation />
        <Register />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navigation />
        <Login />
      </>
    ),
  },
]);

// function App() {
//   return (
//     <BrowserRouter>
//     <Navigation />
//       <Switch>
//         <Route path="/" exact>
//           <Home />
//         </Route>
//         <Route path="/register" exact>
//           <Register />
//         </Route>
//       </Switch>
//     </BrowserRouter>
//   );
// }

export default App;
