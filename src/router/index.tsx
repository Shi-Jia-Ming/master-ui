import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "../App.tsx";
import MasterDock from "../views/MasterDock.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/master-ui/"} />
  },
  {
    path: "/master-ui/",
    element: <App />
  },
  {
    path: "/master-ui/master/panel",
    element: <div>Master Panel</div>
  },
  {
    path: "/master-ui/master/dock",
    element: <MasterDock />
  }
]);

export default router;