import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Pages from "../pages/pages";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App/>,
            children: [
                {
                    path: '',
                    element: <Pages.Welcome/>,
                }
            ]
        }
    ]
)

export default router;