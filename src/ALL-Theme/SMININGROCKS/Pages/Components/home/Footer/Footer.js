import React from 'react'
import './Footer.css'
import { companyLogo } from '../../../../../../Recoil/atom';
import { useRecoilValue } from 'recoil';


export default function Footer() {
    const titleImg = useRecoilValue(companyLogo);
    return (
        <div>
            <div className='daimondFooterMain'>
                <div className='footerNewslater' style={{ paddingTop: '30px', paddingInline: '20%' }}>
                    <div className='subScriMain'>
                        <p className='subScriMainTitle'>GET 5% OFF YOUR FIRST ORDER</p>
                        <p className='subScriMainSubTitle'>and stay in the loop with us</p> b
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: '20px' }}>
                            <input type='text' className='footerInputBox' placeholder='Your email here'/>
                            <button className='FooterSubBtn'>SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='FooterLinkMain'>
                        <div className='FooterLinkMainBox'>
                            <p className='footerMoteText'>ABOUT DIAMONDTINE</p>
                            <p className='FoooterText'>We are a contemporary diamond and gold jewellery brand selling exquisite pieces for the woman of today.
                                Learn More</p>
                        </div>
                        <div className='FooterLinkMainBox'>
                            <p className='footerMoteText'>QUICK LINKS</p>
                            <p className='FoooterTextLink'>FAQs</p>
                            <p className='FoooterTextLink'>Size Guide</p>
                            {/* <p className='FoooterTextLink'>Gift Cards</p> */}
                            <p className='FoooterTextLink'>Material & Care</p>
                            <p className='FoooterTextLink'>Terms & Conditions</p>
                            <p className='FoooterTextLink'>Privacy Policy</p>
                        </div>
                        <div className='FooterLinkMainBox'>
                            <p className='footerMoteText'>CUSTOMER SERVICE</p>
                            <p className='FoooterTextLink'>Shipping & Returns</p>
                            <p className='FoooterTextLink'>Exchange & Buyback</p>
                            {/* <p className='FoooterTextLink'>Loyalty Program</p> */}
                            <p className='FoooterTextLink'>Material & Care</p>
                            {/* <p className='FoooterTextLink'>Try at Home</p> */}
                            <p className='FoooterTextLink'>Contact us</p>
                        </div>
                        <div className='FooterLinkMainBox'>
                            <p className='footerMoteText'>MY ACCOUNT</p>
                            <p className='FoooterTextLink'>Sign In</p>
                            {/* <p className='FoooterTextLink'>Track Your Order</p> */}
                            <p className='FoooterTextLink'>Help</p>
                        </div>
                    </div>
                </div>
                <div className='footerBottom'>
                    {/* <img src='https://d-themes.com/wordpress/molla/dummy/wp-content/uploads/sites/38/2020/09/payments.png' className='newImgFooter'/> */}
                    <img src={titleImg} className='logoImgFooter'/>
                    <p className='FooterBottomText'>Copyright © 2023 Diamondtine. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    )
}
