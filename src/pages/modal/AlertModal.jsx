import React from 'react';

const AlertModal = () => {
  return (
    <div className="modalBg alertModal">
      <div className="bodyModal">
        <div className="bodyModalCenterFlexBox">
          <div className="bodyModalIconBoxContainer">
            <div className="bodyModalFlexBox">
              <div className="bodyModalIconBox">
                <img src={alert} alt="오류" />
                <div className="bodyModalBigTitle">
                  결제 실패
                  <div className="bodyModalTxt">
                    결제 시스템 (PG사) 오류입니다.
                    <br />
                    담당자에게 문의 바랍니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footerBtnBox">
            {/* 버튼 2개 버전 */}
            <div className="grayBtn cancleBtn">취소</div>
            <div className="primaryBtn closeBtn">나가기</div>

            {/* 버튼 1개 버전으로 전환 시 주석 해제하여 사용 */}
            {/* <div className="primaryBtn closeBtn">결제 다시 시도</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;