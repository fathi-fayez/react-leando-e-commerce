import { ArrowRight, Package, Truck, Shield, Heart } from 'lucide-react';

export default function AboutUs() {
    return (
        <>
        

            {/* Our Story */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Founded in 2023, Leando began with a simple idea: to create a shopping experience
                                that feels personal, reliable, and joyful — even in a digital world.
                            </p>
                            <p className="text-lg text-gray-600 mb-6">
                                Tired of endless scrolling and questionable quality, our founders set out to curate
                                a collection of premium products from trusted brands and emerging makers alike.
                            </p>
                            <p className="text-lg text-gray-600">
                                Today, Leando is home to thousands of happy customers who value authenticity,
                                fast delivery, and exceptional service — just like we do.
                            </p>
                        </div>
                        <div className="relative">
                            <img
                                src="src/assets/images/images.png"
                                alt="Leando team working together"
                                className="rounded-2xl shadow-2xl w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Values</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: Shield, title: "Trust & Transparency", desc: "Honest pricing, clear policies, and real reviews." },
                            { icon: Package, title: "Quality First", desc: "Every product is carefully vetted before it reaches you." },
                            { icon: Truck, title: "Fast & Reliable", desc: "Quick shipping and hassle-free returns, always." },
                            { icon: Heart, title: "Customer Obsessed", desc: "Your satisfaction is our #1 priority." }
                        ].map((value, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <value.icon className="w-9 h-9 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-emerald-600 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-10 text-center">
                        {[
                            { number: "50K+", label: "Happy Customers" },
                            { number: "1M+", label: "Orders Delivered" },
                            { number: "300+", label: "Trusted Brands" },
                            { number: "98%", label: "Satisfaction Rate" }
                        ].map((stat, index) => (
                            <div key={index}>
                                <h3 className="text-5xl font-bold mb-2">{stat.number}</h3>
                                <p className="text-emerald-100 text-lg">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12">Our Promise to You</h2>
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-10 rounded-2xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-lg text-gray-700">
                                To make premium shopping accessible, enjoyable, and trustworthy for everyone —
                                one perfect order at a time.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-10 rounded-2xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-lg text-gray-700">
                                To become the most loved e-commerce destination where quality, care,
                                and customer happiness come first.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

         
        </>
    );
}