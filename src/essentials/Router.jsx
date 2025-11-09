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
                    element: <Pages.Dashboard/>,
                    children: [{
                        path: 'orders',
                        element: <Pages.Orders/>
                    },{
                        path: 'createOrder',
                        element: <Pages.CreateOrder/>,
                    },{
                        path: 'products',
                        element: <Pages.Products/>,
                    }]
                },
            ]
        }
    ]
)

export default router;