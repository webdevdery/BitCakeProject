import React from "react";
import "./style.css";
function Author(props) {
  const {bgImage,avatar, authorName,nickName, text, followers} = props.data;
  return (
    <div class="author">
      <a href="/author" class="author__cover author__cover--bg" data-bg={bgImage}>
      </a>
      <div class="author__meta">
        <a href="/author" class="author__avatar author__avatar--verified">
          <img src={avatar} alt=""/>
        </a>
        <h3 class="author__name"><a href="/author">{authorName}</a></h3>
        <h3 class="author__nickname"><a href="/author">{nickName}</a></h3>
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