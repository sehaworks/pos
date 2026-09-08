import React, { useState } from 'react';
import Keypad from '../../component/Keypad';

const CashModal = ({ onClose, onComplete, totalPrice = 0 }) => {
  // 받은 돈 상태 관리
  const [receivedAmount, setReceivedAmount] = useState('');

  // 숫자 변환
  const numericReceived = parseInt(receivedAmount, 10) || 0;

  // 거스름돈 계산 (받은 돈 - 결제금액)
  const changeAmount = Math.max(0, numericReceived - totalPrice);

  // 1. Keypad 숫자 클릭 핸들러 (onNumClick에 연결)
  const handleNumClick = (num) => {
    setReceivedAmount((prev) => {
      // 빈 값일 때 0이나 00 클릭 시 입력 안 되게 방지
      if (prev === '' && (num === '0' || num === '00')) return '';
      return prev + num;
    });
  };

  // 2. Keypad 지우기 버튼 클릭 핸들러 (onDeleteClick에 연결)
  const handleDeleteClick = () => {
    setReceivedAmount((prev) => prev.slice(0, -1));
  };

  // 3. input 직접 수정 핸들러
  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(rawValue)) {
      setReceivedAmount(rawValue);
    }
  };

  // 4. + 금액 버튼 클릭 핸들러
  const handleAddAmount = (amount) => {
    setReceivedAmount((prev) => String((parseInt(prev, 10) || 0) + amount));
  };

  // 5. 입력완료 클릭 핸들러
  const handleComplete = () => {
    if (numericReceived < totalPrice) {
      alert('받은 돈이 결제 금액보다 적습니다.');
      return;
    }
    onComplete?.();
  };

  return (
    <div className="modalBg cashModal active">
      <div className="bodyModal cashModalBody">
        <div className="cashModalHeader">
          <div className="cashModalHeaderLeft">
            <div className="totalPaymentBox">
              <div className="totalPaymentLabel">현금 결제금액</div>
              <div className="totalPaymentMoney">
                <b>{totalPrice.toLocaleString()}</b>원
              </div>
            </div>
          </div>
          <div className="cashModalHeaderRight">
            <div className="changePaymentBox">
              <div className="changePaymentLabel">거스름돈</div>
              <div className="changePaymentMoney">
                <b>{changeAmount.toLocaleString()}</b>원
              </div>
            </div>
          </div>
        </div>

        <div className="cashModalContent">
          <div className="cashModalContentLeft">
            <div className="inputLabelBox">
              <div className="inputLabel">받은 돈</div>
              <div className="numInputBox">
                <input
                  type="text"
                  placeholder="직접입력"
                  value={receivedAmount ? Number(receivedAmount).toLocaleString() : ''}
                  onChange={handleInputChange}
                />
                <div className="unitBtnBox">
                  <div className="unitBtn grayBtn wonBtn selected">원</div>
                </div>
              </div>
            </div>

            {/* + 금액 버튼 영역 */}
            <div className="receivedBtnBox">
              <div className="receivedBtn grayBtn" onClick={() => handleAddAmount(1000)}>
                + 1천원
              </div>
              <div className="receivedBtn grayBtn" onClick={() => handleAddAmount(5000)}>
                + 5천원
              </div>
              <div className="receivedBtn grayBtn" onClick={() => handleAddAmount(10000)}>
                + 1만원
              </div>
              <div className="receivedBtn grayBtn" onClick={() => handleAddAmount(50000)}>
                + 5만원
              </div>
            </div>
          </div>

          <div className="cashModalContentRight">
            {/* Keypad의 prop 명칭에 맞게 연결 */}
            <Keypad
              onNumClick={handleNumClick}
              onDeleteClick={handleDeleteClick}
            />

            <div className="btnBox">
              <div className="roundBtn grayBtn" onClick={onClose}>
                취소
              </div>
              <div className="roundBtn primaryBtn" onClick={handleComplete}>
                입력완료
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashModal;