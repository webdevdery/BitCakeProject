import React from "react";
import {Link} from "react-router-dom";
import './style.css';
function SellerList(props) {
  const rank = props.index;
  const {image,nickName,currentPrice,verified} = props.data;
  return (
    <li>
      <span className="sellers-list__number">{rank+1}</span>
      <div className={`sellers-list__author ${verified? 'sellers-list__author--verified':''}`}>
        <img src={image} alt="" />
        <Link to="/author">{nickName}</Link>
        <span>{currentPrice} BNB</span>
      </div>
    </li>
  );
}

export default SellerList;
