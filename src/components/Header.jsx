import Hero from './Hero'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import { useContext } from 'react';
import DataContext from '../DataContext';

const Header = () => {

    const { nowPlayingMovies } = useContext(DataContext);

    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                speed={1000}
                rewind={true}
            >
                {
                    nowPlayingMovies.map((movie, id) => (
                        <SwiperSlide key={id}>
                            <Hero movie={movie} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default Header
