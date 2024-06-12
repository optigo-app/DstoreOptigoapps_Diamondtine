import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Video.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction';


const sliderData = [
    {
        imageUrl: "/images/HomePage/MainBanner/Images/HomepageMainBanner1.jpg",
    },
    {
        imageUrl: "/images/HomePage/MainBanner/Images/HomepageMainBanner2.jpg",
    },
    {
        imageUrl: "/images/HomePage/MainBanner/Images/HomepageMainBanner3.jpg",
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
                        <img src={storImagePath() + slide.imageUrl} alt={`Slide ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="image-container">
                <img src={`${storImagePath()}/images/HomePage/Promo/Banner/PromoBanner1.png`} className="centered-image" alt="Diamondtine Banner" />
            </div>
        </div>
    );
}