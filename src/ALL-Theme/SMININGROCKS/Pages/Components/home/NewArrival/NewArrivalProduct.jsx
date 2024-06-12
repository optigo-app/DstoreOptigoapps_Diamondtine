import React from 'react';
import './Styles.css'
import { Grid, Box } from '@mui/material';

const products = [
    {
        image: "https://www.diamondtine.com/wp-content/uploads/2022/11/faith-ring.jpg",
        title: "Faith Diamond Ring",
        price: '24,380.00'
    },
    {
        image: "https://www.diamondtine.com/wp-content/uploads/2022/11/faith-bracelet.jpg",
        title: "Faith Bracelet",
        price: '19,315.00'
    },
    {
        image: "https://www.diamondtine.com/wp-content/uploads/2022/11/hope-ring.jpg",
        title: "Hope Diamond Ring",
        price: '15,788.00'
    },
    {
        image: "https://www.diamondtine.com/wp-content/uploads/2022/11/DSC07252-scaled.jpg",
        title: "Hope Bracelet",
        price: '24,808.00'
    },
    {
        image: "https://www.diamondtine.com/wp-content/uploads/2022/11/SJKJP512-1.jpg",
        title: "Cancer",
        price: '6,760.00'
    },
    {
        image: "https://www.diamondtine.com/wp-content/uploads/2022/11/SJKJP519-1.jpg",
        title: "Leo",
        price: '6,760.00'
    },
    {
        image: "https://www.diamondtine.com/wp-content/uploads/2022/11/SJKJP509-1.jpg",
        title: "Aries",
        price: '15,788.00'
    },
    {
        image: "https://www.diamondtine.com/wp-content/uploads/2022/11/SJKJP513-1.jpg",
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
                                    src={product.image}
                                    alt={product.title}
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
