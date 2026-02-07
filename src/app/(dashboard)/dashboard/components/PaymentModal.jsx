"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const PaymentModal = ({ isOpen, onClose, workerData, onConfirm }) => {
  const [txId, setTxId] = useState("");
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !workerData || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-8 top-8 text-gray-400 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="sr-only">{t("paymentModal.title")}</h2>

        <div className="space-y-8">
          <div>
            <label className="text-gray-400 text-lg block mb-1">
              {t("paymentModal.accountHolderName")}
            </label>
            <p className="text-xl font-bold text-gray-800">
              {workerData.worker.name}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-lg block mb-1">
                {t("paymentModal.bankName")}
              </label>
              <p className="text-xl font-bold text-gray-800">
                {t("paymentModal.bankValue")}
              </p>
            </div>
            <div>
              <label className="text-gray-400 text-lg block mb-1">
                {t("paymentModal.accountNumber")}
              </label>
              <p className="text-xl font-bold text-gray-800 tracking-wider">
                {t("paymentModal.accountValue")}
              </p>
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-lg block mb-3">
              {t("paymentModal.transactionId")}
            </label>
            <input
              type="text"
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
              placeholder={t("paymentModal.transactionPlaceholder")}
              className="w-full px-6 py-4 bg-[#fcfcfc] border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#73a34f]/20 text-lg"
            />
          </div>

          <button
            onClick={() => {
              onConfirm(workerData.order.id, txId);
              setTxId("");
              onClose();
            }}
            disabled={!txId}
            className="w-full py-5 bg-[#73a34f] hover:bg-[#638d44] disabled:opacity-50 text-white text-xl font-bold rounded-2xl transition-all active:scale-[0.98]"
          >
            {t("actions.payAmount", { amount: workerData.budget })}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default PaymentModal;
