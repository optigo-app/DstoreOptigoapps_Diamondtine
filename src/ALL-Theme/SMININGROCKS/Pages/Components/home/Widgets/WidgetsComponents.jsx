import React from 'react';
import './style.css'
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const services = [
    {
        image: "https://www.diamondtine.com/wp-content/uploads/2022/10/2-1.png",
        title: "CUSTOMISATION",
        buttonText: "Whatsapp up to start",
    },
    {
        image: "https://www.diamondtine.com/wp-content/uploads/2022/10/6.png",
        title: "TRY AT HOME",
        buttonText: "Book a visit",
    },
    {
        image: "https://www.diamondtine.com/wp-content/uploads/2022/10/4-1.png",
        title: "BOOK AN APPOINTMENT",
        buttonText: "Book now",
    }
];

const ServiceCards = () => {
    const handleImageError = (event) => {
        event.target.src = 'https://via.placeholder.com/300x200';
    };

    return (
        <div className='widgetsComponentsCard'>
            <Grid container spacing={2} justifyContent="center">
                {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <div className="widgetsTitleDiv mb-3">
                            <div class="lineContainer">
                                <p>{service?.title}</p>
                            </div>
                            <div className="containerLine">
                                <div className="line"></div>
                                <img src="https://d-themes.com/wordpress/molla/dummy/wp-content/uploads/sites/38/2020/07/diamond.png" alt="" class="centeredImage" />
                                <div className="line"></div>
                            </div>
                        </div>
                        <Card className="service-card">
                            <div className="text-block">
                                <Button variant="contained" color="secondary" style={{ backgroundColor: '#a8807c', marginTop: '1rem', boxShadow: 'none' }}>
                                    {service.buttonText}
                                </Button>
                            </div>
                            <CardMedia
                                component="img"
                                height="100%"
                                width='100%'
                                src={service.image}
                                alt={service.title}
                                onError={handleImageError}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ServiceCards;
