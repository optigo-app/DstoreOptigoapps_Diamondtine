import React, { useEffect, useState } from 'react'
import './index.css';
import Video from './topVideo/Video';
import SmilingRock from './smiling_Rock/SmilingRock';
import FestiveFinds from './FestiveFind/FestiveFinds';
import DaimondEveyone from './DaimondsEveryone/DaimondEveyone';
import Header from './Header/Header';
import ShopByCategory from './shopByCategory/ShopByCategory';
import SmilingBrides from './SmilingBrides/SmilingBrides';
import FeaturedCollection from './FeaturedCollection/FeaturedCollection';
import ShopifySection from './shopifySection/ShopifySection';
import SustainAbility from '../sustainAbility/SustainAbility';
import ShopOurInstagram from './shopOurInstagram/ShopOurInstagram';
import Footer from './Footer/Footer';
import axios from 'axios';
import { Button, Dialog } from '@mui/material';
import { IoMdMail } from "react-icons/io";
import { FaMobileAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { CommonAPI } from '../../../Utils/API/CommonAPI';
import { handleHomePageLoad, storImagePath } from '../../../Utils/globalFunctions/GlobalFunction';
import PromoComponent1 from './PromoComponent/PromoComponent/PromoComponent1';
import PromoComponent2 from './PromoComponent/PromoComponent/PromoComponent2';
import BrandsComponent from './PromoComponent/BrandsComponent/BrandsComponent';
import OurCraftmanShip from './OurCraftManShip/OurCraftmanShip';
import GallerySlider from './Gallery/GaleryComponent';
import CompanyData from './ComapnayData/CompanyData';
import CountdownTimer from './CountDownTimer/CountDownTimer';
import AffiliationData from './PromoComponent/BrandsComponent/AffiliationData';
import SocialMedia from './Gallery/SocialMediaSlider';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { CartListCounts, WishListCounts, companyLogo, designSet, isB2CFlag, loginState, visiterCookieId } from '../../../../../Recoil/atom';
import { Helmet } from 'react-helmet';
import Topbanner from './topVideo/Topbanner';
import NewArrivalProduct from './NewArrival/NewArrivalProduct';
import WidgetsComponents from './Widgets/WidgetsComponents';
import SocialMediaWidgets from './Widgets/SocialMediaWidgets';
import { DesignSet } from '../../../Utils/API/DesignSet';
import { useCookies } from 'react-cookie';
import { GetCount } from '../../../Utils/API/GetCount';

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(['visiterId']);
  const [visitorCookie, setVisitorCookie] = useRecoilState(visiterCookieId)
  const islogin = useRecoilValue(loginState);
  const setDesignList = useSetRecoilState(designSet)
  const [isb2cflag, setisb2cflg] = useRecoilState(isB2CFlag)
  const [companyTitleLogo, setCompanyTitleLogo] = useRecoilState(companyLogo)
  const [title, setTitle] = useState();
  const [favicon, setFavIcon] = useState();
  const location = useLocation();
  const [storeInit, setStoreInit] = useState();
  const setCartCount = useSetRecoilState(CartListCounts)
  const setWishCount = useSetRecoilState(WishListCounts)
  const [pageLoading,setPageLoading]= useState(false)


  setTimeout(()=>{
    setPageLoading(true)
  },1000)


  useEffect(() => {
    const fetchData = async () => {
      // const APIURL = 'http://zen/api/';
      // const APIURL = 'https://api.optigoapps.com/storev26/store.aspx';
      const APIURL = 'https://api.optigoapps.com/test/store.aspx';


      const header = {
        Authorization: 'Bearer optigo_json_api',
        domain: (window.location.hostname === 'localhost' || window.location.hostname === 'zen') ? 'dstore.optigoapps.com' : window.location.hostname,
        // domain: 'estore.orail.co.in',
        version: 'V7',
        sp: "1"
        // domain: 'zen',
      };
      // const header = {
      //   Authorization: 'Bearer optigo_json_api',
      //   YearCode:'',
      //   version: '',
      //   domain: 'zen',
      //   // domain: 'zen',
      // };

      try {
        const body = {
          "con": "{\"id\":\"\",\"mode\":\"store_init\"}",
          "p": "",
          "f": "formname (init)",
        };
        const response = await axios.post(APIURL, body, { headers: header });
        if (response.status === 200) {
          localStorage.setItem('UploadLogicalPath', response.data.Data.rd[0].UploadLogicalPath);
          localStorage.setItem('storeInit', JSON.stringify(response.data.Data.rd[0]));
          localStorage.setItem('myAccountFlags', JSON.stringify(response.data.Data.rd1));
          setStoreInit(response.data.Data.rd[0])
          let title = response?.data?.Data?.rd[0]?.companyname
          let favIcon = response?.data?.Data?.rd[0]?.favicon
          let companyLogo = response?.data?.Data?.rd[0]?.companylogo
          if (response?.data?.Data?.rd[0]?.IsB2BWebsite == 0) {
            let isb2cflag = response?.data?.Data?.rd[0]?.IsB2BWebsite
            setisb2cflg(isb2cflag)
          }
          let visiterId = response?.data?.Data?.rd2[0]?.VisitorId

          // if (!cookies?.visiterId) {
          //   const expires = new Date();
          //   expires.setDate(expires.getDate() + 30);
          //   setCookie('visiterId', visiterId, { path: '/', expires });
          //   setVisitorCookie(visiterId);
          // }

          if(islogin == 'false'){
          if (!cookies?.visiterId) {
            const expires = new Date();
            expires.setDate(expires.getDate() + 30);
            setCookie('visiterId', visiterId, { path: '/', expires });
          }
          else {
            const expirationDate = cookies.visiterId && new Date(cookies.visiterId.expires);
            if (expirationDate && expirationDate <= new Date()) {
              removeCookie('visiterId', { path: '/' });
            }
          }
        }

          console.log('visitor--', visiterId);
          setTitle(title);
          setFavIcon(favIcon)
          setCompanyTitleLogo(companyLogo);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();

  }, [islogin, cookies, setCookie, removeCookie])

  useEffect(() => {
    const storeInit = JSON.parse(localStorage.getItem('storeInit')) ?? "";

    const getMetalTypeData = async () => {
      try {
        const storedEmail = localStorage.getItem('registerEmail') || '';
        const storedCustomerId = JSON.parse(localStorage.getItem('loginUserDetail'));

        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;
        // {"FrontEnd_RegNo":"95oztttesi0o50vr","Customerid":"856"}

        const combinedValue = JSON.stringify({
          FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${storedCustomerId?.id ?? 0}`
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
          "con": `{\"id\":\"\",\"mode\":\"METALTYPECOMBO\",\"appuserid\":\"${storedEmail}\"}`,
          "f": "Account (changePassword)",
          "p": encodedCombinedValue
        }
        const response = await CommonAPI(body);
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd)
          localStorage.setItem('MetalTypeData', data)
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        // setIsLoading(false);
      }
    }

    const getQualityColor = async () => {
      try {
        const storedEmail = localStorage.getItem('registerEmail') || '';

        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;

        const storedData = localStorage.getItem('loginUserDetail') || '0';
        const data = JSON.parse(storedData);
        const customerid = data?.id;

        const combinedValue = JSON.stringify({
          FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${customerid}`
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
          "con": `{\"id\":\"\",\"mode\":\"DIAQUALITYCOLORCOMBO\",\"appuserid\":\"${storedEmail}\"}`,
          "f": "header (getQualityColor)",
          "p": encodedCombinedValue
        }
        const response = await CommonAPI(body);
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd)
          localStorage.setItem('QualityColor', data)
        }

      } catch (error) {
        console.error('Error:', error);
      } finally {
        // setIsLoading(false);
      }
    }


    const getColorStoneQualityData = async () => {
      try {
        const storedEmail = localStorage.getItem('registerEmail') || '';
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;
        // {"FrontEnd_RegNo":"95oztttesi0o50vr","Customerid":"856"}

        const storedData = localStorage.getItem('loginUserDetail') || '0';
        const data = JSON.parse(storedData);
        const customerid = data?.id;

        const combinedValue = JSON.stringify({
          FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${customerid}`
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
          "con": `{\"id\":\"\",\"mode\":\"CSQUALITYCOLORCOMBO\",\"appuserid\":\"${storedEmail}\"}`,
          "f": "indexPage (getColorStoneQualityData)",
          "p": encodedCombinedValue
        }
        const response = await CommonAPI(body);
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd)
          localStorage.setItem('ColorStoneQualityColor', data)
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        // setIsLoading(false);
      }
    }

    const getMetalColor = async () => {
      try {
        const storedEmail = localStorage.getItem('registerEmail') || '';

        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;

        const storedData = localStorage.getItem('loginUserDetail') || '0';
        const data = JSON.parse(storedData);
        const customerid = data?.id;

        const combinedValue = JSON.stringify({
          FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${customerid}`
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
          "con": `{\"id\":\"\",\"mode\":\"METALCOLORCOMBO\",\"appuserid\":\"${storedEmail}\"}`,
          "f": "index (getSizeData)",
          "p": encodedCombinedValue
        }
        const response = await CommonAPI(body);
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd)
          localStorage.setItem('MetalColorData', data)
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        // setIsLoading(false);
      }
    }

    const currencyCombo = async () => {

      try {
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const storedEmail = localStorage.getItem('registerEmail') || '';

        const loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail'));

        const combinedValue = JSON.stringify({
          FrontEnd_RegNo: `${storeInit?.FrontEnd_RegNo}`, Customerid: `${loginUserDetail?.id}`
        });
        const encodedCombinedValue = btoa(combinedValue);

        let body = {
          "con": `{\"id\":\"Store\",\"mode\":\"CURRENCYCOMBO\",\"appuserid\":\"${storedEmail}\"}`,
          "f": "on-index(home)-call (CURRENCYCOMBO)",
          "p": encodedCombinedValue
        }

        await CommonAPI(body).then((res) => {
          if (res?.Data.rd) {
            localStorage.setItem("CURRENCYCOMBO", JSON.stringify(res?.Data.rd))
          }
          // console.log("res",res)
        })

      }
      catch (error) {
        console.log("error", error)
      }

    }


    const getColorImgData = async () => {

      try {
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail'));
        const storedEmail = localStorage.getItem('registerEmail') || '';

        const combinedValue = JSON.stringify({
          autocode: "", FrontEnd_RegNo: `${storeInit?.FrontEnd_RegNo}`, Customerid: `${loginUserDetail?.id ?? 0}`
        });
        const encodedCombinedValue = btoa(combinedValue);

        let body = {
          "con": `{\"id\":\"Store\",\"mode\":\"COLORIMAGELIST\",\"appuserid\":\"${storedEmail}\"}`,
          "f": "mainIndex.js (getTheAllColorData)",
          "p": encodedCombinedValue
        }

        const response = await CommonAPI(body);
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd)
          localStorage.setItem('colorDataImages', data)
        }

      }
      catch (error) {
        console.log("error", error)
      }

    }
    let designDataCall = async () => {
      await DesignSet().then((res) => {
        setDesignList(res)
      })
    }

    if (storeInit?.IsB2BWebsite == 0) {
      currencyCombo();
      getColorImgData();
      getMetalTypeData();
      getQualityColor();
      getColorStoneQualityData();
      getMetalColor();
      storImagePath();
      designDataCall();
    } else if (storeInit?.IsB2BWebsite == 1 && islogin == 'true') {
      currencyCombo();
      getColorImgData();
      getMetalTypeData();
      getQualityColor();
      getColorStoneQualityData();
      getMetalColor();
      storImagePath();
    }

  }, [storeInit]);


  const [isLoginStatus, setIsloginStatus] = useState();
  useEffect(() => {
    if (islogin) {
      setIsloginStatus(islogin)
      window.scrollTo(0, 0);
    }
  }, [])

      
  const getCountFunc = async () => {
    const islogin = localStorage.getItem('LoginUser')
    await GetCount(cookies, islogin).then((res) => {
        if (res) {
            setCartCount(res.CountCart)
            setWishCount(res.WishCount)
        }
    })

}
useEffect(() => {

    setTimeout(() => {
        getCountFunc();
    }, 100);
}, [])

  console.log('islogin', islogin);
  //  let domainName =  `((window.location.hostname === 'localhost' || window.location.hostname === 'zen') ? 'astore.orail.co.in' : window.location.hostname)/ufcc/image/`

  // const [title, setTitle] = useState();
  // const [favicon, setFavIcon] = useState();
  // useEffect(() => {
  //   setTimeout(() => {
  //     const storeInit = JSON.parse(localStorage.getItem('storeInit')) ?? "";
  //     if (storeInit) {
  //       setTitle(storeInit?.companyname)
  //       setFavIcon(storeInit?.favicon)
  //     }
  //   }, 100);
  // }, [islogin == 'true', islogin == 'false'])

  console.log();

  useEffect(() => {
    handleHomePageLoad();
  }, []);

  return (
    <div className='paddingTopMobileSet' style={{ backgroundColor: 'white', paddingTop: '0px' }}>
      <div className='homeMain'>
      <Helmet>
          <title>{title}</title>
          <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
          <meta name="description" content={title} />
          <link rel="apple-touch-icon" href={favicon} />
          <link rel="manifest" href={favicon} />
        </Helmet>
        { pageLoading === true && <>
          <Topbanner/>
          <NewArrivalProduct />
          <WidgetsComponents />
          <SocialMediaWidgets />
          {/* <Video /> */}
          {/* <SmilingRock /> */}
          {/* <PromoComponent1 /> */}
          {/* <BrandsComponent /> */}
          {/* <PromoComponent2 /> */}
          {/* <FestiveFinds /> */}
          {/* <OurCraftmanShip /> */}
          {/* <GallerySlider /> */}
          {/* <CompanyData /> */}
          {/* <AffiliationData /> */}
          {/* <SocialMedia /> */}
          {/* <DaimondEveyone /> */}
          {/* <ShopByCategory /> */}
          {/* <SmilingBrides /> */}
          {/* <FeaturedCollection /> */}
          <div style={{ marginTop: '60px' }}>
            {/* <SustainAbility /> */}
          </div>
          {/* <ShopifySection /> */}
          {/* <ShopOurInstagram /> */}
          <Footer />
        </>}
      </div>
    </div>
  )
}
