import { useCookies } from "react-cookie";
import { CommonAPI } from "./CommonAPI";


export const GetCount = async(cookies, islogin) => {

        let CountObj = {};
       
            const storeInit = JSON.parse(localStorage.getItem("storeInit"))
            const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));
            const UserEmail = localStorage.getItem("registerEmail")
            let customerId = storeInit?.IsB2BWebsite == 0 && islogin == 'false' || 'f' ? cookies?.visiterId  != undefined ? cookies?.visiterId : Customer_id?.id : Customer_id?.id;
            let customerAppUserId = storeInit?.IsB2BWebsite == 0 && islogin == 'false' || 'f' ? cookies?.visiterId : UserEmail
            let EncodeData = {FrontEnd_RegNo:`${storeInit?.FrontEnd_RegNo}`,Customerid:`${customerId}`}
    
        const encodedCombinedValue = btoa(JSON.stringify(EncodeData));
    
        let body = {
            "con":`{\"id\":\"\",\"mode\":\"Getcount\",\"appuserid\":\"${storeInit?.IsB2BWebsite == 0 ? cookies?.visiterId != undefined ? cookies?.visiterId : UserEmail : UserEmail}\"}`,
            "f":"onAddToCart-AddToWishList-Reload (cartcount)",
            "p":encodedCombinedValue
            }
    
    
         await CommonAPI(body).then((res)=>{
          if(res?.Data){
            if(res?.Data?.rd[0]?.stat_msg === "success"){
              const CountCart = res?.Data?.rd[0]?.cartcount ?? 0
              const WishCount = res?.Data?.rd[0]?.wishcount ?? 0

              CountObj = { CountCart , WishCount }
      
              // setCartCount(CountCart)
              // setWishCount(WishCount)
      
            }
          }
        });

        
    
        return CountObj


}

