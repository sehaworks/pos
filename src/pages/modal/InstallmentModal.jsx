import React from 'react';
import Keypad from '../../component/Keypad';

const InstallmentModal = () => {
  return (
    <div className="modalBg installmentModal">
      <div className="bodyModal">
        <div className="bodyModalCenterFlexBox">
          <div className="bodyModalTitleBox">
            <div className="bodyModalTitle">할부개월수를 선택해주세요</div>
            <div className="bodyModalSubTitle">
              결제금액 <b>16,500</b>원
            </div>
          </div>
          <div className="installmentDes">
            <div className="cashModalContentLeft">
              <div className="receivedBtnBox">
                <div className="receivedBtn grayBtn">일시불</div>
                <div className="receivedBtn grayBtn">3개월</div>
                <div className="receivedBtn grayBtn">6개월</div>
                <div className="receivedBtn grayBtn">12개월</div>
              </div>
              <div className="numInputBox">
                <input type="number" placeholder="직접입력" />
                <div className="unitBtnBox">
                  <div className="unitBtn grayBtn wonBtn selected">개월</div>
                </div>
              </div>
            </div>
            <div className="cashModalContentRight">
              <Keypad />
              <div className="btnBox">
                <div className="roundBtn grayBtn">취소</div>
                <div className="roundBtn primaryBtn">확인</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallmentModal;