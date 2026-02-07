"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const PaymentModal = ({ isOpen, onClose, workerData, onConfirm }) => {
  const [txId, setTxId] = useState("");
  const [mounted, setMounted] = useState(false);

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

        <h2 className="sr-only">Payment Modal</h2>

        <div className="space-y-8">
          <div>
            <label className="text-gray-400 text-lg block mb-1">
              Account holder name
            </label>
            <p className="text-xl font-bold text-gray-800">
              {workerData.worker.name}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-lg block mb-1">
                Bank Name
              </label>
              <p className="text-xl font-bold text-gray-800">Payoneer</p>
            </div>
            <div>
              <label className="text-gray-400 text-lg block mb-1">
                Account Number
              </label>
              <p className="text-xl font-bold text-gray-800 tracking-wider">
                410 2150 5546 2015
              </p>
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-lg block mb-3">
              Transaction ID
            </label>
            <input
              type="text"
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
              placeholder="Enter Transaction Id"
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
            Pay ${workerData.budget}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default PaymentModal;
