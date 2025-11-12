import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { MainLayout } from '@layouts/index'
// import { Home, AboutUs, ContactUs, Products, Categories, Register, Login, Error, Cart } from '@pages/index'

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
        errorElement: (
            <Suspense fallback={<div>Loading...</div>}>
                <Error />
            </Suspense>),
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "about",
                element: <AboutUs />,
            },
            {
                path: "contact",
                element: <ContactUs />,
            },
            {
                path: "products/:category",
                element: <Products />,
            },
            {
                path: "categories",
                element: <Categories />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
        ],
    },
]);

const RouteRoot = () => {
    return <RouterProvider router={router} />;
}

export default RouteRoot;