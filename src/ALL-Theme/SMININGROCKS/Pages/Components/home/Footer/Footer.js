import React, { useEffect, useState } from 'react'
import './Footer.css'
import { companyLogo } from '../../../../../../Recoil/atom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { storImagePath } from '../../../../Utils/globalFunctions/GlobalFunction';


export default function Footer() {
    const titleImg = useRecoilValue(companyLogo);
    const [storeInitData, setStoreInitData] = useState();
    const [companyInfoData, setCompanuInfoData] = useState();
    const [socialMediaData, setSocialMediaData] = useState([]);
    const [email, setEmail] = useState();
    const [selectedFooteVal, setSelectedVal] = useState(0);
    const navigation = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };


    const handleSubmitNewlater = async () => {
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const newslater = storeInit?.newslatter;
        console.log('newsletter', newslater);
        if (email) {
            if (newslater) {
                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };
                const newsletterUrl = `${newslater}${email}`;
                fetch(newsletterUrl, requestOptions)
                    .then((response) => response.text())
                    .then((result) => console.log(result))
                    .catch((error) => console.error(error));
            }
        }

    };

    const handleNavigte = (navigateUrl) => {
        navigation(navigateUrl)
    }

    useEffect(() => {
        const storeInit = JSON.parse(localStorage.getItem("storeInit")) ?? ""
        setStoreInitData(storeInit);
        const companyInfoData = JSON.parse(localStorage.getItem("CompanyInfoData")) ?? ""
        if (companyInfoData) {
            setCompanuInfoData(companyInfoData)
            const parsedSocilaMediaUrlData = (companyInfoData?.SocialLinkObj);
            setSocialMediaData(parsedSocilaMediaUrlData)
        }
    }, [])

    const openPdf = () => {
        window.open(`${storImagePath()}/pdf/size-guide-diamondtine.pdf`, '_blank');
    };

    return (
        <div>
            <div className='daimondFooterMain'>
                <div className='footerNewslater' style={{ paddingTop: '30px', paddingInline: '20%' }}>
                    <div className='subScriMain'>
                        <p className='subScriMainTitle'>GET 5% OFF YOUR FIRST ORDER</p>
                        <p className='subScriMainSubTitle'>and stay in the loop with us</p> b
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: '20px' }}>
                            <input type='text' className='footerInputBox' placeholder='Your email here' value={email} onChange={handleEmailChange} required />
                            <button className='FooterSubBtn' onClick={handleSubmitNewlater}>SUBSCRIBE</button>
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
                            <p className='FoooterTextLink' onClick={() => navigation('/faq')}>FAQs</p>
                            <p className='FoooterTextLink' onClick={openPdf}>Size Guide</p>
                            {/* <p className='FoooterTextLink'>Gift Cards</p> */}
                            <p className='FoooterTextLink'  onClick={() => navigation('/faq')}>Material & Care</p>
                            <p className='FoooterTextLink' onClick={() => navigation('/term&condition')}>Terms & Conditions</p>
                            <p className='FoooterTextLink' onClick={() => navigation('/PrivacyPolicy')}>Privacy Policy</p>
                        </div>
                        <div className='FooterLinkMainBox'>
                            <p className='footerMoteText'>CUSTOMER SERVICE</p>
                            <p className='FoooterTextLink'  onClick={() => navigation('/faq')}>Shipping & Returns</p>
                            <p className='FoooterTextLink'  onClick={() => navigation('/faq')}>Exchange & Buyback</p>
                            {/* <p className='FoooterTextLink'>Loyalty Program</p> */}
                            {/* <p className='FoooterTextLink'>Material & Care</p> */}
                            {/* <p className='FoooterTextLink'>Try at Home</p> */}
                            <p className='FoooterTextLink' onClick={() => handleNavigte('/contactUs')}>Contact us</p>
                        </div>
                        <div className='FooterLinkMainBox'>
                            <p className='footerMoteText'>MY ACCOUNT</p>
                            <p className='FoooterTextLink'  onClick={() => navigation('/LoginOption')}>Sign In</p>
                            {/* <p className='FoooterTextLink'>Track Your Order</p> */}
                            <p className='FoooterTextLink'  onClick={() => navigation('/faq')}>Help</p>
                        </div>
                    </div>
                </div>
                <div className='footerBottom'>
                    {/* <img src='https://d-themes.com/wordpress/molla/dummy/wp-content/uploads/sites/38/2020/09/payments.png' className='newImgFooter'/> */}
                    <img src={titleImg} className='logoImgFooter' />
                    <p className='FooterBottomText'>Copyright © 2023 Diamondtine. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    )
}
