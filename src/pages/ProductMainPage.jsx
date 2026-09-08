import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import check from '../assets/img/checkImg.png';
import alert from '../assets/img/alertImg.png';
// import shop from '../assets/img/shop-solid-full.svg';
// import inventory from '../assets/img/box-solid-full.svg';
// import payment from '../assets/img/receipt-solid-full.svg';
// import sales from '../assets/img/chart-line-solid-full.svg';
// import pettycash from '../assets/img/money-bill-solid-full.svg';
// import set from '../assets/img/gear-solid-full.svg';
import groupTicket from '../assets/img/grouponone.png';
import personalTicket from '../assets/img/oneonone.png';
import receipt from '../assets/img/receipt.png';
import noReceipt from '../assets/img/noReceipt.png';
// import halfReceipt from '../assets/img/halfRefund.png';
// import qrCode from '../assets/img/QRcord.png';
import paymentCard from '../assets/img/paymentCard.png';
// import tagging from '../assets/img/tagging.png';

import {
  IoMenu,
  IoBackspaceOutline,
  // IoChevronDown,
  // IoCheckmarkCircleOutline,
  // IoCheckmarkCircleSharp,
} from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import {
  FaPlus,
  FaMinus,
  FaXmark,
  FaShop,
  FaBox,
  FaReceipt,
  FaChartLine,
  FaMoneyBill,
  FaGear,
  FaCoins,
} from 'react-icons/fa6';
import { BsArrowClockwise, BsTrash3 } from 'react-icons/bs';

// 모달
import DiscountModal from './modal/DiscountModal';
import PaymentSelectModal from './modal/PaymentSelectModal';
import PaymentCardModal from './modal/PaymentCardModal';
import CashModal from './modal/CashModal';
import VoucherModal from './modal/VoucherModal';
import PaymentCompleteModal from './modal/PaymentCompleteModal';

// 기본 상품 리스트 데이터
const initialProducts = [
  { id: 1, name: '성인 입장권', price: 7000, category: '개인', stockCount: '9,999' },
  { id: 2, name: '청소년 입장권', price: 5000, category: '개인', stockCount: '8,500', },
  { id: 3, name: '어린이 입장권', price: 3000, category: '개인', stockCount: '367', colorKey: 'yellow' },
  { id: 4, name: '단체 성인 패키지', price: 6000, category: '단체', stockCount: '3,000' },
  { id: 5, name: '단체 청소년 패키지', price: 4000, category: '단체', stockCount: '2,000' },
];

