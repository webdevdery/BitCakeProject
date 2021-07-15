import React from "react";
import "./style.css";
function Routes(props) {
   const {bgimage,avatar,name,number,verified}=props.data;
  return (
        <div className="collection">
            <a
            href="/collection"
            className="collection__cover"
            data-bg={bgimage}
            >&nbsp;</a>
            <div className="collection__meta">
            <a
                href="/creator"
                className={`collection__avatar ${verified?'collection__avatar--verified':''}`}
            >
                <img src={avatar} alt="" />
            </a>
            <h3 className="collection__name">
                <a href="/collection">{name}</a>
            </h3>
            <span className="collection__number">{number}</span>
            </div>
        </div>
  );
}

export default Routes;
