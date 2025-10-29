import { NavLink } from "react-router-dom"
import styles from './style.module.css'
const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Leando</h1>
            <nav className="flex space-x-4">
                <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
                    Home
                </NavLink>
                <NavLink to="/products" className={({ isActive }) => (isActive ? styles.active : "")}>
                    Products
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
            </nav>
        </header>
    )
}

export default Header