const ProductMainPage = ({ products, onSelectProduct, activeModal, openModal, closeModal }) => {
  const navigate = useNavigate();

  // === State 관리 ===
  const [category, setCategory] = useState('개인'); // '개인' | '단체'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCartItemId, setSelectedCartItemId] = useState(null); // 할인 적용 대상
  const [isProcessing, setIsProcessing] = useState(false); // 결제 진행 중 상태 ('...결제중...' 및 totalPrice active 표출용)

  const isDiscountMode = activeModal === 'discount';

  // 카테고리별 상품 필터링
  const filteredProducts = (products || initialProducts).filter(
    (item) => item.category === category
  );

  // === 핸들러 함수 ===

  // 1. 상품 선택 (장바구니 추가)
  const handleSelectProduct = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prevItems, { ...product, count: 1, discounts: [] }];
    });
  };

  // 2. 할인 적용 핸들러
  const handleApplyDiscount = (discountData) => {
    const { value, unit, type, title } = discountData;

    setCartItems((prevItems) => {
      const targetId =
        selectedCartItemId || (prevItems.length > 0 ? prevItems[prevItems.length - 1].id : null);

      return prevItems.map((item) => {
        if (type === 'item' && String(item.id) !== String(targetId)) {
          return item;
        }

        const originalTotal = item.price * item.count;
        let calculatedDiscount = 0;
        let nameLabel = '';

        if (title) {
          const percentMatch = title.match(/(\d+)%/);
          const percent = percentMatch ? parseFloat(percentMatch[1]) : 0;
          calculatedDiscount = Math.round((originalTotal * percent) / 100);
          nameLabel = title.replace(/\s*\(\d+%\)/, '').trim();
        } else if (unit === 'percent' && value) {
          const percent = parseFloat(value) || 0;
          calculatedDiscount = Math.round((originalTotal * percent) / 100);
          nameLabel = `직접할인 ${percent}%`;
        } else if (value) {
          calculatedDiscount = parseInt(value, 10) || 0;
          nameLabel = '직접할인';
        }

        if (calculatedDiscount <= 0) return item;

        const currentDiscounts = item.discounts || [];
        const newDiscount = {
          discountId: Date.now() + Math.random(),
          name: nameLabel,
          amount: calculatedDiscount,
        };

        return {
          ...item,
          discounts: [...currentDiscounts, newDiscount],
        };
      });
    });
  };

  // 3. 수량 변경
  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newCount = item.count + delta;
            return newCount > 0 ? { ...item, count: newCount } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // 4. 단일 삭제
  const handleDeleteItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 5. 전체 삭제
  const handleClearCart = () => {
    setCartItems([]);
  };

  // 6. 할인/이전 버튼 클릭 처리
  const handleDiscountButtonClick = () => {
    if (activeModal === 'discount') {
      closeModal?.();
    } else {
      openModal?.('discount');
    }
  };

  // 7. 특정 할인 항목 삭제
  const handleRemoveDiscount = (itemId, discountId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            discounts: item.discounts.filter((d) => d.discountId !== discountId),
          };
        }
        return item;
      })
    );
  };

  // 8. 결제 버튼 클릭 처리
  const handlePaymentClick = () => {
    setIsProcessing(true); // 금액 active 표출 및 '...결제중...' 변경
    openModal?.('paymentSelect'); // 결제 수단 선택 모달 열기
  };

  // 9. 모달 닫기 래퍼 (결제 중 상태 복귀 포함)
  const handleCloseModal = () => {
    setIsProcessing(false);
    closeModal?.();
  };

  // 10. 결제 수단 선택 핸들러 (모달 체이닝)
  const handleSelectPayment = (paymentId) => {
    switch (paymentId) {
      case 'card':
      case 'samsung':
      case 'apple':
      case 'mobile':
        openModal?.('card');
        break;

      case 'cash':
        openModal?.('cash');
        break;

      case 'voucher':
        openModal?.('voucher');
        break;

      default:
        console.warn('알 수 없는 결제수단:', paymentId);
        break;
    }
  };

  // === 연산 변수 ===
  const totalCount = cartItems.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cartItems.reduce((acc, item) => {
    const itemTotal = item.price * item.count;
    const itemDiscountTotal = (item.discounts || []).reduce((sum, d) => sum + d.amount, 0);
    return acc + Math.max(0, itemTotal - itemDiscountTotal);
  }, 0);

  return (
    <div className="container">
      {/* GNB Header */}
      <div className="header">
        <div className="leftHeader">
          <div className="hedaerMenuBtn" onClick={() => setIsMenuOpen(true)}>
            <IoMenu />
          </div>
        </div>
        <div className="rightHeader">
          <div className="sellerName">판매자: 홍길동 님</div>
          <div className="realTime">2025.08.25(월) 15:58</div>
          <div className="logoutBtn">
            <FiLogOut />
          </div>
        </div>
      </div>
      <div className="body">
        <div className="leftBody">
          {/* 1. 카테고리 헤더 */}
          <div className="leftBodyHeader">
            <div className="categoryMenu">
              <div
                className={`categoryMenuItem ${category === '개인' ? 'active' : ''}`}
                onClick={() => setCategory('개인')}
              >
                개인
              </div>
              <div
                className={`categoryMenuItem ${category === '단체' ? 'active' : ''}`}
                onClick={() => setCategory('단체')}
              >
                단체
              </div>
            </div>
          </div>

          {/* 2. 상품 그리드 목록 */}
          <div className="leftBodyContent">
            <div className="posItemBox">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="posItem"
                  onClick={() => handleSelectProduct(item)}
                  style={{
                    backgroundColor: item.colorKey ? `var(--${item.colorKey})` : undefined,
                    color: item.colorKey ? 'var(--white)' : 'var(--black)',
                  }}
                >
                  <div className="posItemInfo">
                    <div className="posItemName">{item.name}</div>
                    <div className="posItemPrice">{item.price.toLocaleString()}원</div>
                  </div>
                  <div className="posItemNum">
                    <span>{item.stockCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 할인 모달 */}
          <DiscountModal
            isOpen={activeModal === 'discount'}
            onClose={closeModal}
            onApplyDiscount={(data) => console.log('할인 적용:', data)}
          />
          {/* 결제 수단 선택 모달 */}
          <PaymentSelectModal
            isOpen={activeModal === 'paymentSelect'} // 또는 모달 오픈 조건
            onClose={handleCloseModal}
            onSelectPayment={(type) => openModal?.(type)} // 선택한 opt.id가 activeModal에 저장됨
          />
        </div>

        {/* 오른쪽 : 선택된 리스트들 */}
        <div className="rightBody">
          <div className="rightBodyHeader">
            <div className="totalNumBox">
              <span className="totalNumLabel">총 수량</span>
              <span className="totalNum">{totalCount}</span>
            </div>
            <div className="redBtn allDeleteBtn" onClick={handleClearCart}>
              전체삭제
            </div>
          </div>
          <div className="rightBodyContent selectedListItemBox">
            {cartItems.length === 0 ? (
              <div className="emptyCart">선택된 상품이 없습니다.</div>
            ) : (
              cartItems.map((item) => {
                const isSelected = selectedCartItemId === item.id;
                // 할인 모드이거나 결제 진행 중일 때 true
                const isCompactMode = isDiscountMode || isProcessing;

                return (
                  <div
                    key={item.id}
                    className={`selectedListItem ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      if (isDiscountMode) setSelectedCartItemId(item.id);
                    }}
                    style={{
                      backgroundColor: isSelected ? '#e6f7ff' : '#fff',
                      borderBottom: '1px solid #f0f0f0',
                      padding: '16px 20px',
                      cursor: isDiscountMode ? 'pointer' : 'default',
                    }}
                  >
                    {/* 상단: 상품명 x 수량 및 가격 */}
                    <div
                      className="selectedListItemInfo"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        className="selectedItemTitle"
                        style={{ fontWeight: 'bold', fontSize: '16px', color: '#111' }}
                      >
                        {/* 할인 또는 결제 진행 중일 때 × 수량 표출 */}
                        {item.name} {isCompactMode && `× ${item.count}`}
                      </div>
                      <div
                        className="selectedItemPrice"
                        style={{ fontWeight: 'bold', fontSize: '16px', color: '#111' }}
                      >
                        {(item.price * item.count).toLocaleString()}원
                      </div>
                    </div>

                    {/* 수량 조정 버튼 (할인 모드 & 결제 진행 중이 아닐 때만 노출) */}
                    {!isCompactMode && (
                      <div
                        className="selectedListItemBtnBox"
                        style={{ display: 'flex', gap: '8px', marginTop: '8px' }}
                      >
                        <div
                          className="selectedListItemCountBox"
                          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <div
                            className={`downNum ${item.count > 1 ? 'primaryBtn' : 'grayBtn'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.count > 1) handleQuantityChange(item.id, -1);
                            }}
                          >
                            <FaMinus />
                          </div>
                          <div className="countNum">{item.count}</div>
                          <div
                            className="upNum primaryBtn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(item.id, 1);
                            }}
                          >
                            <FaPlus />
                          </div>
                        </div>
                        <div
                          className="deleteBtn redBtn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteItem(item.id);
                          }}
                        >
                          <BsTrash3 />
                        </div>
                      </div>
                    )}

                    {/* 하단: 적용된 할인 내역 */}
                    {item.discounts && item.discounts.length > 0 && (
                      <div
                        className="discountList"
                        style={{
                          marginTop: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                        }}
                      >
                        {item.discounts.map((discount) => (
                          <div
                            key={discount.discountId}
                            className="discountDetail"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontSize: '15px',
                            }}
                          >
                            {/* ㄴ 할인명 */}
                            <div style={{ color: '#e53935', fontWeight: '600' }}>
                              └ {discount.name}
                            </div>

                            {/* 금액 및 빨간색 휴지통 삭제 버튼 */}
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                              }}
                            >
                              <span style={{ color: '#e53935', fontWeight: '500' }}>
                                -{discount.amount.toLocaleString()}원
                              </span>
                              <div
                                className="discountDeleteBtn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveDiscount(item.id, discount.discountId);
                                }}
                                style={{
                                  cursor: 'pointer',
                                  color: '#ff7875',
                                  display: 'flex',
                                  alignItems: 'center',
                                  fontSize: '16px',
                                }}
                              >
                                <BsTrash3 />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
          {/* 하단 금액 및 결제 버튼 */}
          <div className="rightBodyFooter">
            {isProcessing && (
              <div className="totalPrice active">
                총 <b>{totalPrice.toLocaleString()}</b>원
              </div>
            )}
            <div className="footerBtnBox">
              {/* 할인 / 이전 버튼 */}
              <div
                className="previousBtn grayBtn active"
                onClick={handleDiscountButtonClick}
              >
                <span>{activeModal === 'discount' ? '이전' : '할인'}</span>
              </div>
              {/* 결제 버튼 */}
              <div className="paymentBtn primaryBtn" onClick={handlePaymentClick}>
                <span>
                  {isProcessing
                    ? '...결제중...'
                    : `${totalPrice.toLocaleString()}원 결제`}
                </span>
              </div>

              {/* 3. 각 결제 수단별 상세 모달들 */}
              {/* 카드를 사용하는 태깅/삽입 모달통합 (samsung, apple, mobile, card) */}
              {['card', 'samsung', 'apple', 'mobile'].includes(activeModal) && (
                <PaymentCardModal
                  paymentType={activeModal} // activeModal 값 자체가 paymentType으로 들어감
                  totalPrice={totalPrice}
                  onClose={handleCloseModal}
                  onComplete={() => openModal?.('paymentComplete')}
                />
              )}

              {/* 현금 결제 모달 */}
              {activeModal === 'cash' && (
                <CashModal
                  totalPrice={totalPrice}
                  onClose={handleCloseModal}
                  onComplete={() => openModal?.('paymentComplete')}
                />
              )}

              {/* 결제 완료 모달 */}
              {activeModal === 'paymentComplete' && (
                <PaymentCompleteModal
                  totalPrice={totalPrice}
                  onClose={handleCloseModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 사이드 메뉴 드로어 */}
      {isMenuOpen && (
        <div className="menuBg active">
          <div className="menuContainer">
            <div className="menuHeader">
              <div className="xBtnBox">
                <div className="deleteBtn redBtn" onClick={() => setIsMenuOpen(false)}>
                  <FaXmark />
                </div>
              </div>
            </div>
            <div className="menuBody">
              <div className="posName">칠갑타워</div>
              <div className="posMenuBox">
                <div className="posMenuItem active"><FaShop /><span>판매</span></div>
                <div className="posMenuItem"><FaBox /><span>재고관리</span></div>
                <div className="posMenuItem"><FaReceipt /><span>결제내역</span></div>
                <div className="posMenuItem"><FaChartLine /><span>매출내역</span></div>
                <div className="posMenuItem"><FaCoins /><span>시재관리</span></div>
                <div className="posMenuItem"><FaMoneyBill /><span>상품권관리</span></div>
                <div className="posMenuItem"><FaGear /><span>설정</span></div>
              </div>
            </div>
            <div className="menuFooter">
              <div className="blackBtn openMoneyBoxBtn">돈통열기</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductMainPage;
