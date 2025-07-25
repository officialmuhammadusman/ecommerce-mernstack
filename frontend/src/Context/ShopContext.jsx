/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [search, setsearch] = useState('');
  const [showsearch, setshowsearch] = useState(false);
  const [cartitem, setcartitem] = useState({});
  const [products, setproducts] = useState([]); // ✅ fixed this line
  const navigate = useNavigate();
  const [token,settoken]=useState('')

  const addtocart = async (id, size) => {
  console.log("🛒 addtocart called with:", { id, size }); // ✅ Log incoming data

  if (!size) {
    toast.error("Select Product Size");
    return;
  }

  let cartdata = structuredClone(cartitem);

  if (cartdata[id]) {
    if (cartdata[id][size]) {
      cartdata[id][size] += 1;
    } else {
      cartdata[id][size] = 1;
    }
  } else {
    cartdata[id] = {};
    cartdata[id][size] = 1;
  }

  setcartitem(cartdata);

  if (token) {
    try {
     

      const response = await axios.post(
        backendurl + '/api/cart/add',
        { itemid: id, size },
        { headers: { token } }
      );

      console.log("✅ Backend response:", response.data);

    } catch (error) {
      console.error("❌ Error in addtocart:", error);
      toast.error(error.message);
    }
  } else {
    console.warn("⚠️ No token found.");
  }
};

  const cartcount = () => {
    let totalcount = 0;
    for (const items in cartitem) {
      for (const size in cartitem[items]) {
        if (cartitem[items][size] > 0) {
          totalcount += cartitem[items][size];
        }
      }
    }
    return totalcount;
  };

  const updatequantity = async (id, size, quantity) => {
    let cartdata = structuredClone(cartitem);
    cartdata[id][size] = quantity;
    setcartitem(cartdata);

   
    if(token)
    {
       try {
      

      await  axios.post(backendurl+ '/api/cart/update',{itemid:id,quantity,size},{headers:{token}})

      


    } catch (error) {
         console.error("❌ Error in updatecart:", error);
      toast.error(error.message);
    }
    }


  };

  const cartamount = () => {
    let totalamount = 0;
    for (const items in cartitem) {
      let iteminfo = products.find((product) => product._id === items);
      for (const item in cartitem[items]) {
        try {
          if (cartitem[items][item] > 0) {
            totalamount += iteminfo.price * cartitem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalamount;
  };

  const getproductdata = async () => {
    try {
      const response = await axios.get(backendurl + '/api/product/list');

      if(response.data.success)
      {
        setproducts(response.data.product)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };



  const getusercart= async   (token)=>{
    
    try {

        const response= await  axios.post(backendurl+'/api/cart/get',{},{headers:{token}})

        if(response.data.success)
        {
          setcartitem(response.data.cartdata)
        }
       

    } catch (error) {

      console.log(error)
      toast.error(error.message)
      
    }

  }


  useEffect(()=>{
    getproductdata()
  },[])
 







// Step 1: Set token on first render (from localStorage)
useEffect(() => {
  const localToken = localStorage.getItem('token');
  if (localToken) {
    settoken(localToken);
  }
}, []);

// Step 2: Once token is set, fetch the cart
useEffect(() => {
  if (token) {
    getusercart(token);
  }
}, [token]);








  const value = {
    products, // ✅ now this matches the state above
    currency,
    delivery_fee,
    search,
    setsearch,
    showsearch,
    setshowsearch,
    addtocart,
    cartitem,
    setcartitem,
    cartcount,
    updatequantity,
    cartamount,
    navigate,
    backendurl,
    token,
    settoken
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
