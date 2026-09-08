import React from 'react';
import Keypad from '../../component/Keypad';

const VoucherModal = () => {
  const voucherTypes = ['5만원 권', '1만원 권', '5천원 권', '1천원 권'];

  return (
    <div className="modalBg voucherModal active">
      <div className="bodyModal cashModalBody">
        <div className="cashModalHeader">
          <div className="cashModalHeaderLeft">
            <div className="totalPaymentBox">
              <div className="totalPaymentLabel">상품권 결제금액</div>
              <div className="totalPaymentMoney">
                <b>16,500</b>원
              </div>
            </div>
          </div>
          <div className="cashModalHeaderRight">
            <div className="changePaymentBox">
              <div className="changePaymentLabel">거스름돈</div>
              <div className="changePaymentMoney">
                <b>3,500</b>원
              </div>
            </div>
          </div>
        </div>
        <div className="cashModalContent">
          <div className="cashModalContentLeft">
            <div className="inputLabel">받은 상품권</div>
            <div className="voucherInputBox">
              {voucherTypes.map((label) => (
                <div className="pettyCashItem" key={label}>
                  <div className="pettyCashLabel">{label}</div>
                  <div className="pettyCashInputBox">
                    <input type="text" placeholder="0" />
                    <span>장</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cashModalContentRight">
            <Keypad hasDoubleZero />
            <div className="btnBox">
              <div className="roundBtn grayBtn">취소</div>
              <div className="roundBtn primaryBtn">입력완료</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherModal;