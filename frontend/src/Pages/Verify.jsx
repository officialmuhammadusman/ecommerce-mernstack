import { useSearchParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setcartitem, backendurl } = useContext(ShopContext);
  const [searchparams] = useSearchParams();

  const success = searchparams.get('success');
  const orderid = searchparams.get('orderid');

  const verifypayment = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendurl}/api/order/verifyStripe`,
        { success, orderid },
        { headers: { token } }
      );

      if (response.data.success) {
        setcartitem({});
        navigate('/order');
      } else {
        navigate('/cart');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifypayment();
  }, [token]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-[#F5F1EE] text-[#333333]">
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-sm">
        <h1 className="text-2xl font-semibold mb-2">Verifying Payment...</h1>
        <p className="text-sm text-gray-600">Please wait while we confirm your order.</p>
      </div>
    </div>
  );
};

export default Verify;
