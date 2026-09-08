import React from 'react';
import Keypad from '../../component/Keypad';

const CashReceiptModal = () => {
  return (
    <div className="modalBg cashReceiptModal">
      <div className="bodyModal cashModalBody">
        <div className="cashModalHeader">
          <div className="cashModalTitle">
            <div>현금영수증 신청</div>
            <p>소득공제용 또는 지출증빙용 선택 후 번호를 입력해주세요</p>
          </div>
        </div>

        {/* 소득공제용 */}
        <div className="cashModalContent personalReceipt">
          <div className="cashModalContentLeft">
            <div className="cashReceiptMenu">
              <div className="cashReceiptMenuItem active">소득공제용</div>
              <div className="cashReceiptMenuItem">지출증빙용</div>
            </div>
            <div className="numInputBox">
              <input type="number" placeholder="휴대폰번호를 입력하세요" />
            </div>
          </div>
          <div className="cashModalContentRight">
            <Keypad hasZeroTen />
            <div className="btnBox">
              <div className="roundBtn grayBtn">취소</div>
              <div className="roundBtn primaryBtn">신청</div>
            </div>
          </div>
        </div>

        {/* 지출증빙용 */}
        <div className="cashModalContent corporationReceipt active">
          <div className="cashModalContentLeft">
            <div className="cashReceiptMenu">
              <div className="cashReceiptMenuItem">소득공제용</div>
              <div className="cashReceiptMenuItem active">지출증빙용</div>
            </div>
            <div className="numInputBox">
              <input type="number" placeholder="사업자번호를 입력하세요" />
            </div>
          </div>
          <div className="cashModalContentRight">
            <Keypad hasZeroTen />
            <div className="btnBox">
              <div className="roundBtn grayBtn">취소</div>
              <div className="roundBtn primaryBtn">신청</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashReceiptModal;