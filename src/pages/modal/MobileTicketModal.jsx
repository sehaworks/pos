import React from 'react';
import Keypad from '../../component/Keypad';

const MobileTicketModal = () => {
  const ticketList = ['성인 돈', '성인 1', '성인 2', '청소년 1', '청소년 2', '청소년 3'];

  return (
    <div className="modalBg mobileTickteModal">
      <div className="bodyModal mobileTickteModalBody">
        <div className="logoutBtnBox">
          <div className="paperTicketBtn grayBtn">종이 티켓 받기</div>
        </div>
        <div className="cashModalHeader">
          <div className="cashModalTitle">
            <div>모바일 티켓 전송</div>
            <div className="checkMarkContainer">
              <input type="checkbox" id="check" />
              <div className="checkMarkBox">
                <span className="check-icon" aria-hidden="true"></span>
                <label htmlFor="check">개인정보 수집 및 이용 동의(필수)</label>
              </div>
            </div>
          </div>
        </div>
        <div className="cashModalContent">
          <div className="cashModalContentLeft">
            <div className="scrollBox">
              {ticketList.map((label) => (
                <div className="inputLabelBox" key={label}>
                  <div className="inputLabel">{label}</div>
                  <div className="numInputBox">
                    <input type="number" placeholder="휴대폰번호를 입력하세요" />
                  </div>
                </div>
              ))}
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

export default MobileTicketModal;