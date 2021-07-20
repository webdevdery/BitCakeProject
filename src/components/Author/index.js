import React from "react";
import "./style.css";
function Author(props) {
  const { bgImage, avatar, authorName, nickName, text, followers } = props.data;
  return (
    <div className="author">
      <a
        href="/creator"
        className="author__cover author__cover--bg"
        data-bg={bgImage}
      ></a>
      <div className="author__meta">
        <a href="/creator" className="author__avatar author__avatar--verified">
          <img src={avatar} alt="" />
        </a>
        <h3 className="author__name">
          <a href="/creator">{authorName}</a>
        </h3>
        <h3 className="author__nickname">
          <a href="/creator">{nickName}</a>
        </h3>
        <p className="author__text">{text}</p>
        <div className="author__wrap">
          <div className="author__followers">
            <p>{followers}</p>
            <span>Followers</span>
          </div>
          <button className="author__follow" type="button">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
export default Author;
