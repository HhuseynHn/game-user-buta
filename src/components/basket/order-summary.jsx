import React, { useState } from "react";
import { CreditCard, Tag, ArrowRight } from "lucide-react";
import { mockBasket } from "@/mock/basket-mock";
import { useDispatch, useSelector } from "react-redux";
import {
  applyPromo,
  selectBasketItems,
  selectPromo,
  selectSubtotal,
  selectTax,
  selectTotal,
} from "@/core/config/redux/slices/basket-slice";
const OrderSummary = () => {
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState("");

  const subTotal = useSelector(selectSubtotal);
  const promo = useSelector(selectPromo);
  const promoDiscount = useSelector(selectPromo);
  const tax = useSelector(selectTax);
  const total = useSelector(selectTotal);
  const basketItems = useSelector(selectBasketItems);

  const applyPromoCodeHandler = () => {
    dispatch(applyPromo(promoCode));
    setPromoCode("");
  };

  //   const promoDiscount = appliedPromo
  //     ? (subtotal * appliedPromo.discount) / 100
  //     : 0;
  //   const calculateItemTotal = (item) => {
  //     const discountedPrice = item.price * (1 - item.discount / 100);
  //     return discountedPrice * item.quantity;
  //   };
  //   const subtotal = basketItems.reduce(
  //     (sum, item) => sum + calculateItemTotal(item),
  //     0
  //   );

  return (
    <>
      <div className="lg:col-span-1">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6 sticky top-4">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
            Order Summary
          </h2>

          {/* Promo Code */}
          <div className="mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm text-gray-400 mb-2 block flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Promo Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
              />
              <button
                onClick={applyPromoCodeHandler}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors text-sm font-semibold"
              >
                Apply
              </button>
            </div>
            {promo && (
              <p className="text-xs text-green-400 mt-2 mb-0">
                ✓ Code "{promo.code}" applied ({promo.discount}% off)
                <button
                  onClick={() => dispatch(clearPromo())}
                  className="ml-2 text-xs text-gray-300 underline"
                >
                  remove
                </button>
              </p>
            )}
          </div>
          {/* Price Breakdown */}
          <div className="space-y-3 mb-6 pb-6 border-b border-gray-700">
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-gray-400 m-0">Subtotal</span>
              <span className="text-white font-semibold m-0">
                ${subTotal.toFixed(2)}
              </span>
            </div>
            {promo && (
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-green-400 m-0">Promo Discount</span>
                <span className="text-green-400 font-semibold m-0">
                  -${promoDiscount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-gray-400 m-0">Tax (10%)</span>
              <span className="text-white font-semibold m-0">
                ${tax.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg sm:text-xl font-bold text-white m-0">
              Total
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-red-500 m-0" >
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Checkout Button */}
          <button
            disabled={basketItems.length === 0}
            className="w-full bg-red-600 text-white py-3 sm:py-4 rounded-lg hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
          >
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
            Proceed to Checkout
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Payment Methods */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-400 mb-3 text-center m-0">We accept</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-2 w-12 h-8 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-gray-400" />
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-2 w-12 h-8 flex items-center justify-center text-gray-400 text-xs font-bold">
                PP
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-2 w-12 h-8 flex items-center justify-center text-gray-400 text-xs font-bold">
                💳
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
