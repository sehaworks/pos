import React from 'react';

const TeamTicketSelectModal = () => {
  return (
    <div className="modalBg teamTicketModal">
      <div className="bodyModal cashReceiptSelectModalBody">
        <div className="cashReceiptSelectModaltitle">
          단체 입장권 발행 방법을 선택해주세요
        </div>
        <div className="cashReceiptBtnBox">
          <div className="cashReceiptBtn grayBtn roundBtn">
            <img src={personalTicket} alt="personalTicket" />
            <div>개인당 1매</div>
          </div>
          <div className="cashReceiptBtn grayBtn roundBtn">
            <img src={groupTicket} alt="groupTicket" />
            <div>단체당 1매</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamTicketSelectModal;