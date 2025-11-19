// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import type { TProduct } from '@customTypes/product';
import ProductCard from '@components/Product/Product';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface SwiperComponentProps {
    products: TProduct[];
    slidesPerView?: number;
    spaceBetween?: number;
    showNavigation?: boolean;
    showPagination?: boolean;
    showScrollbar?: boolean;
}

export const SwiperComponent = ({
    products,
    slidesPerView = 3,
    spaceBetween = 30,
    showNavigation = true,
    showPagination = true,
    showScrollbar = false,
}: SwiperComponentProps) => {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="py-8">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                navigation={showNavigation}
                pagination={showPagination ? { clickable: true } : false}
                scrollbar={showScrollbar ? { draggable: true } : false}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: slidesPerView,
                        spaceBetween: spaceBetween,
                    },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard item={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};