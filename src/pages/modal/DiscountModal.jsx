import React, { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import Keypad from '../../component/Keypad';

const DiscountModal = ({ isOpen, onClose, onApplyDiscount }) => {
  const [discountType, setDiscountType] = useState('item'); // 'item' | 'total'
  const [unit, setUnit] = useState('won'); // 'won' | 'percent'
  const [inputValue, setInputValue] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(null);

  if (!isOpen) return null;

  const handleNumClick = (num) => {
    setSelectedPreset(null);
    setInputValue((prev) => prev + num);
  };

  const handleDeleteClick = () => {
    setSelectedPreset(null);
    setInputValue((prev) => prev.slice(0, -1));
  };

  const presetDiscounts = [
    { title: '직원 할인', value: '10%' },
    { title: '지역주민 할인', value: '20%' },
    { title: '국가유공자 할인', value: '50%' },
  ];

  const handlePresetSelect = (discount) => {
    setSelectedPreset(discount);
    setInputValue('');
  };

  // 적용 버튼 클릭 핸들러 (모달을 닫지 않음)
  const handleApply = () => {
    if (selectedPreset) {
      onApplyDiscount?.({
        type: discountType,
        title: `${selectedPreset.title} (${selectedPreset.value})`,
      });
    } else if (inputValue) {
      onApplyDiscount?.({
        type: discountType,
        unit: unit,
        value: inputValue,
      });
    }

    // 모달을 닫지 않고 입력 필드/선택값만 리셋
    setInputValue('');
    setSelectedPreset(null);
  };

  return (
    <div className="modalBg discountModal active">
      <div className="bodyModal">
        <div className="bodyModalHeader">
          <div className="categoryMenuBox">
            <div className="categoryMenu">
              <div
                className={`categoryMenuItem ${discountType === 'item' ? 'active' : ''}`}
                onClick={() => setDiscountType('item')}
              >
                상품별할인
              </div>
              <div
                className={`categoryMenuItem ${discountType === 'total' ? 'active' : ''}`}
                onClick={() => setDiscountType('total')}
              >
                전체할인
              </div>
            </div>
          </div>
          {/* 상단 닫기(X) 버튼을 눌러야만 모달이 닫힙니다 */}
          <div className="deleteBtn redBtn" onClick={onClose}>
            <FaXmark />
          </div>
        </div>

        <div className="bodyModalContent">
          <div className="bodyModalLeftContent">
            {presetDiscounts.map((discount, idx) => (
              <div
                key={idx}
                className={`discountItem ${selectedPreset?.title === discount.title ? 'active' : ''}`}
                onClick={() => handlePresetSelect(discount)}
              >
                <div className="discountTitle">{discount.title}</div>
                <div className="persent">{discount.value}</div>
              </div>
            ))}
          </div>

          <div className="bodyModalRightContent">
            <div className="keypadBox">
              <div className="numInputBox">
                <input
                  type="number"
                  placeholder="직접입력"
                  value={inputValue}
                  onChange={(e) => {
                    setSelectedPreset(null);
                    setInputValue(e.target.value);
                  }}
                />
                <div className="unitBtnBox">
                  <div
                    className={`unitBtn grayBtn wonBtn ${unit === 'won' ? 'selected' : ''}`}
                    onClick={() => setUnit('won')}
                  >
                    원
                  </div>
                  <div
                    className={`unitBtn grayBtn persentBtn ${unit === 'percent' ? 'selected' : ''}`}
                    onClick={() => setUnit('percent')}
                  >
                    %
                  </div>
                </div>
              </div>
              <Keypad onNumClick={handleNumClick} onDeleteClick={handleDeleteClick} />
            </div>
            <div className="btnBox">
              {/* 하단 취소 버튼을 눌러야만 모달이 닫힙니다 */}
              <div className="primaryBtn enterBtn" onClick={handleApply}>
                할인 적용
              </div>
              <div className="softBlueBtn cancleBtn" onClick={onClose}>
                완료
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;