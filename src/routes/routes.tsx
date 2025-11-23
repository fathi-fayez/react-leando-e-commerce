import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { MainLayout } from '@layouts/index'
// Suspense fallback
import { SuspenseFallback } from '@components/feedback'

const Home = lazy(() => import("@pages/Home/Home"));
const AboutUs = lazy(() => import("@pages/AboutUs/AboutUs"));
const ContactUs = lazy(() => import("@pages/ContactUs/ContactUs"));
const Products = lazy(() => import("@pages/Products/Products"));
const Categories = lazy(() => import("@pages/Categories/Categories"));
const Register = lazy(() => import("@pages/Register/Register"));
const Login = lazy(() => import("@pages/Login/Login"));
const Error = lazy(() => import("@pages/Error/Error"));
const Cart = lazy(() => import("@pages/Cart/Cart"));


export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainLayout />
        ),
        errorElement: (<Error />),
        children: [
            {
                index: true,
                element: <SuspenseFallback>
                    <Home />
                </SuspenseFallback>,
            },
            {
                path: "about",
                element: <SuspenseFallback>
                    <AboutUs />
                </SuspenseFallback>,
            },
            {
                path: "contact",
                element: <SuspenseFallback>
                    <ContactUs />
                </SuspenseFallback>,
            },
            {
                path: "products/:category",
                element: <SuspenseFallback>
                    <Products />
                </SuspenseFallback>,
            },
            {
                path: "categories",
                element: <SuspenseFallback>
                    <Categories />
                </SuspenseFallback>,
            },
            {
                path: "register",
                element: <SuspenseFallback>
                    <Register />
                </SuspenseFallback>,
            },
            {
                path: "login",
                element: <SuspenseFallback>
                    <Login /></SuspenseFallback>,
            },
            {
                path: "cart",
                element: <SuspenseFallback>
                    <Cart />
                </SuspenseFallback>,
            },
        ],
    },
]);

const RouteRoot = () => {
    return <RouterProvider router={router} />;
}

export default RouteRoot;