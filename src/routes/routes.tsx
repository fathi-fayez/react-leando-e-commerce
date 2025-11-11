import { createBrowserRouter, RouterProvider } from "react-router";
import { MainLayout } from '@layouts/index'
import { Home, AboutUs, ContactUs, Products, Categories, Register, Login, Error, Cart } from '@pages/index'


export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainLayout />
        ),
        errorElement: <Error />,
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