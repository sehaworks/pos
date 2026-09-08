import React, { useEffect } from 'react';
import paymentCard from '../../assets/img/paymentCard.png';
import tagging from '../../assets/img/tagging.png';
import barcordPay from '../../assets/img/barcodePay.png';

const PaymentCardModal = ({ onClose, onComplete, totalPrice = 0, paymentType = 'card' }) => {
  useEffect(() => {
    // 3초(3000ms) 후에 결제 완료 처리 함수 실행
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 3000);

    // 컴포넌트가 언마운트되거나 모달이 중간에 닫히면 타이머 해제
    return () => clearTimeout(timer);
  }, [onComplete]);

  // 결제 타입별 타이틀 설정
  const getModalTitle = () => {
    switch (paymentType) {
      case 'samsung':
        return '삼성페이를 태깅해주세요';
      case 'apple':
        return '애플페이를 태깅해주세요';
      case 'mobile':
        return '간편결제를 인식해주세요';
      case 'card':
      default:
        return '카드를 삽입해주세요';
    }
  };

  // 결제 타입별 이미지 설정
  const getPaymentImage = () => {
    switch (paymentType) {
      case 'samsung':
      case 'apple':
        return tagging;
      case 'mobile':
        return barcordPay;
      case 'card':
      default:
        return paymentCard; // 기본 카드 태깅/삽입 이미지
    }
  };

  return (
    <div className="modalBg paymentCardModal active">
      <div className="bodyModal">
        <div className="bodyModalCenterFlexBox">
          <div className="bodyModalTitleBox">
            <div className="bodyModalTitle">{getModalTitle()}</div>
            <div className="bodyModalSubTitle">
              결제금액 <b>{totalPrice.toLocaleString()}</b>원
            </div>
          </div>
          <div className="paymentImg">
            <img src={getPaymentImage()}
              alt="결제 안내"
              className="paymentImg" />
          </div>
          <div className="footerBtnBox">
            <div className="grayBtn cancleBtn" onClick={onClose}>취소</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCardModal;