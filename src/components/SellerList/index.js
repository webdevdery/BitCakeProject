import React from "react";
import './style.css';
function SellerList(props) {
  const rank = props.index;
  const {image,nickName,currentPrice,verified} = props.data;
  return (
    <li>
      <span className="sellers-list__number">{rank+1}</span>
      <div className={`sellers-list__author ${verified? 'sellers-list__author--verified':''}`}>
        <img src={image} alt="" />
        <a href="/creator">{nickName}</a>
        <span>{currentPrice} BNB</span>
      </div>
    </li>
  );
}

export default SellerList;
