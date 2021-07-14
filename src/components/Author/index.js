import React from "react";
import "./style.css";
function Author(props) {
  const {bgImage,avatar, authorName,nickName, text, followers} = props.data;
  return (
    <div class="author">
      <a href="/creator" class="author__cover author__cover--bg" data-bg={bgImage}>
      </a>
      <div class="author__meta">
        <a href="/creator" class="author__avatar author__avatar--verified">
          <img src={avatar} alt=""/>
        </a>
        <h3 class="author__name"><a href="/creator">{authorName}</a></h3>
        <h3 class="author__nickname"><a href="/creator">{nickName}</a></h3>
        <p class="author__text">{text}</p>
        <div class="author__wrap">
          <div class="author__followers">
            <p>{followers}</p>
            <span>Followers</span>
          </div>
          <button class="author__follow" type="button">Follow</button>
        </div>
      </div>
    </div>
  );
}
export default Author;