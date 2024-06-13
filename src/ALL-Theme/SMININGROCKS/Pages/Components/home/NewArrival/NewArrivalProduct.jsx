import React from 'react';
import './Styles.css'
import { Grid, Box } from '@mui/material';
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction';

const products = [
    {
        image: "/images/HomePage/Promo/Set/1/promoSetBanner1Img1.jpg",
        title: "Faith Diamond Ring",
        price: '24,380.00'
    },
    {
        image: "/images/HomePage/Promo/Set/1/promoSetBanner1Img2.jpg",
        title: "Faith Bracelet",
        price: '19,315.00'
    },
    {
        image: "/images/HomePage/Promo/Set/1/promoSetBanner1Img3.jpg",
        title: "Hope Diamond Ring",
        price: '15,788.00'
    },
    {
        image: "/images/HomePage/Promo/Set/1/promoSetBanner1Img4.jpg",
        title: "Hope Bracelet",
        price: '24,808.00'
    },
    {
        image: "/images/HomePage/Promo/Set/1/promoSetBanner1Img5.jpg",
        title: "Cancer",
        price: '6,760.00'
    },
    {
        image: "/images/HomePage/Promo/Set/1/promoSetBanner1Img6.jpg",
        title: "Leo",
        price: '6,760.00'
    },
    {
        image: "/images/HomePage/Promo/Set/1/promoSetBanner1Img7.jpg",
        title: "Aries",
        price: '15,788.00'
    },
    {
        image: "/images/HomePage/Promo/Set/1/promoSetBanner1Img8.jpg",
        title: "Libra",
        price: '6,760.00'
    }
];

const NewArrivalProduct = () => {
    return (
        <div className='NewArrMainDiv' style={{ margin: '50px 0px 50px 0px', padding: '0px 40px 40px 20px', background: '#f0e0e0' }}>
            <h1 className='titleNewArrival' style={{ textAlign: 'center', padding: '20px 0px 20px 0px' }}>NEW ARRIVAL</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={2} justifyContent="center">
                    {products.map((product, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index} className='NewArrivalProductMain'>
                            <div style={{paddingBottom:'20px'}}>
                                <img
                                    style={{ height: "100%", width: "100%" }}
                                    src={storImagePath() + product?.image}
                                    // src={product.image}
                                    alt={product.title}
                                    loading='lazy'
                                />
                                <div>
                                    <p className='newArrivalPdTitle' style={{ margin: "8px 0", fontSize: "16px", fontWeight: "500" }}>
                                        {product.title}
                                    </p>
                                    <p  className='newArrivalPdPrice' style={{ margin: "0",fontSize:'15px', color: "#666" }}>
                                       From: ₹{product.price}
                                    </p>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default NewArrivalProduct;
