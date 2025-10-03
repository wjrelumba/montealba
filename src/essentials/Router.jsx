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
                },
                {
                    path: 'login',
                    element: <Pages.Login/>,
                },
                {
                    path: 'dashboard',
                    element: <Pages.Dashboard/>
                }
            ]
        }
    ]
)

export default router;