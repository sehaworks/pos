import React from 'react';

const MobileTicketCompleteModal = () => {
  return (
    <div className="modalBg completeModal">
      <div className="bodyModal">
        <div className="bodyModalCenterFlexBox">
          <div className="bodyModalIconBoxContainer">
            <div className="bodyModalIconBox">
              <img src={check} alt="전송완료" />
              <div className="bodyModalBigTitle">
                <b>모바일 티켓</b> 전송 완료
                <div className="bodyModalTxt">
                  [카카오톡 알림]에서 발급된 모바일 티켓의
                  <br />
                  QR코드를 확인해 주세요.
                </div>
              </div>
            </div>
          </div>
          <div className="footerBtnBox">
            <span className="countdownInfo">
              <b>20</b>초 후 자동으로 닫힙니다
            </span>
            <div className="redBtn closeBtn">닫기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTicketCompleteModal;