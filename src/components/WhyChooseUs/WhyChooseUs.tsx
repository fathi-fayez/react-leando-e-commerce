import styles from './style.module.css';

interface Feature {
    icon: string;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: '🚚',
        title: 'Free Shipping',
        description: 'Free shipping on orders over $50'
    },
    {
        icon: '🔒',
        title: 'Secure Payment',
        description: '100% secure payment processing'
    },
    {
        icon: '💬',
        title: '24/7 Support',
        description: 'Round-the-clock customer support'
    },
    {
        icon: '↩️',
        title: 'Easy Returns',
        description: 'Hassle-free return policy'
    },
    {
        icon: '⭐',
        title: 'Quality Products',
        description: 'Premium quality guaranteed'
    },
    {
        icon: '💰',
        title: 'Best Prices',
        description: 'Competitive pricing always'
    }
];

const WhyChooseUs = () => {
    return (
        <section className={styles.whyChooseUs}>
            <div className={styles.container}>
                <h2 className={styles.title}>Why Choose Us</h2>
                <p className={styles.subtitle}>
                    We provide the best shopping experience with quality products and excellent service
                </p>
                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.icon}>{feature.icon}</div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;

