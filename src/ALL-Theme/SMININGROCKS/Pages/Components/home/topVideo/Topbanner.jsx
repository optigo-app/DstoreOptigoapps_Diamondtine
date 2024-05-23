import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Video.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';


const sliderData = [
    {
        imageUrl: "https://www.diamondtine.com/wp-content/uploads/2023/03/Diamondtine-Website-Banners_Diamond-letters_2.jpg",
    },
    {
        imageUrl: "https://www.diamondtine.com/wp-content/uploads/2023/03/Diamondtine-Website-Banners_Manifest-It.jpg",
    },
    {
        imageUrl: "https://www.diamondtine.com/wp-content/uploads/2023/03/Diamondtine-Website-Banners_Zodiac_2.jpg",
    },
];

export default function Topbanner() {
    return (
        <div id='craftmenshipId'>
            <Swiper
                pagination={{ clickable: false }}
                className="mySwiper"
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
            >
                {sliderData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <img src={slide.imageUrl} alt={`Slide ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="image-container">
                <img src="https://www.diamondtine.com/wp-content/uploads/2023/03/Daimondtine-Banner-Values.png" className="centered-image" alt="Diamondtine Banner" />
            </div>
        </div>
    );
}