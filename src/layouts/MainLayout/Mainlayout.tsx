import { Outlet } from 'react-router-dom'
import styles from './style.module.css'
import { Header, Footer } from '@components/layout'
const MainLayout = () => {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>)
}

export default MainLayout