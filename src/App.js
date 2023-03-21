import { Fragment } from "react";
import MainPage, {loader as mainLoader} from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/reactivechat/:user", element: <MainPage />, loader: mainLoader },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

// function App() {
//   return (
//     <Fragment>
//       <MainPage />
//     </Fragment>
//   );
// }

export default App;
