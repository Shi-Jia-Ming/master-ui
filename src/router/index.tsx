import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "../App.tsx";
import MasterDock from "../views/MasterDock.tsx";
import MasterPanel from "../views/MasterPanel.tsx";

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
    path: "/master-ui/panel",
    element: <MasterPanel />
  },
  {
    path: "/master-ui/dock",
    element: <MasterDock />
  }
]);

export default router;