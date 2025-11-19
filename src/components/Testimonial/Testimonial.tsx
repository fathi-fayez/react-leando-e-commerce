import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useQuotes } from '@hooks/useQuotes';
import styles from './style.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonial = () => {
    const { quotes, loading, error } = useQuotes(10);

    return (
        <section className={styles.testimonialSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>What People Say</h2>
                    <p className={styles.subtitle}>
                        Inspiring words from great minds
                    </p>
                </div>

                {loading === "pending" ? (
                    <div className={styles.loadingText}>Loading please wait...</div>
                ) : loading === "failed" ? (
                    <div className={styles.errorText}>{error}</div>
                ) : quotes.length > 0 ? (
                    <div className={styles.swiperWrapper}>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                },
                            }}
                            className={styles.swiper}
                        >
                            {quotes.map((quote) => (
                                <SwiperSlide key={quote.id}>
                                    <div className={styles.testimonialCard}>
                                        <div className={styles.quoteIcon}>
                                            <svg
                                                width="40"
                                                height="40"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M3 21C3 17.4 5.4 15 9 15C10.2 15 11.4 15.3 12.6 15.9C12.3 16.5 12 17.1 12 18C12 19.1 12.9 20 14 20C15.1 20 16 19.1 16 18C16 16.9 15.1 16 14 16C13.7 16 13.4 16.1 13.1 16.2C12.4 15.5 11.5 15 10.5 15C6.9 15 4.5 17.4 4.5 21H3ZM14 21C14 17.4 16.4 15 20 15C21.2 15 22.4 15.3 23.6 15.9C23.3 16.5 23 17.1 23 18C23 19.1 23.9 20 25 20C26.1 20 27 19.1 27 18C27 16.9 26.1 16 25 16C24.7 16 24.4 16.1 24.1 16.2C23.4 15.5 22.5 15 21.5 15C17.9 15 15.5 17.4 15.5 21H14Z"
                                                    fill="currentColor"
                                                    opacity="0.3"
                                                />
                                            </svg>
                                        </div>
                                        <p className={styles.quoteText}>
                                            "{quote.quote}"
                                        </p>
                                        <div className={styles.author}>
                                            <div className={styles.authorLine}></div>
                                            <span className={styles.authorName}>
                                                {quote.author}
                                            </span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default Testimonial;

