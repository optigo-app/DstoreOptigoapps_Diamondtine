import React from 'react';
import './style.css';
import { Button } from '@mui/material';
import { AiFillInstagram } from "react-icons/ai";
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction';

const InstagramGallery = () => {
    const photos = [
        {
            image: "/images/HomePage/BottombBanner/BottombBanner1.jpg",
        },
        {
            image: "/images/HomePage/BottombBanner/BottombBanner2.jpg",
        },
        {
            image: "/images/HomePage/BottombBanner/BottombBanner3.jpg",
        },
        {
            image: "/images/HomePage/BottombBanner/BottombBanner4.jpg",
        },
        {
            image: "/images/HomePage/BottombBanner/BottombBanner5.jpg",
        }
    ];

    return (
        <>
            <p className='followInsTitle'>FOLLOW US ON INSTAGRAM</p>
            <div className='SocialmediawidgetsComponentsCard'>
                <div className="instagram-gallery">
                    {photos.map((photo, index) => (
                        <div key={index} className="instagram-photo">
                            <img src={storImagePath() + photo?.image} alt={`Instagram Photo ${index + 1}`}  loading='lazy'/>
                            <div className="overlay"></div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="contained" color="secondary" style={{ backgroundColor: '#a8807c', marginTop: '1rem', boxShadow: 'none' }} startIcon={<AiFillInstagram />}>
                    Follow us
                </Button>
            </div>
        </>
    );
}

export default InstagramGallery;
