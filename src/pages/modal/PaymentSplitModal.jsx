import React, { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import Keypad from '../../component/Keypad';

const PaymentSplitModal = ({
  isOpen,
  onClose,
  remainingAmount = 16500,
  payOptions,
  onPay,
}) => {
  const [payType, setPayType] = useState('split'); // 'all' | 'split'
  const [payAmount, setPayAmount] = useState('');

  if (!isOpen) return null;

  const handleNumClick = (num) => setPayAmount((prev) => prev + num);
  const handleDeleteClick = () => setPayAmount((prev) => prev.slice(0, -1));
  const handleAddAmount = (amount) => {
    setPayAmount((prev) => (Number(prev || 0) + amount).toString());
  };

  return (
    <div className="modalBg paymentModalBtn active">
      <div className="bodyModal">
        <div className="bodyModalHeader">
          <div className="modalHeaderBtnBox">
            <button
              className={`modalHeaderBtn ${payType === 'all' ? 'active' : ''}`}
              onClick={() => setPayType('all')}
            >
              전액결제
            </button>
            <button
              className={`modalHeaderBtn ${payType === 'split' ? 'active' : ''}`}
              onClick={() => setPayType('split')}
            >
              분할결제
            </button>
          </div>
          <div className="deleteBtn redBtn" onClick={onClose}>
            <FaXmark />
          </div>
        </div>

        {/* 전액결제 모드 */}
        {payType === 'all' && (
          <div className="bodyModalContent paymentAll active">
            <div className="bodyModalContainer">
              <div className="bodyModalTitle">결제수단을 선택해주세요</div>
              <div className="bodyModalPaymentBtnBox">
                {payOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className="paymentBtnItem"
                    onClick={() => onPay({ type: 'all', method: opt.id })}
                  >
                    <img src={opt.img} alt={opt.label} />
                    <div>{opt.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 분할결제 모드 */}
        {payType === 'split' && (
          <div className="bodyModalContent paymentSplit active">
            <div className="bodyModalContainer">
              <div className="bodyModalTitle">결제 금액을 입력해주세요</div>
              <div className="bodyModalSplitPaymentBox">
                <div className="cashModalContent">
                  <div className="cashModalContentLeft">
                    <div className="totalPaymentBox">
                      <div className="totalPaymentLabel">남은 결제금액</div>
                      <div className="totalPaymentMoney">
                        <b>{remainingAmount.toLocaleString()}</b>원
                      </div>
                    </div>
                    <div className="inputLabelBox">
                      <div className="inputLabel">이번 결제금액</div>
                      <div className="numInputBox">
                        <input
                          type="number"
                          placeholder="직접입력"
                          value={payAmount}
                          onChange={(e) => setPayAmount(e.target.value)}
                        />
                        <div className="unitBtnBox">
                          <div className="unitBtn grayBtn wonBtn selected">원</div>
                        </div>
                      </div>
                    </div>
                    <div className="receivedBtnBox">
                      <div className="receivedBtn grayBtn" onClick={() => handleAddAmount(1000)}>+ 1천원</div>
                      <div className="receivedBtn grayBtn" onClick={() => handleAddAmount(5000)}>+ 5천원</div>
                      <div className="receivedBtn grayBtn" onClick={() => handleAddAmount(10000)}>+ 1만원</div>
                      <div className="receivedBtn grayBtn" onClick={() => handleAddAmount(50000)}>+ 5만원</div>
                    </div>
                  </div>

                  <div className="cashModalContentRight">
                    <Keypad onNumClick={handleNumClick} onDeleteClick={handleDeleteClick} />
                    <div className="btnBox">
                      <div className="roundBtn grayBtn" onClick={onClose}>취소</div>
                      <div
                        className="roundBtn primaryBtn"
                        onClick={() => onPay({ type: 'split', amount: payAmount })}
                      >
                        결제하기
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSplitModal;