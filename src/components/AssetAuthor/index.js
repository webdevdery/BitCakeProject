import React from "react";
import "./style.css";
function Item(props) {
  const {creatorAvatar, authorName, collectionAvatar, collectionTitle} = props.data;
  return (
    <ul className="asset__authors">
      <li>
        <span>Creator</span>
        <div className="asset__author asset__author--verified">
          <img src={creatorAvatar} alt=""/>
          <a href="/creator">{authorName}</a>
        </div>
      </li>
      <li>
        <span>Collection</span>
        <div className="asset__author ">
          <img src={collectionAvatar} alt=""/>
          <a href="/collection">{collectionTitle}</a>
        </div>
      </li>
    </ul>
  );
}

export default Item;
