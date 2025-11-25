import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactUs() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Get in Touch with <span className="text-cyan-400">Leando</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                        Questions? Feedback? Just want to say hi? We’re here 24/7 to help you.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                icon: Mail,
                                title: "Email Us",
                                details: ["support@leando.com", "We reply within 2 hours"],
                                color: "cyan",
                            },
                            {
                                icon: Phone,
                                title: "Call Us",
                                details: ["+1 (555) 123-LEANDO", "Mon–Sun: 8 AM – 10 PM EST"],
                                color: "cyan",
                            },
                            {
                                icon: MapPin,
                                title: "Visit Us",
                                details: ["123 Commerce Street", "New York, NY 10001, USA"],
                                color: "cyan",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow"
                            >
                                <div
                                    className={`w-20 h-20 bg-${item.color}-100 text-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6`}
                                >
                                    <item.icon className={`w-10 h-10 text-${item.color}-600`} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                {item.details.map((line, i) => (
                                    <p key={i} className={`text-gray-600 ${i === 0 ? 'font-medium text-lg' : ''}`}>
                                        {line}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Working Hours */}
                    <div className="bg-cyan-600 text-white rounded-2xl p-10 max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Clock className="w-8 h-8" />
                            <h3 className="text-2xl font-bold">We’re Here When You Need Us</h3>
                        </div>
                        <p className="text-xl text-cyan-100">
                            Customer support available <span className="font-bold">24 hours a day, 7 days a week</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form + Map Placeholder */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-cyan-500 transition"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-cyan-500 transition"
                                        required
                                    />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-cyan-500 transition"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-cyan-500 transition"
                                    required
                                />
                                <textarea
                                    rows={6}
                                    placeholder="How can we help you today?"
                                    className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-cyan-500 transition resize-none"
                                    required
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-lg py-5 rounded-xl flex items-center justify-center gap-3 transition"
                                >
                                    <Send className="w-6 h-6" />
                                    Send Message
                                </button>
                            </form>

                            <div className="mt-8 flex items-center gap-3 text-cyan-600">
                                <CheckCircle className="w-6 h-6" />
                                <p className="font-medium">We typically reply in under 2 hours!</p>
                            </div>
                        </div>

                        {/* Map or Office Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="src/assets/images/download.jpg"
                                alt="Leando headquarters"
                                className="w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <h3 className="text-2xl font-bold mb-2">Leando HQ</h3>
                                    <p className="text-lg opacity-90">New York • USA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Shortcut */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold mb-6">Need Help Faster?</h2>
                    <p className="text-xl text-gray-300 mb-10">
                        Check out our Help Center — most questions are answered there instantly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a
                            href="/faq"
                            className="inline-flex items-center bg-cyan-600 hover:bg-cyan-500 font-semibold text-lg px-10 py-4 rounded-full transition"
                        >
                            Browse FAQs
                        </a>
                        <a
                            href="/track-order"
                            className="inline-flex items-center border-2 border-cyan-500 hover:bg-cyan-500/10 font-semibold text-lg px-10 py-4 rounded-full transition"
                        >
                            Track Your Order
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}