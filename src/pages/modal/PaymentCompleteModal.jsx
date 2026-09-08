import React from 'react';
import check from '../../assets/img/checkImg.png';

const PaymentCompleteModal = ({ onClose, totalPrice = 0 }) => {
  return (
    <div className="modalBg completeModal active">
      <div className="bodyModal">
        <div className="bodyModalCenterFlexBox">
          <div className="bodyModalIconBoxContainer">
            <div className="bodyModalFlexBox">
              <div className="bodyModalIconBox">
                <img src={check} alt="결제완료" />
                <div className="bodyModalBigTitle">
                  <b>{totalPrice.toLocaleString()}</b>원 결제완료
                </div>
              </div>
              <div className="receiptBtnBox">
                <div className="grayBtn receiptBtn" onClick={onClose}> 닫기</div>
                {/* <div className="grayBtn kakaoBtn">모바일 티켓 받기</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCompleteModal;