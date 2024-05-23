import React from 'react';
import './style.css';
import { Button } from '@mui/material';
import { AiFillInstagram } from "react-icons/ai";

const InstagramGallery = () => {
    const photos = [
        {
            image: "https://www.diamondtine.com/wp-content/uploads/2022/11/insta-dt-1-300x300.jpg",
        },
        {
            image: "https://www.diamondtine.com/wp-content/uploads/2022/11/insta-dt-2-300x300.jpg",
        },
        {
            image: "https://www.diamondtine.com/wp-content/uploads/2022/11/insta-dt-3-300x300.jpg",
        },
        {
            image: "https://www.diamondtine.com/wp-content/uploads/2022/11/insta-dt-4-300x300.jpg",
        },
        {
            image: "https://www.diamondtine.com/wp-content/uploads/2022/11/insta-dt-5-300x300.jpg",
        }
    ];

    return (
        <>
            <div className='SocialmediawidgetsComponentsCard'>
                <div className="instagram-gallery">
                    {photos.map((photo, index) => (
                        <div key={index} className="instagram-photo">
                            <img src={photo.image} alt={`Instagram Photo ${index + 1}`} />
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
