import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
function Card(props) {
  const{
      type,
      image,
      time,
      title,
      avatar,
      nickName,
      currentPrice,
      verified,
      likes,
    } = props.data;
  return (
    <div className="card">
      {typeof(image)==='string'? <a href="/item" className={`card__cover ${type==="video"?'card__cover--video':''}`}>
        <img src={image} alt="" />
        {type==='video' && 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.53,7.15a1,1,0,0,0-1,0L17,8.89A3,3,0,0,0,14,6H5A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3h9a3,3,0,0,0,3-2.89l3.56,1.78A1,1,0,0,0,21,17a1,1,0,0,0,.53-.15A1,1,0,0,0,22,16V8A1,1,0,0,0,21.53,7.15ZM15,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8h9a1,1,0,0,1,1,1Zm5-.62-3-1.5V11.12l3-1.5Z"/></svg>}
        {!(time==undefined)&&(time>=480 && time<=750)? <span className="card__time">15 minutes left</span> : 
        <span className="card__time card__time--clock">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M8.46777,8.39453l-.00225.00183-.00214.00208ZM18.42188,8.208a1.237,1.237,0,0,0-.23-.17481.99959.99959,0,0,0-1.39941.41114,5.78155,5.78155,0,0,1-1.398,1.77734,8.6636,8.6636,0,0,0,.1333-1.50977,8.71407,8.71407,0,0,0-4.40039-7.582,1.00009,1.00009,0,0,0-1.49121.80567A7.017,7.017,0,0,1,7.165,6.87793l-.23047.1875a8.51269,8.51269,0,0,0-1.9873,1.8623A8.98348,8.98348,0,0,0,8.60254,22.83594.99942.99942,0,0,0,9.98,21.91016a1.04987,1.04987,0,0,0-.0498-.3125,6.977,6.977,0,0,1-.18995-2.58106,9.004,9.004,0,0,0,4.3125,4.0166.997.997,0,0,0,.71534.03809A8.99474,8.99474,0,0,0,18.42188,8.208ZM14.51709,21.03906a6.964,6.964,0,0,1-3.57666-4.40234,8.90781,8.90781,0,0,1-.17969-.96387,1.00025,1.00025,0,0,0-.79931-.84473A.982.982,0,0,0,9.77,14.80957a.99955.99955,0,0,0-.8667.501,8.9586,8.9586,0,0,0-1.20557,4.71777,6.98547,6.98547,0,0,1-1.17529-9.86816,6.55463,6.55463,0,0,1,1.562-1.458.74507.74507,0,0,0,.07422-.05469s.29669-.24548.30683-.2511a8.96766,8.96766,0,0,0,2.89874-4.63269,6.73625,6.73625,0,0,1,1.38623,8.08789,1.00024,1.00024,0,0,0,1.18359,1.418,7.85568,7.85568,0,0,0,3.86231-2.6875,7.00072,7.00072,0,0,1-3.2793,10.457Z" />
          </svg>
          <span className="card__clock card__clock--1"></span>
        </span>}
                    
        {time == undefined && (time < 750 && time<=3600 )&&  <span className="card__time">an hour left</span>}
      </a>:
      <div className="card__cover card__cover--carousel owl-carousel">
        {image.map((path,index)=>(
          <img src={path} alt="" key={`image-${index}`}/>
        ))}
      </div>}
      <h3 className="card__title">
        <a href="/item">{title}</a>
      </h3>
    <div className={`card__author ${verified?'card__author--verified':''}`}>
        <img src={avatar} alt="" />
        <a href="/creator">{nickName}</a>
      </div>
      <div className="card__info">
        <div className="card__price">
          <span>Current price</span>
          <span>{currentPrice} BNB</span>
        </div>

        <button className="card__likes" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" />
          </svg>
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
}

export default Card;
