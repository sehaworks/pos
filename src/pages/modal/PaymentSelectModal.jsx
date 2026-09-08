import React from 'react';
import { FaXmark } from 'react-icons/fa6';

import samsungpay from '../../assets/img/samsungpay.png';
import applepay from '../../assets/img/applepay.png';
import mobilepay from '../../assets/img/mobilepay.png';
import cash from '../../assets/img/cash.png';
import card from '../../assets/img/card.png';
import voucher from '../../assets/img/voucher.png';

const PAY_OPTIONS = [
  { id: 'samsung', label: '삼성페이', img: samsungpay },
  { id: 'apple', label: '애플페이', img: applepay },
  { id: 'mobile', label: '간편결제', img: mobilepay },
  { id: 'cash', label: '현금결제', img: cash },
  { id: 'card', label: '카드결제', img: card },
];

const PaymentSelectModal = ({ isOpen, onClose, onSelectPayment }) => {
  if (!isOpen) return null;

  return (
    <div className="modalBg paymentModal active">
      <div className="bodyModal">
        <div className="deleteBtn redBtn" onClick={onClose}>
          <FaXmark />
        </div>
        <div className="bodyModalContent">
          <div className="bodyModalContainer">
            <div className="bodyModalTitle">결제수단을 선택해주세요</div>
            <div className="bodyModalPaymentBtnBox">
              {PAY_OPTIONS.map((opt) => (
                <div
                  key={opt.id}
                  className="paymentBtnItem"
                  onClick={() => onSelectPayment(opt.id)}
                >
                  <img src={opt.img} alt={opt.label} />
                  <div>{opt.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSelectModal;