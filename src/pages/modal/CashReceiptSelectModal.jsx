import React from 'react';

const CashReceiptSelectModal = () => {
  return (
    <div className="modalBg cashReceiptSelectModal">
      <div className="bodyModal cashReceiptSelectModalBody">
        <div className="cashReceiptSelectModaltitle">
          현금영수증 여부를 선택해 주세요
        </div>
        <div className="cashReceiptBtnBox">
          <div className="cashReceiptBtn grayBtn roundBtn">
            <img src={receipt} alt="receipt" />
            <div>현금영수증 신청</div>
          </div>
          <div className="cashReceiptBtn grayBtn roundBtn">
            <img src={noReceipt} alt="noReceipt" />
            <div>현금영수증 신청 안함</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashReceiptSelectModal;