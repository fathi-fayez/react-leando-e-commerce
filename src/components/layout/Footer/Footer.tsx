const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 flex items-center justify-center">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} Leando E-commerce. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer

