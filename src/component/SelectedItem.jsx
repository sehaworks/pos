import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { BsTrash3 } from 'react-icons/bs';

/**
 * @param {Object} item - { id, title, price, count, isDiscount }
 * @param {boolean} isPayment - 결제 진행 상태 여부 (true일 경우 수량변경/삭제 버튼 숨김)
 * @param {Function} onIncrease - 수량 증가 함수
 * @param {Function} onDecrease - 수량 감소 함수
 * @param {Function} onDelete - 삭제 함수
 */
const SelectedItem = ({ item, isPayment = false, onIncrease, onDecrease, onDelete }) => {
  const { id, title, price, count, isDiscount } = item;

  // 총 가격 계산 (단가 * 수량 또는 할인 금액)
  const totalPrice = isDiscount ? price : price * count;
  const formattedPrice = `${totalPrice.toLocaleString()}원`;

  // 1개 이하일 때 마이너스 버튼 스타일 지정 (1 미만으로 안 떨어지도록 연하게)
  const isMinCount = count <= 1;

  // 1. 할인 항목인 경우
  if (isDiscount) {
    return (
      <div className="selectedListItem discountListItem">
        <div className="selectedListItemInfo">
          <div className="selectedItemTitle">┗ {title}</div>
          <div className="selectedItemCanDelete">
            <div className="selectedItemPrice">-{formattedPrice}</div>
            {/* 결제 상태(isPayment)가 아닐 때만 삭제 버튼 노출 */}
            {!isPayment && (
              <div className="deleteBtn redBtn" onClick={() => onDelete(id)}>
                <BsTrash3 />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. 결제/할인 상태일 때 (버튼 없음, 제목 뒤에 '× 수량' 표시)
  if (isPayment) {
    return (
      <div className="selectedListItem">
        <div className="selectedListItemInfo">
          <div className="selectedItemTitle">
            {title} × {count}
          </div>
          <div className="selectedItemPrice">{formattedPrice}</div>
        </div>
      </div>
    );
  }

  // 3. 일반 수량 조절 상태 (기본)
  return (
    <div className="selectedListItem">
      <div className="selectedListItemInfo">
        <div className="selectedItemTitle">{title}</div>
        <div className="selectedItemPrice">{formattedPrice}</div>
      </div>
      <div className="selectedListItemBtnBox">
        <div className="selectedListItemCountBox">
          <div
            className={`downNum ${isMinCount ? 'grayBtn' : 'primaryBtn'}`}
            onClick={() => onDecrease(id)}
          >
            <FaMinus />
          </div>
          <div className="countNum">{count}</div>
          <div className="upNum primaryBtn" onClick={() => onIncrease(id)}>
            <FaPlus />
          </div>
        </div>
        <div className="deleteBtn redBtn" onClick={() => onDelete(id)}>
          <BsTrash3 />
        </div>
      </div>
    </div>
  );
};

export default SelectedItem;