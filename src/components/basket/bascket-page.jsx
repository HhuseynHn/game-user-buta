"use client";
import React, { useState } from "react";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import OrderSummary from "./order-summary";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  selectBasketItems,
  updateQuantity,
} from "@/core/config/redux/slices/basket-slice";
import RemoveModal from "./remove-modal";

const BacketComponent = () => {
  const dispatch = useDispatch();
  const basketItems = useSelector(selectBasketItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeId, setRemoveId] = useState(null);

// const translate=useT


  const onUpdateQuantity = (id, change) => {
    dispatch(updateQuantity({ id, change }));
  };

  const calculateItemTotal = (item) => {
    const discountedPrice = item.price * (1 - (item.discount || 0) / 100);
    return discountedPrice * item.quantity;
  };

  const handleRemoveClick = (id) => {
    setIsModalOpen(true);
    setRemoveId(id);
  };

  const handleConfirmRemove = (id) => {
    if (removeId !== null) {
      dispatch(removeItem(removeId));
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-gray-950 via-[#0a0520] to-[#050218] px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3">
              <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              Shopping Basket
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 m-0">
              {basketItems.length} {basketItems.length === 1 ? "item" : "items"}{" "}
              in your basket
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Basket Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {basketItems.length === 0 ? (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg sm:rounded-xl p-8 sm:p-12 text-center">
                  <ShoppingCart className="w-16 h-16 sm:w-20 sm:h-20 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Your basket is empty
                  </h3>
                  <p className="text-gray-400 m-0">
                    Add some games to get started!
                  </p>
                </div>
              ) : (
                basketItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg sm:rounded-xl p-2 sm:p-2 hover:border-red-500/50 transition-all duration-300"
                  >
                    <div className="flex flex-row gap-3 items-center">
                      {/* Item Image */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
                        {item.image}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-0">
                          <div className="text-left flex-1">
                            <h3 className="text-sm sm:text-base font-bold text-white mb-1 leading-tight">
                              {item.name}
                            </h3>
                            {item.discount > 0 && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 line-through m-0">
                                  ${item.price.toFixed(2)}
                                </span>
                                <span className="text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/50 m-0">
                                  -{item.discount}%
                                </span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemoveClick(item.id)}
                            className="text-red-500 hover:text-red-400 transition-colors bg-inherit p-1.5 hover:bg-red-500/10 rounded-lg flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 bg-gray-800/50 rounded-lg border border-gray-700 p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-700 bg-inherit rounded-md transition-colors"
                            >
                              <span className="text-white m-0 p-0">
                                <Minus className="w-3.5 h-3.5 text-white" />
                              </span>
                            </button>
                            <span className="text-white font-semibold min-w-[1.5rem] text-center text-sm m-0 p-0">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-700 rounded-md transition-colors bg-inherit"
                            >
                              <span className="text-white m-0 p-0">
                                <Plus className="w-3.5 h-3.5 text-white" />
                              </span>
                            </button>
                          </div>

                          <div className="text-center sm:text-right">
                            <p className="text-xs text-gray-400 m-0">
                              Item Total
                            </p>
                            <p className="text-xl sm:text-2xl font-bold text-red-500 m-0">
                              ${calculateItemTotal(item).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <RemoveModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onConfirm={handleConfirmRemove}
              // itemName={item?.id }
            />

            {/* Order Summary */}
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  );
};

export default BacketComponent;
