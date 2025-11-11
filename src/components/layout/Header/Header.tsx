import { NavLink } from "react-router-dom"
import styles from './style.module.css'
import HeaderBasket from "./HeaderBasket/HeaderBasket";
const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 px-20 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Leando</h1>
            <nav className="flex space-x-4 ">
                <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
                    Home
                </NavLink>
                <NavLink to="/categories" className={({ isActive }) => (isActive ? styles.active : "")}>
                    Categories
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")}>
                    About
                </NavLink>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? styles.active : "")}>
                    Contact
                </NavLink>
                <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>
                    Login
                </NavLink>
                <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")}>
                    Register
                </NavLink>
                <NavLink to="/cart" className={({ isActive }) => (isActive ? styles.active : "")}>
                    <HeaderBasket />
                </NavLink>
            </nav>
        </header>
    )
}

export default Header
