import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Footer from "../../Footer/Footer";
import {
  CartListCounts,
  WishListCounts,
  colorstoneQualityColorG,
  diamondQualityColorG,
  isB2CFlag,
  metalTypeG,
  newTestProdData,
  priceData,
} from "../../../../../../../Recoil/atom";
import { GetCount } from "../../../../../Utils/API/GetCount";
import { CommonAPI } from "../../../../../Utils/API/CommonAPI";
import "./CartPage.css";
import { ToastContainer, toast } from "react-toastify";
import { Card, CardHeader, Col, Container, Row } from "react-bootstrap";
import noFoundImage from "../../../../assets/image-not-found.png"
import { FullProInfoAPI } from "../../../../../Utils/API/FullProInfoAPI";
import { findCsQcIdDiff, findDiaQcId, findMetalType, findMetalTypeId, findValueFromId, storImagePath } from "../../../../../Utils/globalFunctions/GlobalFunction";
import { SingleProductAPI } from "../../../../../Utils/API/SingleProductAPI";
import { IoArrowBackOutline, IoClose } from "react-icons/io5";
import { getDesignPriceList } from "../../../../../Utils/API/PriceDataApi";
import { productListApiCall } from "../../../../../Utils/API/ProductListAPI";
import { FilterListAPI } from "../../../../../Utils/API/FilterListAPI";
import notFound from "../../../../assets/image-not-found.png";
import { useCookies } from "react-cookie";

function CustomTabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function CartPage() {
  const [cartListData, setCartListData] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [yKey, setYouKey] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isProductCuFlag, setIsProductCuFlag] = useState("");
  const [isMetalCutoMizeFlag, setIsMetalCutoMizeFlag] = useState("");
  const [isDaimondCstoFlag, setIsDaimondCstoFlag] = useState("");
  const [isCColrStoneCustFlag, setIsCColrStoneCustFlag] = useState("");
  const [currency, setCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [colorData, setColorData] = useState([]);
  const [metalColorData, setMetalColorData] = useState([]);
  const [metalType, setMetalType] = useState([]);
  const [DaimondQualityColor, setDaimondQualityColor] = useState([]);
  const [showDropdowns, setShowDropdowns] = useState(
    Array(cartListData.length).fill(false)
  );
  const [prodSelectData, setProdSelectData] = useState();
  const [sizeOption, setSizeOption] = useState();
  const [metalFilterData, setMetalFilterData] = useState([]);
  const [daimondFilterData, setDaimondFiletrData] = useState([]);
  const [diaQColOpt, setDiaQColOpt] = useRecoilState(diamondQualityColorG);
  const [cSQopt, setCSQOpt] = useRecoilState(colorstoneQualityColorG);
  const [mtTypeOption, setmtTypeOption] = useRecoilState(metalTypeG);
  const [colorStoneFilterData, setColorStoneFiletrData] = useState([]);
  const [FindingFilterData, setFindingFiletrData] = useState([]);

  const [productData, setProductData] = useState();

  const [cartSelectData, setCartSelectData] = useState();
  const [getAllFilterSizeData, setGetAllFilterSizeData] = useState([]);
  const [sizeData, setSizeData] = useState([]);

  const [mtrdData, setMtrdData] = useState([]);
  const [dqcData, setDqcData] = useState();
  const [csqcData, setCsqcData] = useState();
  const [selectedColor, setSelectedColor] = useState()
  const [getPriceData, setGetPriceData] = useState([])

  const [dqcRate, setDqcRate] = useState()
  const [dqcSettRate, setDqcSettRate] = useState()
  const [csqcRate, setCsqcRate] = useState()
  const [csqcSettRate, setCsqcSettRate] = useState()
  const [storeInitData, setStoreInitData] = useState();

  const [dialogOpen, setDialogOpen] = useState(false)

  const setCartCount = useSetRecoilState(CartListCounts);
  const setWishCount = useSetRecoilState(WishListCounts);
  //   const getPriceData = useRecoilValue(priceData);
  const getTestProdData = useRecoilValue(newTestProdData);
  const [currData, setCurrData] = useState()
  const [catSizeData, setCatSizeData] = useState([]);
  const [diaqcData, setDiaQcData] = useState([]);
  const [csData, setCsData] = useState([])
  const [fullprodData, setFullProdData] = useState();
  const [cartPageLoding, setCartPageloding] = useState(false);
  const [singleProdData, setSingleProdData] = useState();
  const [isLodingSave, setIsLoadingSave] = useState(false);
  const isb2cFlag = useRecoilValue(isB2CFlag);
  const [cookies] = useCookies(['visiterId']);


  const setProdFullInfo = async (paramDesignno) => {
    await FullProInfoAPI(paramDesignno).then(res => {
      if (res) {
        // getProdFullInfo();
        setFullProdData(res)
      }
    })
  }

  const cartSingalDataAPICalling = async () => {
    if (cartListData) {
      await SingleProductAPI(cartListData[0]?.designno).then((res) => {
        let data = res[0]
        setSingleProdData(data)
      })
    }
  }

  useEffect(() => {
    // console.log("cartListData1111",cartListData)
    cartSingalDataAPICalling()
  }, [cartListData])


  console.log('singleProdData', singleProdData, mtrdData, diaqcData, csData)


  useEffect(() => {
    if (cartListData?.length > 0) {
      setProdFullInfo(cartListData[0]?.designno)
    }
  }, [cartListData])



  useEffect(() => {
    // handelCurrencyData();
    let loginData = JSON.parse(localStorage.getItem('loginUserDetail'));
    const storeInit = JSON.parse(localStorage.getItem('storeInit'))
    let obj = { "CurrencyRate": storeInit?.IsB2BWebsite == 0 ? storeInit?.CurrencyRate : loginData?.CurrencyRate, "Currencysymbol": storeInit?.IsB2BWebsite == 0 ? storeInit?.Currencysymbol :loginData?.Currencysymbol }
    if (obj) {
      setCurrData(obj)
    }
  }, [])

  useEffect(() => {
    const storeInit = JSON.parse(localStorage.getItem('storeInit'))
    setStoreInitData(storeInit)
  }, []);

  useEffect(() => {
    console.log("getTestProdData", getTestProdData)
  }, [getTestProdData])

  const navigation = useNavigate();
  let currencySymbol = JSON.parse(localStorage.getItem('CURRENCYCOMBO'))

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("getPriceData"))
    setGetPriceData(data)
  }, [])

  useEffect(() => {
    if (!cartListData && cartListData.length === 0) {
      setProdSelectData();
      setCartSelectData();
    }
  }, [])


  const getCountFunc = async () => {
    await GetCount().then((res) => {
      if (res) {
        setCartCount(res.CountCart);
        setWishCount(res.WishCount);
      }
    });
  };

  useEffect(() => {
    if (cartListData && !cartSelectData) {
      setCartSelectData(cartListData[0]);
      getSizeData(cartListData[0]?.autocode);
    }
  }, [cartListData, cartSelectData]);

  // console.log('getPriceDatagetPriceData', getPriceData);

  // useEffect(() => {
  //   console.log('getPriceDatagetPriceData', getPriceData);
  //   let mtrd = getPriceData?.rd?.filter(
  //     (ele) =>
  //       ele?.A === cartSelectData?.autocode &&
  //       ele?.B === cartSelectData?.designno &&
  //       ele?.D === mtTypeOption
  //   );


  //   if (mtrd && mtrd.length > 0) {
  //     setMtrdData(mtrd[0] ?? []);
  //   }

  //   let diaqcprice = getPriceData?.rd1?.filter(
  //     (ele) =>
  //       ele.A === cartSelectData?.autocode &&
  //       ele.B === cartSelectData?.designno &&
  //       ele.H === diaQColOpt?.split("_")[0] &&
  //       ele.J === diaQColOpt?.split("_")[1]
  //   );

  //   console.log("diaqcprice", diaqcprice)

  //   if (diaqcprice && diaqcprice.length > 0) {
  //     let totalPrice = diaqcprice.reduce((acc, obj) => acc + obj.S, 0)
  //     setDqcData(totalPrice ?? 0);
  //   }

  //   let csqcpirce = getPriceData?.rd2?.filter(
  //     (ele) =>
  //       ele.A === cartSelectData?.autocode &&
  //       ele.B === cartSelectData?.designno &&
  //       ele.H === cSQopt?.split("_")[0] &&
  //       ele.J === cSQopt?.split("_")[1]
  //   );

  //   if (csqcpirce && csqcpirce.length > 0) {
  //     let totalPrice = csqcpirce.reduce((acc, obj) => acc + obj.S, 0)
  //     setCsqcData(totalPrice ?? 0)
  //   }
  // }, [mtTypeOption, diaQColOpt, cSQopt, cartSelectData, getPriceData]);

  let diaUpdatedPrice = () => {
    let srProductsData = JSON.parse(localStorage.getItem('srProductsData'))

    if (daimondFilterData && daimondFilterData.length && diaqcData?.T === 1) {

      let calcDiaWt = (srProductsData?.updDWT ?? 0) + (daimondFilterData?.Weight ?? 0)

      let CalcPics = (srProductsData?.updDPCS ?? 0) + (daimondFilterData?.pieces ?? 0)

      let fpprice = ((dqcRate ?? 0) * (calcDiaWt ?? 0)) + ((dqcSettRate ?? 0) * (CalcPics ?? 0))

      return fpprice
    }
    else {
      return 0
    }

  }

  let colUpdatedPrice = () => {

    let srProductsData = JSON.parse(localStorage.getItem('srProductsData'))

    if (colorStoneFilterData && colorStoneFilterData.length && csData?.T === 1) {


      let calcDiaWt = (srProductsData?.totalcolorstoneweight ?? 0) + (colorStoneFilterData?.Weight ?? 0)

      let CalcPics = (srProductsData?.totalcolorstonepcs ?? 0) + (colorStoneFilterData?.pieces ?? 0)

      let fpprice = ((csqcRate ?? 0) * (calcDiaWt ?? 0)) + ((csqcSettRate ?? 0) * (CalcPics ?? 0))

      return fpprice
    } else {
      return 0
    }

  }

  let metalUpdatedPrice = () => {

    let srProductsData = JSON.parse(localStorage.getItem('srProductsData'));

    if (metalFilterData && metalFilterData.length && mtrdData?.AE === 1) {

      let CalcNetwt = ((srProductsData?.netwt ?? 0) + (metalFilterData?.Weight ?? 0) ?? 0)

      let fprice = ((mtrdData?.AD ?? 0) * CalcNetwt) + ((mtrdData?.AC ?? 0) * CalcNetwt)

      return fprice
    } else {
      return 0
    }


  }


  useEffect(() => {
    let srProductsData = JSON.parse(localStorage.getItem('srProductsData'));
    const storeInit = JSON.parse(localStorage.getItem('storeInit'));

    // let mtrd = fullprodData?.rd?.filter((ele) =>
    //   storeInit?.IsMetalCustomization === 1
    //     ?
    //     ele?.A === cartSelectData?.autocode &&
    //     ele?.B === cartSelectData?.designno &&
    //     ele?.D === mtTypeOption
    //     :
    //     ele?.A === cartSelectData?.autocode &&
    //     ele?.B === cartSelectData?.designno

    // );

    let mtrd = fullprodData?.rd?.filter((ele) =>
      storeInit?.IsMetalCustomization === 1
        ?
        ele?.A == cartSelectData?.autocode &&
        ele?.C == findMetalTypeId(mtTypeOption)[0]?.Metalid
        :
        ele?.A == cartSelectData?.autocode
    );

    console.log("cartmtrd", mtrd)

    let showPrice = 0;
    if (mtrd && mtrd.length > 0) {
      // showPrice = cartSelectData?.price - ((cartSelectData?.price - cartSelectData?.metalrd) + (mtrd[0]?.Z ?? 0));
      setMtrdData(mtrd[0]);
      // setMetalPrice(mtrd[0]?.Z ?? 0)
    } else {
      setMtrdData([]);
    }

    // let diaqcprice = fullprodData?.rd1?.filter((ele) =>
    //   storeInit?.IsDiamondCustomization === 1
    //     ?
    //     ele.A === cartSelectData?.autocode &&
    //     ele.B === cartSelectData?.designno &&
    //     ele.H === diaQColOpt?.split("#")[0] &&
    //     ele.J === diaQColOpt?.split("#")[1]
    //     :
    //     ele.A === cartSelectData?.autocode &&
    //     ele.B === cartSelectData?.designno

    // )

    let diaqcprice = fullprodData?.rd1?.filter((ele) =>
      storeInit?.IsDiamondCustomization === 1
        ?
        ele.A == cartSelectData?.autocode &&
        ele.G == findDiaQcId(diaQColOpt)[0]?.QualityId &&
        ele.I == findDiaQcId(diaQColOpt)[0]?.ColorId
        :
        ele.A == cartSelectData?.autocode

    )
    // console.log("cartdiaqcprice",diaqcprice)

    let showPrice1 = 0;
    if (diaqcprice && diaqcprice.length > 0) {
      // showPrice1 = cartSelectData?.price - ((srProductsData?.price - srProductsData?.diard1) + (diaqcprice[0]?.S ?? 0));
      let totalPrice = diaqcprice?.reduce((acc, obj) => acc + obj.S, 0)
      let diaRate = diaqcprice?.reduce((acc, obj) => acc + obj.O, 0)
      let diaSettRate = diaqcprice?.reduce((acc, obj) => acc + obj.Q, 0)
      console.log("cartdiaqcprice", totalPrice)
      setDqcRate(diaRate ?? 0)
      setDqcSettRate(diaSettRate ?? 0)
      setDqcData(totalPrice ?? 0)
      setDiaQcData(diaqcprice[0] ?? [])
      // setDQCPrice(diaqcprice[0]?.S ?? 0)
    } else {
      setDqcRate(0)
      setDqcSettRate(0)
      setDqcData(0)
    }

    // let csqcpirce = fullprodData?.rd2?.filter((ele) =>
    //   storeInit?.IsCsCustomization === 1
    //     ?
    //     ele.A === cartSelectData?.autocode &&
    //     ele.B === cartSelectData?.designno &&
    //     ele.H === cSQopt?.split("_")[0] &&
    //     ele.J === cSQopt?.split("_")[1]
    //     :
    //     ele.A === cartSelectData?.autocode &&
    //     ele.B === cartSelectData?.designno

    // );

    let csqcpirce = fullprodData?.rd2?.filter((ele) =>
      storeInit?.IsCsCustomization === 1
        ?
        ele.A == srProductsData?.autocode &&
        ele.H == findCsQcIdDiff(cSQopt)[0]?.QualityId &&
        ele.J == findCsQcIdDiff(cSQopt)[0]?.ColorId
        :
        ele.A == srProductsData?.autocode

    );

    console.log("cartcsqcpirce", csqcpirce)

    let showPrice2 = 0;
    if (csqcpirce && csqcpirce.length > 0) {
      // showPrice2 = srProductsData?.price - ((srProductsData?.price - srProductsData?.csrd2) + (csqcpirce[0]?.S ?? 0));
      let totalPrice = csqcpirce?.reduce((acc, obj) => acc + obj.S, 0)
      let diaRate = csqcpirce?.reduce((acc, obj) => acc + obj.O, 0)
      let diaSettRate = csqcpirce?.reduce((acc, obj) => acc + obj.Q, 0)
      setCsqcData(totalPrice ?? 0)
      setCsqcRate(diaRate ?? 0)
      setCsqcSettRate(diaSettRate ?? 0)
      setCsData(csqcpirce[0] ?? [])
      // setCSQCPrice(csqcpirce[0]?.S ?? 0)
    } else {
      setCsqcData(0)
      setCsqcRate(0)
      setCsqcSettRate(0)
    }
    // let gt = showPrice + showPrice1 + showPrice2;
    // setGrandTotal(gt ?? 0);
  }, [fullprodData, mtTypeOption, diaQColOpt, cSQopt, cartSelectData, singleProdData])

  useEffect(() => {
    let finalmetalTypeName = cartSelectData?.metaltypename?.length > 4 ? `${cartSelectData?.metaltypename?.split(" ")[0]}` : `${cartSelectData?.metaltypename}`
    let finalMetal = `${finalmetalTypeName} ${cartSelectData?.Purity}`

    setmtTypeOption(finalMetal);

    let qualityColor = `${cartSelectData?.diamondquality}#${cartSelectData?.diamondcolor}`;
    setDiaQColOpt(qualityColor);

    let csQualColor = `${cartSelectData?.colorstonequality}#${cartSelectData?.colorstonecolor}`;
    setCSQOpt(csQualColor);

    setSelectedColor(cartSelectData?.metalcolorname)


    setSizeOption(cartSelectData?.detail_ringsize)

  }, [cartSelectData])

  console.log("cartSelectData", cartSelectData);

  useEffect(() => {
    getCountFunc();
  }, []);

  useEffect(() => {
    const currencyCombo = JSON.parse(localStorage.getItem("CURRENCYCOMBO"));
    setCurrency(currencyCombo?.Currencysymbol);
    getCartData();
  }, [isb2cFlag]);

  useEffect(() =>{
    getCartData();
  },[isb2cFlag])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("QualityColor"));
    if (storedData) {
      setColorData(storedData);
    }

    const storedData1 = JSON.parse(
      localStorage.getItem("ColorStoneQualityColor")
    );
    if (storedData1) {
      setDaimondQualityColor(storedData1);
    }

    const storedData2 = JSON.parse(localStorage.getItem("MetalTypeData"));
    if (storedData2) {
      setMetalType(storedData2);
    }

    const storedData3 = JSON.parse(localStorage.getItem("MetalColorData"));
    if (storedData3) {
      setMetalColorData(storedData3);
    }
  }, []);

  const handelLocalStorage = () => {
    let localProductData = JSON.parse(localStorage.getItem("srProductsData"));
    setProductData(localProductData);
  };

  useEffect(() => {
    handelLocalStorage();
  }, []);

  const getSizeData = async (item) => {
    try {
      const storedEmail = localStorage.getItem("registerEmail") || "";
      const storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const { FrontEnd_RegNo } = storeInit;

      const storedData = localStorage.getItem("loginUserDetail") || "0";
      const data = JSON.parse(storedData);
      const customerid = data?.id;
      const combinedValue = JSON.stringify({
        autocode: `${item}`,
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${customerid}`,
      });
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"\",\"mode\":\"CATEGORYSIZECOMBO\",\"appuserid\":\"${storedEmail}\"}`,
        f: "index (getSizeData)",
        p: encodedCombinedValue,
      };
      const response = await CommonAPI(body);
      if (response.Data?.rd) {
        setSizeData(response.Data.rd);
        const sizeDropdownData = response.Data.rd;
        setGetAllFilterSizeData(response.Data.rd1);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = (index) => {
    // Your save logic here
    const newShowDropdowns = [...showDropdowns];
    newShowDropdowns[index] = false;
    setShowDropdowns(newShowDropdowns);
  };

  const getCartData = async () => {
    debugger
    try {
      // cartListData.length === 0 && setIsLoading(true);
      cartListData.length === 0 && setIsLoading(true);
      const ImageURL = localStorage.getItem("UploadLogicalPath");
      setImageURL(ImageURL);
      const storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const storedData = localStorage.getItem("loginUserDetail");
      const data = JSON.parse(storedData);
      const customerid = storeInit?.IsB2BWebsite == 0 ? cookies?.visiterId  : data.id;
      setIsProductCuFlag(storeInit.IsProductWebCustomization);
      setIsMetalCutoMizeFlag(storeInit.IsMetalCustomization);
      setIsDaimondCstoFlag(storeInit.IsDiamondCustomization);
      setIsCColrStoneCustFlag(storeInit.IsCsCustomization);
      setCustomerID(customerid);
      const customerEmail = (storeInit?.IsB2BWebsite == 0 ? cookies?.visiterId : data?.userid) ?? '';
      setUserEmail(customerEmail);

      const { FrontEnd_RegNo, ukey } = storeInit;
      setYouKey(ukey);

      const combinedValue = JSON.stringify({
        CurrentPage: "1",
        PageSize: "1000",
        ukey: `${ukey}`,
        CurrRate: `${storeInit?.IsB2BWebsite == 0 ? storeInit?.CurrencyRate : data?.CurrencyRate}`,
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${customerid}`,
      });

      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"\",\"mode\":\"GetCartDetails\",\"appuserid\":\"${customerEmail}\"}`,
        f: "Header (getCartData)",
        p: encodedCombinedValue,
      };
      const response = await CommonAPI(body);
      if (response?.Data) {
        setCartListData(response?.Data?.rd);
        setMainRemarks(response?.Data?.rd[0].OrderRemarks);
        setRemarks(response?.Data?.rd[0].Remarks);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (data) => {
    try {
      setIsLoading(true);
      const storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const { FrontEnd_RegNo } = storeInit;
      const combinedValue = JSON.stringify({
        designno: `${data.designno}`,
        autocode: `${data.autocode}`,
        metalcolorid: "0",
        isSolStockNo: "0",
        is_show_stock_website: "0",
        isdelete_all: "0",
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${customerID}`,
        cartidlist: "",
      });
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"Store\",\"mode\":\"removeFromCartList\",\"appuserid\":\"${userEmail}\"}`,
        f: "myWishLisy (handleRemoveCatList)",
        p: encodedCombinedValue,
      };
      const response = await CommonAPI(body);
      if (response.Data.rd[0].stat === 1) {
        await getCartData();
        await getCountFunc();
        let prevIndexofCartList = cartListData?.findIndex((cld) => cld?.autocode === data?.autocode)
        if (prevIndexofCartList === 0) {
          setCartSelectData()
        } else {
          setCartSelectData(cartListData[prevIndexofCartList - 1]);
        }
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [Mainremarks, setMainRemarks] = useState("");
  const [MainremarksApires, setMainRemarksApires] = useState("");
  const handleInputChangeMainRemarks = (e) => {
    setMainRemarks(e.target.value);
  };
  const submitMainRemrks = async () => {
    if (!Mainremarks || Mainremarks.trim() === "") {
      toast.error("Enter a value for remark.");
    } else {
      try {
        setOpenOrderRemark(false);
        setIsLoading(true);
        const storeInit = JSON.parse(localStorage.getItem("storeInit"));
        const { FrontEnd_RegNo } = storeInit;
        const combinedValue = JSON.stringify({
          orderremarks: `${Mainremarks}`,
          FrontEnd_RegNo: `${FrontEnd_RegNo}`,
          Customerid: `${customerID}`,
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
          con: `{\"id\":\"\",\"mode\":\"SAVEORDERREMARK\",\"appuserid\":\"${userEmail}\"}`,
          f: "Header (handleMainRemrks)",
          p: encodedCombinedValue,
        };
        const response = await CommonAPI(body);
        if (response.Data.rd[0].stat === 1) {
          toast.success("Add remark successfully");
          setShowOrderRemarkFields(!showOrderRemarkFields)
          setMainRemarksApires(response.Data.rd[0]?.orderremarks)
          // setMainRemarks('')
        } else {
          alert("Error");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };


  const [remarks, setRemarks] = useState(cartSelectData?.Remarks || '');
  const [remarksApires, setRemarksApiRes] = useState('');
  const handleInputChangeRemarks = (event, index) => {
    let { value } = event.target;
    setRemarks(value);
  };



  const [remakrAutuCode, setRemarkAutoCodr] = useState(false);
  const [reamkrDesignNumber, setDesignNumebr] = useState(false);

  const handleSubmit = async (data) => {
    if (!remarks || remarks.trim() === "") {
      toast.error("Enter a value for remarks.");
    } else {
      try {
        handleCloseItemRemark();
        // setIsLoading(true);
        const storeInit = JSON.parse(localStorage.getItem("storeInit"));
        const { FrontEnd_RegNo } = storeInit;
        const combinedValue = JSON.stringify({
          designno: `${reamkrDesignNumber}`,
          autocode: `${remakrAutuCode}`,
          remarks: `${remarks}`,
          FrontEnd_RegNo: `${FrontEnd_RegNo}`,
          Customerid: `${customerID}`,
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
          con: `{\"id\":\"\",\"mode\":\"SAVEDESIGNREMARK\",\"appuserid\":\"${userEmail}\"}`,
          f: "Header (handleSingleRemaksSubmit)",
          p: encodedCombinedValue,
        };
        const response = await CommonAPI(body);
        if (response.Data.rd[0].stat === 1) {
          await getCartData()
          toast.success("Add remark successfully");
          setShowRemarkFields(!showRemarkFields)
          setRemarksApiRes(response.Data.rd[0]?.design_remark)
          // setRemarks('')
        } else {
          alert("Error");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [lastEnteredQuantity, setLastEnteredQuantity] = useState({});

  const handleInputChange = (event) => {
    let { value } = event.target;
    value = value.replace(/[^0-9.]/g, '');
    const intValue = parseInt(value);
    const positiveIntValue = intValue >= 0 ? intValue : 0;
    setLastEnteredQuantity(positiveIntValue.toString());
  };


  const handleUpdateQuantity = async (designNo, updatedQuantity) => {
    setQtyUpdateWaiting(true);
    try {
      const storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const { FrontEnd_RegNo } = storeInit;
      const combinedValue = JSON.stringify({
        designno: `${designNo}`,
        Quantity: `${updatedQuantity}`,
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${customerID}`,
      });
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"\",\"mode\":\"UpdateQuantity\",\"appuserid\":\"${userEmail}\"}`,
        f: "header (handleUpdateQuantity)",
        p: encodedCombinedValue,
      };
      if (updatedQuantity !== "") {
        const response = await CommonAPI(body);
        if (response.Data.rd[0].stat === 1) {
          await getCartData()
          toast.success("QTY change successfully");
        } else {
          alert("Error");
        }
      } else {
        toast.error("ERROR !!!,Please Check QTY");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setQtyUpdateWaiting(false);
    }
  };


  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleRemoveAllWishList = async () => {
    handleClose();
    try {
      setIsLoading(true);
      const storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const { FrontEnd_RegNo } = storeInit;
      const combinedValue = JSON.stringify({
        designno: "",
        autocode: "",
        metalcolorid: "0",
        isSolStockNo: "0",
        is_show_stock_website: "0",
        isdelete_all: "1",
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${customerID}`,
        cartidlist: "",
      });
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"Store\",\"mode\":\"removeFromCartList\",\"appuserid\":\"${userEmail}\"}`,
        f: "myWishLisy (handleRemoveCatList)",
        p: encodedCombinedValue,
      };
      const response = await CommonAPI(body);
      if (response.Data.rd[0].stat === 1) {
        getCartData();
        getCountFunc();
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const prodData = JSON.parse(localStorage.getItem("allproductlist"))
    let isCartData = cartSelectData ? cartSelectData : cartListData[0]

    const finalProdData = prodData?.filter(
      (pd) =>
        pd?.designno === isCartData?.designno &&
        pd?.autocode === isCartData?.autocode
    )[0]

    if (finalProdData) {
      setProdSelectData(finalProdData)
    }
  }, [cartSelectData, cartListData])


  const [sizeMarkup, setSizeMarkup] = useState(0)

  const handelSize = (data) => {
    const selectedSize = sizeData.find((size) => size.sizename === (data ?? sizeOption))

    if (selectedSize) {
      setSizeMarkup(selectedSize?.MarkUp)
      setCatSizeData(selectedSize)
    } else {
      setSizeMarkup(0)
    }
    setSizeOption(data);
    const filteredData = getAllFilterSizeData?.filter((item) => item.sizename === (data ?? sizeOption))
    const filteredDataMetal = filteredData?.filter((item) => item.DiamondStoneTypeName === "METAL")
    const filteredDataDaimond = filteredData?.filter((item) => item.DiamondStoneTypeName === "DIAMOND")
    const filteredDataColorStone = filteredData?.filter(item => item.DiamondStoneTypeName === "COLOR STONE")
    const filteredDataFinding = filteredData?.filter(item => item.DiamondStoneTypeName === "FINDING")
    setMetalFilterData(filteredDataMetal)
    setDaimondFiletrData(filteredDataDaimond)
    setColorStoneFiletrData(filteredDataColorStone)
    setFindingFiletrData(filteredDataFinding)
  };

  useEffect(() => {
    const selectedSize = sizeData.find((size) => size.sizename === (sizeOption))

    console.log("selectedSize", selectedSize);

    if (selectedSize) {
      setSizeMarkup(selectedSize?.MarkUp)
    } else {
      setSizeMarkup(0)
    }
    const filteredData = getAllFilterSizeData?.filter(
      (item) => item.sizename === (sizeOption)
    )
    const filteredDataMetal = filteredData?.filter(
      (item) => item.DiamondStoneTypeName === "METAL"
    )
    const filteredDataDaimond = filteredData?.filter(
      (item) => item.DiamondStoneTypeName === "DIAMOND"
    )
    setMetalFilterData(filteredDataMetal)
    setDaimondFiletrData(filteredDataDaimond)
  }, [sizeOption, sizeData, getAllFilterSizeData])


  console.log("pricedata", (((mtrdData?.V ?? 0) / currData?.CurrencyRate) + (mtrdData?.W ?? 0) + (mtrdData?.X ?? 0)), dqcData, csqcData, sizeMarkup, metalUpdatedPrice(), diaUpdatedPrice(), colUpdatedPrice())

  // const handleColorSelection = (color) => {
  //     let uploadPath = localStorage.getItem('UploadLogicalPath');
  //     const storedDataAll = localStorage.getItem('storeInit');
  //     const data = JSON.parse(storedDataAll);
  //     if (data.IsColorWiseImages === 1) {
  //       const selectedColor = color;
  //       setSelectedColor(selectedColor);
  //       const filteredData = colorImageData.filter(item => item.colorname.toLowerCase() === selectedColor.toLowerCase());
  //       console.log('Filter Data', filteredData);
  //       if (filteredData.length > 0) {
  //         const correctedData = filteredData.map(item => {
  //           return {
  //             ...item,
  //             imagepath: convertPath(item.imagepath)
  //           };
  //         });
  //         correctedData.forEach(item => {
  //           item.imagepath = uploadPath + '/' + data.ukey + item.imagepath;
  //           console.log('Updated Path:', item.imagepath);
  //         });
  //         correctedData.forEach((item, index) => {
  //           correctedData[index] = item;
  //         });
  //         setTimeout(() => {
  //           setUpdateColorImage(correctedData);
  //         }, 100);
  //       } else {
  //         setUpdateColorImage('');
  //       }
  //       const selectedColorData = colorImageData.find(item => item.colorname === selectedColor);
  //       if (selectedColorData) {
  //         const correctedImagePath = convertPath(selectedColorData.imagepath);
  //         let path = uploadPath + '/' + data.ukey + correctedImagePath
  //         setSelectedImagePath(path);
  //       } else {
  //         setSelectedImagePath('');
  //       }
  //     }
  // };

  console.log('cartListData', cartListData);
  // console.log('dqcData', dqcData);
  // console.log('csqcData', csqcData);
  // console.log('mtrdData', mtrdData);

  const getCartAndWishListData = async () => {

    const UserEmail = localStorage.getItem("registerEmail")
    const storeInit = JSON.parse(localStorage.getItem("storeInit"))
    const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));

    let EncodeData = { FrontEnd_RegNo: `${storeInit?.FrontEnd_RegNo}`, Customerid: `${Customer_id?.id}` }

    const encodedCombinedValue = btoa(JSON.stringify(EncodeData));

    const body = {
      "con": `{\"id\":\"Store\",\"mode\":\"getdesignnolist\",\"appuserid\":\"${UserEmail}\"}`,
      "f": " useEffect_login ( getdataofcartandwishlist )",
      "p": encodedCombinedValue
    }

    await CommonAPI(body).then((res) => {
      // if (res?.Message === "Success") {
      //   setCartData(res?.Data?.rd)
      //   setWishData(res?.Data?.rd1)
      // }
    })

  }

  const handleCartUpdate = async () => {
    const storeInit = JSON.parse(localStorage.getItem("storeInit"))
    const UserEmail = localStorage.getItem("registerEmail")
    const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));

    const finalJSON = {
      "stockweb_event": "",
      "designno": `${singleProdData?.designno}`,
      "autocode": `${singleProdData?.autocode}`,
      "imgrandomno": `${singleProdData?.imgrandomno ?? ""}`,
      "producttypeid": Number(`${singleProdData?.Producttypeid}`),
      "metaltypeid": Number(`${singleProdData?.MetalTypeid}`),
      "metalcolorid": Number(`${singleProdData?.MetalColorid}`),
      "stockno": "",
      "DQuality": `${diaQColOpt?.split('#')[0] ?? ""}`,
      "DColor": `${diaQColOpt?.split('#')[1] ?? ""}`,
      "cmboMetalType": `${findMetalType(singleProdData?.MetalTypeid)}`,
      "AdditionalValWt": Number(`${singleProdData?.AdditionalValWt ?? 0}`),
      "BrandName": `${findValueFromId("cate", singleProdData?.Categoryid)?.CategoryName ?? ""}`,
      "Brandid": Number(`${singleProdData?.Brandid ?? 0}`),
      "CategoryName": `${findValueFromId("cate", singleProdData?.Categoryid)?.CategoryName ?? ""}`,
      "Categoryid": Number(`${singleProdData?.Categoryid ?? 0}`),
      "CenterStoneId": Number(`${singleProdData?.CenterStoneId ?? 0}`),
      "CenterStonePieces": Number(`${singleProdData?.CenterStonePieces ?? 0}`),
      "CollectionName": `${findValueFromId("collect", singleProdData?.Collectionid)?.CollectionName ?? ""}`,
      "Collectionid": Number(`${singleProdData?.Collectionid ?? 0}`),
      "ColorWiseRollOverImageName": `${singleProdData?.ColorWiseRollOverImageName ?? ""}`,
      "DefaultImageName": `${singleProdData?.DefaultImageName}`,
      "DisplayOrder": Number(`${singleProdData?.DisplayOrder ?? 0}`),
      "FrontEnd_OrderCnt": Number(`${singleProdData?.FrontEnd_OrderCnt ?? 0}`),
      "GenderName": `${findValueFromId("gender", singleProdData?.Genderid)?.GenderName ?? ""}`,
      "Genderid": Number(`${singleProdData?.Genderid ?? 0}`),
      "Grossweight": `${Number(`${mtrdData?.N ?? 0}`)}`,
      "InReadyStockCnt": Number(`${singleProdData?.InReadyStockCnt ?? 0}`),
      "IsBestSeller": Number(`${singleProdData?.IsBestSeller ?? 0}`),
      "IsColorWiseImageExists": Number(`${singleProdData?.IsColorWiseImageExists ?? 0}`),
      "IsInReadyStock": Number(`${singleProdData?.IsInReadyStock ?? 0}`),
      "IsNewArrival": Number(`${singleProdData?.IsNewArrival ?? 0}`),
      "IsRollOverColorWiseImageExists": Number(`${singleProdData?.IsRollOverColorWiseImageExists ?? 0}`),
      "IsTrending": Number(`${singleProdData?.IsTrending ?? 0}`),
      "MasterManagement_labid": Number(`${singleProdData?.MasterManagement_labid}`),
      "MasterManagement_labname": "",
      "MetalColorName": `${selectedColor ?? ""}`,
      "MetalColorid": Number(`${singleProdData?.MetalColorid ?? 0}`),
      "MetalPurity": `${(mtTypeOption?.split(' ')[1]) ?? ""}`,
      "MetalPurityid": Number(`${singleProdData?.MetalTypeid ?? 0}`),
      "MetalTypeName": `${mtTypeOption?.split(' ')[0]}`,
      "MetalTypeid": Number(`${singleProdData?.MetalTypeid ?? 0}`),
      "MetalWeight": Number(`${mtrdData?.I ?? 0}`),
      "OcassionName": `${findValueFromId("ocass", singleProdData?.Ocassionid)?.OcassionName ?? ""}`,
      "Ocassionid": Number(`${singleProdData?.Ocassionid ?? 0}`),
      "ProducttypeName": `${findValueFromId("prodtype", singleProdData?.Producttypeid)?.ProducttypeName ?? ""}`,
      "Producttypeid": Number(`${singleProdData?.Producttypeid ?? 0}`),
      "RollOverImageName": `${singleProdData?.RollOverImageName}`,
      "SubCategoryName": `${findValueFromId("subcate", singleProdData?.SubCategoryid)?.SubCategoryName ?? ""}`,
      "SubCategoryid": Number(`${singleProdData?.SubCategoryid ?? 0}`),
      "ThemeName": `${findValueFromId("theme", singleProdData?.Themeid)?.ThemeName ?? ""}`,
      "Themeid": Number(`${singleProdData?.Themeid ?? 0}`),
      "TitleLine": `${singleProdData?.TitleLine}`,
      // "UnitCost": Number(`${singleProdData?.UnitCost ?? 0}`),
      "UnitCost": Number(`${(FinalPrice() * lastEnteredQuantity).toFixed(2) ?? 0}`),
      "UnitCostWithmarkup": Number(`${((FinalPrice() * lastEnteredQuantity).toFixed(2) ?? 0) + (singleProdData?.markup ?? 0)}`),
      "colorstonecolorname": `${cSQopt?.split('-')[1] ?? ""}`,
      "colorstonequality": `${cSQopt?.split('-')[0] ?? ""}`,
      "diamondcolorname": `${diaQColOpt?.split('#')[1] ?? ""}`,
      "diamondpcs": Number(`${mtrdData?.J ?? 0}`),
      "diamondquality": `${diaQColOpt?.split('#')[0] ?? ""}`,
      "diamondsetting": `${singleProdData?.diamondsetting ?? ""}`,
      "diamondshape": `${diaqcData?.diamondshape ?? ""}`,
      "diamondweight": Number(`${diaqcData?.N ?? 0}`),
      "encrypted_designno": `${singleProdData?.encrypted_designno ?? ""}`,
      "hashtagid": Number(`${singleProdData?.Hashtagid ?? 0}`),
      "hashtagname": `${singleProdData?.Hashtagname ?? ""}`,
      "imagepath": `${singleProdData?.imagepath ?? ""}`,
      "mediumimage": `${singleProdData?.MediumImagePath ?? ""}`,
      "originalimage": `${singleProdData?.ImageName ?? ""}`,
      "storyline_html": `${singleProdData?.storyline_html ?? ""}`,
      "storyline_video": `${singleProdData?.storyline_video ?? ""}`,
      "thumbimage": `${singleProdData?.ThumbImagePath ?? ""}`,
      "totaladditionalvalueweight": Number(`${singleProdData?.totaladditionalvalueweight ?? ""}`),
      "totalcolorstoneweight": Number(`${singleProdData?.totalcolorstoneweight ?? ""}`),
      "totaldiamondweight": Number(`${singleProdData?.totaldiamondweight ?? ""}`),
      "updatedate": `${singleProdData?.UpdateDate ?? ""}`,
      "videoname": `${singleProdData?.videoname ?? ""}`,
      "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
      "Customerid": Number(`${Customer_id?.id}`),
      "PriceMastersetid": Number(`${singleProdData?.PriceMastersetid ?? ""}`),
      "quantity": Number(`${lastEnteredQuantity ?? "1"}`),
      "CurrencyRate": `${mtrdData?.AA ?? ""}`,
      "remarks_design": `${singleProdData?.remarks_design ?? ""}`,
      "diamondcolorid": `${diaqcData?.I ?? ""}`,
      "diamondqualityid": `${diaqcData?.G ?? ""}`,
      "detail_ringsize": `${sizeOption ? (sizeOption ?? "") : (singleProdData?.detail_ringsize ?? "")}`,
      "ProjMode": `${singleProdData?.ProjMode ?? ""}`,
      "AlbumMasterid": Number(`${singleProdData?.AlbumMasterid ?? 0}`),
      "AlbumMastername": `${singleProdData?.AlbumMastername ?? ""}`,
      "Albumcode": `${singleProdData?.Albumcode ?? ""}`,
      "Designid": Number(`${singleProdData?.Designid ?? 0}`)
    }

    let Data = { "designno": `${cartSelectData?.designno}`, "autocode": `${cartSelectData?.autocode}`, "metalcolorid": 0, "isSolStockNo": 0, "is_show_stock_website": "0", "isdelete_all": 0, "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`, "Customerid": `${Customer_id?.id}`, "cartidlist": "" }

    let encodedCombinedValue1 = btoa(JSON.stringify(Data))

    const body1 = {
      con: `{\"id\":\"\",\"mode\":\"removeFromCartList\",\"appuserid\":\"${UserEmail}\"}`,
      f: "RemoveFromCartIconClick (removeFromCartList)",
      p: encodedCombinedValue1,
    }
    setIsLoadingSave(true);
    await CommonAPI(body1).then((res) => {
      return res
    }).then(async (prevRes) => {
      if (prevRes?.Data?.rd[0]?.stat_msg === "success") {
        // console.log("prevRes?.Data?.rd[0]?.stat_msg", prevRes?.Data?.rd[0]?.stat_msg);
        // await getCartAndWishListData()
        // getCountFunc()

        const encodedCombinedValue = btoa(JSON.stringify(finalJSON));

        const body = {
          con: `{\"id\":\"\",\"mode\":\"ADDTOCART\",\"appuserid\":\"${UserEmail}\"}`,
          f: "AddToCartIconClick (ADDTOCART)",
          p: encodedCombinedValue,
        };

        await CommonAPI(body).then(async (res) => {
          if (res?.Data?.rd[0]?.msg === "success") {
            await getCartAndWishListData()
            await getCountFunc()
            await getCartData()
            toast.success("Product Updated successFully !!!")
            setQtyUpdateWaiting(false);
            setIsLoadingSave(false);

          }
          else {
            console.log("error", res);
            // toast.error("Something Went Wrong!!")
          }
        }).catch((error) => {
          console.log("error", error);

        })

      }
    })

    // console.log("finalJSON",finalJSON);
    // console.log("filterProdData",filterProdData);

  }

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const [showRemarkFields, setShowRemarkFields] = useState(false);
  const [showOrderRemarkFields, setShowOrderRemarkFields] = useState(false);

  const handleShowReamrkFields = () => {
    setShowRemarkFields(!showRemarkFields);
  }
  const handleShowOrderReamrkFields = () => {
    setShowOrderRemarkFields(!showOrderRemarkFields);
  }
  // const [imageStatus, setImgStatus] = useState(false);

  // function handleLoad() {
  //   let imagePath = storeInitData?.DesignImageFol
  //   console.log('imagePath--', imagePath);
  //   const img = new Image();
  //   img.onload = function () {
  //     setImgStatus(true)
  //     console.log('Image loaded successfully.');

  //   };
  //   img.onerror = function () {
  //     console.error('Error loading image. Invalid path:', imagePath);
  //   };
  //   img.src = imagePath;
  // }

  // useEffect(() => {
  //   handleLoad();
  // }, [])

  // console.log('cartsele----------', cartSelectData);
  // console.log('order remark--------', remarksApires)

  const PriceWithMarkupFunction = (pmu, pPrice, curr) => {
    // console.log("pricewithmarkup", pmu, pPrice)
    if (pPrice <= 0) {
      return 0
    }
    else {
      let percentPMU = ((pmu / 100) / curr)
      return (Number(pPrice * (percentPMU ?? 0)) + Number(pPrice ?? 0))
    }
  }

  useEffect(() => {
    FinalPrice()
  }, [catSizeData, mtrdData, dqcData, currData, csqcData, sizeMarkup, metalUpdatedPrice, diaUpdatedPrice, colUpdatedPrice])

  console.log("breckupprice",
    (((mtrdData?.V ?? 0) / currData?.CurrencyRate) + (mtrdData?.W ?? 0) + (mtrdData?.X ?? 0)),
    (dqcData ?? 0),
    (csqcData ?? 0),
    ((sizeMarkup ?? 0) / (currData?.CurrencyRate) ?? 0),
    (metalUpdatedPrice() ?? 0),
    (diaUpdatedPrice() ?? 0),
    (colUpdatedPrice() ?? 0)
  );


  function FinalPrice() {
    if (catSizeData?.IsMarkUpInAmount == 1) {
      let designMarkUp = (mtrdData?.AB ?? 0)
      let IsAmountPrice = (
        (((mtrdData?.V ?? 0) / currData?.CurrencyRate) + (mtrdData?.W ?? 0) + (mtrdData?.X ?? 0)) +
        (dqcData ?? 0) +
        (csqcData ?? 0) +
        ((sizeMarkup ?? 0) / (currData?.CurrencyRate) ?? 0) +
        (metalUpdatedPrice() ?? 0) +
        (diaUpdatedPrice() ?? 0) +
        (colUpdatedPrice() ?? 0)
      ).toFixed(2)
      return PriceWithMarkupFunction(designMarkUp, IsAmountPrice, currData?.CurrencyRate).toFixed(2)
    }
    else {
      const percentMarkupPlus = (mtrdData?.AB ?? 0) + (catSizeData?.MarkUp ?? 0)
      const CalcPrice = (
        (((mtrdData?.V ?? 0) / currData?.CurrencyRate) + (mtrdData?.W ?? 0) + (mtrdData?.X ?? 0)) +
        (dqcData ?? 0) +
        (csqcData ?? 0) +
        (metalUpdatedPrice() ?? 0) +
        (diaUpdatedPrice() ?? 0) +
        (colUpdatedPrice() ?? 0)
      ).toFixed(2)
      return PriceWithMarkupFunction(percentMarkupPlus, CalcPrice, currData?.CurrencyRate).toFixed(2)
    }
  }



  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openItemRemark, setOpenItemRemark] = useState(false);

  const handleClickOpenItemRemark = (autoCode, designNumbder) => {
    setOpenItemRemark(true);
    setRemarkAutoCodr(autoCode);
    setDesignNumebr(designNumbder);
  };

  const handleCloseItemRemark = () => {
    setRemarks('');
    setOpenItemRemark(false);
  };


  const [openOrderRemark, setOpenOrderRemark] = useState(false);

  const handleClickOpenOrderRemark = () => {
    setOpenOrderRemark(true);
  };

  const handleCloseOrderRemark = () => {
    setRemarks('');
    setOpenOrderRemark(false);
  };


  console.log('sizeData', FinalPrice())

  const handelBrowse = async () => {
    navigation("/productpage")
    let finalData = JSON.parse(localStorage.getItem("menuparams"))

    if (finalData) {
      await FilterListAPI(finalData)
      await productListApiCall(finalData).then((res) => {
        if (res) {
          localStorage.setItem("allproductlist", JSON.stringify(res))
          localStorage.setItem("finalAllData", JSON.stringify(res))
        }
        return res
      }).then(async (res) => {
        if (res) {
          let autoCodeList = JSON.parse(localStorage.getItem("autoCodeList"))
          await getDesignPriceList(finalData, 1, {}, {}, autoCodeList)
        }
      }).catch((err) => {
        if (err) toast.error("Something Went Wrong!!!")
      })
    }
  }

  const handlePlaceOrder = () => {
    let priceData = cartListData.reduce((total, item) => total + item.UnitCost, 0).toFixed(2)
    localStorage.setItem('TotalPriceData', priceData)
    navigation("/Delivery");
    window.scrollTo(0, 0);
  }

  const [qtyUpdateWaiting, setQtyUpdateWaiting] = useState(false);

  const handleIncrementQuantity = (designNo,q) => {
    setLastEnteredQuantity({designNo:q+1, d:designNo,Q:q+1});
    handleUpdateQuantity(designNo,q+1);
  };
  
  const handleDecrementQuantity = (designNo,q) => {
    if (q > 1) {
      setLastEnteredQuantity({ designNo:q-1, d:designNo, Q:q-1});
      handleUpdateQuantity(designNo,q-1);
    }
  };


  console.log('lastequantity', lastEnteredQuantity);
  console.log('FinalPrice()', FinalPrice());
  console.log('FinalPrice() * lastEnteredQuantityFinalPrice() * lastEnteredQuantity', FinalPrice() * lastEnteredQuantity);

  return (
    <>
      <div
        className="paddingTopMobileSet"
        style={{height: isLoading ? '390px': '100%' }}
      >
        {cartListData?.length == 0 && !isLoading &&
          <div>
            <div class="bg-imageCart">
              <div class="overlay"></div>
              <div class="text-container">
                <div className='textContainerData'>
                  <div style={{ textAlign: 'center' }}>
                    <p className="designCounttext" style={{ fontSize: '30px', fontWeight: '400', letterSpacing: '1px', textTransform: 'capitalize' }}>
                      Shopping Cart <br />
                    </p>
                    <span style={{ color: '#AF8538', fontSize: '18px' }}>Shop</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginInline:'20%'
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    border:'1px dashed #d9d9d9',
                    width:'100%',
                    padding:'10px',
                    color:'#a7a7a7'
                  }}
                  className="my-5"
                >
                  Your cart is currently empty.
                </p>
                <button
                  className="browseBtnMore"
                  onClick={() => handelBrowse()}
                >
                  Return to Shop
                </button>
              </div>
            </div>
          </div>
        }
        {cartListData?.length !== 0 &&
          <>
            {!isLoading ? (
              <div className="MyCartPageMainDiv">
                <div className="myCartMainContainer">
                  <div className={cartListData?.length != 0 ? "myCartComponents" : "myCartComponentsNoData"}>
                    <table className="table table-vertical-border table-custom">
                      <thead className="thead-dark table-customThead">
                        <tr className="table-customTr">
                          <th style={{ padding: '15px 0px 15px 0px' }}>Product</th>
                          <th style={{ padding: '15px 0px 15px 0px' }}>Price</th>
                          <th style={{ padding: '15px 0px 15px 0px' }}>Quantity</th>
                          <th style={{ padding: '15px 0px 15px 0px' }}>Total</th>
                          <th style={{ padding: '15px 0px 15px 0px' }}></th>
                        </tr>
                      </thead>
                      <tbody className="table-customTbody">
                        {cartListData?.map((product, index) => (
                          <tr className="table-customTr" key={product.id}>
                            <td className="align-middle">
                              <img
                                src={`${imageURL}/${yKey}/${product.DefaultImageName}`}
                                className=""
                                style={{ cursor: "pointer", maxWidth: '180px', maxHeight: '180px' }}
                                alt="Wishlist item"
                                // onClick={() => handelProductSubmit(product)}
                                onError={(e) => {
                                  e.target.src = notFound;
                                }}
                              />
                              {product.TitleLine}
                            </td>
                            <td className="align-middle">
                              <span>
                                <span
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "18px",
                                    display: 'flex'
                                  }}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: decodeEntities(
                                        currData?.Currencysymbol
                                      ),
                                    }}
                                    style={{ fontFamily: "sans-serif" }}
                                  />
                                  {/* {FinalPrice()} */}
                              {product?.UnitCost}
                                </span>
                              </span>
                            </td>
                            <td className="align-middle">
                              <div className="QTYUpateMain">
                                <div>
                                  <Button className="QtyLess" disabled={qtyUpdateWaiting} onClick={() => handleDecrementQuantity(product?.designno, product?.Quantity)}>-</Button>
                                </div>
                                <p className="QTYvalue">
                                  {/* {lastEnteredQuantity.d == product?.designno ? lastEnteredQuantity.Q : product?.Quantity} */}
                              {product?.Quantity ?? 1}
                                </p>
                                <div>
                                  <Button className='QtyAdd' disabled={qtyUpdateWaiting} onClick={() => handleIncrementQuantity(product?.designno, product?.Quantity)}>+</Button>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span>
                                <span
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "18px",
                                    color: "#A8807c",
                                    display: 'flex'
                                  }}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: decodeEntities(
                                        currData?.Currencysymbol
                                      ),
                                    }}
                                    style={{ fontFamily: "sans-serif" }}
                                  />
                                  {/* {(product?.UnitCost * ( lastEnteredQuantity?.d == product?.designNo ? (lastEnteredQuantity?.Q ?? 1) : 1)).toFixed(2)} */}
                              {(product?.UnitCost * product?.Quantity).toFixed(2)}
                                </span>
                              </span>
                            </td>
                            <td className="align-middle">
                              <IoClose
                                style={{
                                  height: "30px",
                                  width: "30px",
                                  cursor: "pointer",
                                  color: "rgba(210,212,215,1)",
                                }}
                                onClick={() => handleRemove(product)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div >
                <div className="CartPagePaymentDiv">
                  <div className="card cartcardPayment">
                    <div className="card-body">
                      <h5 className="card-title">Card totals</h5>
                      <hr className="border-line" />

                      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                        <p className="card-subtitle">Subtotal</p>
                        <p className="card-subtitle" style={{ fontWeight: "500", fontSize: "18px" }}>
                          <span style={{ fontFamily: "sans-serif" }}>
                            {decodeEntities(currData?.Currencysymbol)}
                          </span>
                          {cartListData.reduce((total, product) => total + parseFloat(product?.FinalUnitCost || 0), 0).toFixed(2)}
                        </p>
                      </div>

                      <hr className="border-lines" />

                      <div>
                        <p className="">Shipping</p>
                        <p className="addinfotext">Free Shipping</p>
                        <p className="addinfotext">Shipping to <span style={{ color: 'black', fontWeight: '500' }}>Delhi</span><br />
                          Estimate for Your Country
                        </p>
                        <a href="/Delivery" class="btn btn-link addressLink" role="button">Change address</a>
                      </div>

                      <hr className="border-lines" />

                      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                        <p className="card-total">Total</p>
                        <p className="card-total" style={{ fontWeight: "500", fontSize: "18px" }}>
                          <span className="card-totalspan" style={{ fontFamily: "sans-serif" }}>
                            {decodeEntities(currData?.Currencysymbol)}
                          </span>
                          {cartListData.reduce((total, product) => total + parseFloat(product?.FinalUnitCost || 0), 0).toFixed(2)}
                        </p>
                      </div>

                      <div>
                        <h4>Have a gift card?</h4>
                        <div>
                          <input style={{ width: '100%', border: '1px solid rgb(239 239 239)', padding: '10px', background: '#f9f9f9' }} type="text" placeholder="Enter your code..." />
                          <div>
                            <button style={{ border: '1px solid #a5a5a5', padding: '5px' }}>Apply</button>
                          </div>
                        </div>
                      </div>
                      <div className="btn-checkout my-3">
                        <button className="CheckoutBtn" onClick={handlePlaceOrder}>PROCEED TO CHECKOUT</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) :
              <div style={{ height: isLoading ? '350px' : '100%' }}>
                <div className="loader-overlay">
                  <CircularProgress className="loadingBarManage" />
                </div>
              </div>
            }
          </>
        }
      </div >
      <div className="mobileFootreCs" style={{ width: '100%' }}>
        <Footer />
      </div>
    </>
  );
}
