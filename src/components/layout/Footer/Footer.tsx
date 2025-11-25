import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                            Leando
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-400 mb-6">
                            Your one-stop destination for quality products at unbeatable prices.
                            Shop with confidence and enjoy fast, reliable delivery.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-gray-800/50 backdrop-blur rounded-xl flex items-center justify-center hover:bg-blue-500 hover:scale-110 transition-all duration-300">
                                <img src="https://img.icons8.com/ios-filled/50/ffffff/twitterx--v1.png" alt="Twitter" className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800/50 backdrop-blur rounded-xl flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300">
                                <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook" className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800/50 backdrop-blur rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:scale-110 transition-all duration-300">
                                <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new--v1.png" alt="Instagram" className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800/50 backdrop-blur rounded-xl flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all duration-300">
                                <img src="https://img.icons8.com/ios-filled/50/ffffff/youtube-play.png" alt="YouTube" className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></span>
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></span>
                            Customer Service
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300">
                                    Shipping & Returns
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300">
                                    Terms & Conditions
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></span>
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 group">
                                <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-400 leading-relaxed">123 Commerce Street,<br/>Business City, BC 12345</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-400">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-400">support@leando.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} Leando. All rights reserved.
                        </p>

                        {/* Payment Methods */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 mr-2">We accept:</span>
                            <div className="flex items-center gap-2">
                                <img
                                    src="https://img.icons8.com/color/48/visa.png"
                                    alt="Visa"
                                    className="h-8 object-contain"
                                />
                                <img
                                    src="https://img.icons8.com/color/48/mastercard-logo.png"
                                    alt="Mastercard"
                                    className="h-8 object-contain"
                                />
                                <img
                                    src="https://img.icons8.com/color/48/paypal.png"
                                    alt="PayPal"
                                    className="h-8 object-contain"
                                />
                                <img
                                    src="https://img.icons8.com/ios-filled/50/ffffff/apple-pay.png"
                                    alt="Apple Pay"
                                    className="h-8 object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
