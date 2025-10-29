"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, CreditCard, Wallet } from 'lucide-react';
import { allOrders } from '@/mock/orders-mock';
import { useTranslation } from '@/hooks/use-translations';

const Order = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;
  const totalPages = Math.ceil(allOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const { t } = useTranslation()
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'pending':
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const getPaymentIcon = (icon) => {
    switch (icon) {
      case 'card':
        return <CreditCard className="w-4 h-4" />;
      case 'wallet':
        return <Wallet className="w-4 h-4" />;
      case 'paypal':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.32 21.97a.546.546 0 0 1-.26-.32c-.03-.15-.01-.3.06-.44l2.02-6.64a.49.49 0 0 1 .48-.37h2.99c3.26 0 5.22-1.58 5.22-4.21 0-.51-.1-.99-.27-1.42 1.51.78 2.24 2.21 2.24 4.22 0 3.48-2.65 5.88-6.57 5.88h-2.13c-.42 0-.76.29-.86.69l-.56 1.83a.55.55 0 0 1-.54.42h-1.78a.05.05 0 0 1-.04-.04zm-1.45-4.73a.546.546 0 0 1-.26-.32c-.03-.15-.01-.3.06-.44l2.37-7.8c.08-.27.33-.47.61-.47h5.25c2.43 0 4.12 1.05 4.12 3.57 0 3.07-2.23 5.19-5.52 5.19H9.18c-.42 0-.76.29-.86.69l-.59 1.92a.55.55 0 0 1-.54.42H5.41a.05.05 0 0 1-.04-.04l1.5-2.72z" />
          </svg>
        );
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-gray-950 to-[#07043C] px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{t("title")}</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-400">{t("subtitle")}</p>
        </div>

        {/* Orders List */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 md:mb-8">
          {currentOrders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:border-red-500/50 transition-all duration-300"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-700">
                <div className="mb-3 sm:mb-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white m-0 p-0">{order.id}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 m-0 p-0">{order.date}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
                  <div className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg border text-xs sm:text-sm ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="text-xs sm:text-sm font-semibold m-0 p-0">{t(order.status)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800/50 rounded-md sm:rounded-lg border border-gray-700">
                    {getPaymentIcon(order.paymentIcon)}
                    <span className="text-xs sm:text-sm text-gray-300 m-0 p-0">{order.paymentMethod}</span>
                  </div>
                  <div className="text-right ml-auto sm:ml-0">
                    <p className="text-xs text-gray-400 m-0 p-0">{t("total")}</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 m-0 p-0">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2 sm:space-y-3">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wide m-0 p-0">{t("orderItems")}</h4>
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-800/30 rounded-md sm:rounded-lg p-2 sm:p-3 md:p-4 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-md sm:rounded-lg flex items-center justify-center text-base sm:text-xl md:text-2xl flex-shrink-0">
                        {item.image}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white text-xs sm:text-sm md:text-base truncate m-0 p-0">{item.name}</p>
                        <p className="text-xs sm:text-sm text-gray-400 m-0 p-0">{t("qty")}: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="font-bold text-red-500 text-sm sm:text-base md:text-lg m-0 p-0">${item.price.toFixed(2)}</p>
                      <p className="text-xs text-gray-400 m-0 p-0">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white text-sm sm:text-base rounded-lg hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm m-0 p-0">{t("previous")}</span>
          </button>

          <div className="flex items-center gap-1 sm:gap-2  max-w-full">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg font-semibold text-xs sm:text-sm transition-all transform hover:scale-105 active:scale-95 flex-shrink-0 ${currentPage === idx + 1
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-full sm:w-auto flex justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white text-sm sm:text-base rounded-lg hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
          >
            <span className="text-xs sm:text-sm m-0 p-0">{t("next")}</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Summary Stats */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 transform hover:scale-105 transition-all">
            <p className="text-green-400 font-semibold text-xs sm:text-sm md:text-base m-0 p-0">{t("approved_")}</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white m-0 p-0">{allOrders.filter(o => o.status === 'Approved').length}</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 transform hover:scale-105 transition-all">
            <p className="text-yellow-400 font-semibold text-xs sm:text-sm md:text-base m-0 p-0">{t("pending_")}</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white m-0 p-0">{allOrders.filter(o => o.status === 'Pending').length}</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 transform hover:scale-105 transition-all">
            <p className="text-red-400 font-semibold text-xs sm:text-sm md:text-base m-0 p-0">{t("rejected_")}</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white m-0 p-0">{allOrders.filter(o => o.status === 'Rejected').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;