import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import AssetItem from "../../components/AssetItem";
import AssetAuthor from "../../components/AssetAuthor";
import Tabs from "./Tabs";
import Card from "../../components/Card";
import "./style.css";
const breadcrumb = [
	{title:"Home",page:'/'},
	{title:"Explorer",page:"/explorer"},
];
const author = {creatorAvatar:"assets/img/avatars/avatar5.jpg", authorName:'@midinh', collectionAvatar:"assets/img/avatars/avatar9.jpg", collectionTitle:'The Meta Key'}
const historyData = [
  {avatar:"assets/img/avatars/avatar10.jpg", bnbPrice:11.0, timeAgo:4, nickName:'@erikkk', verified:true},
  {avatar:"assets/img/avatars/avatar10.jpg", bnbPrice:11.0, timeAgo:4, nickName:'@erikkk', verified:true},
  {avatar:"assets/img/avatars/avatar10.jpg", bnbPrice:11.0, timeAgo:4, nickName:'@erikkk', verified:true},
  {avatar:"assets/img/avatars/avatar10.jpg", bnbPrice:11.0, timeAgo:4, nickName:'@erikkk', verified:true},
  {avatar:"assets/img/avatars/avatar10.jpg", bnbPrice:11.0, timeAgo:4, nickName:'@erikkk', verified:true},
  {avatar:"assets/img/avatars/avatar10.jpg", bnbPrice:11.0, timeAgo:4, nickName:'@erikkk', verified:true},
  {avatar:"assets/img/avatars/avatar10.jpg", bnbPrice:11.0, timeAgo:4, nickName:'@erikkk', verified:true},
];
const bidsData = [
  {avatar:"assets/img/avatars/avatar10.jpg", bnbPrice:11.0, timeAgo:4, nickName:'@erikkk', verified:true},
  {avatar:"assets/img/avatars/avatar10.jpg", bnbPrice:11.0, timeAgo:4, nickName:'@erikkk', verified:true},
  {avatar:"assets/img/avatars/avatar10.jpg", bnbPrice:11.0, timeAgo:4, nickName:'@erikkk', verified:true},
];
const detail =[{avatar:"assets/img/avatars/avatar5.jpg", authorName:'@midinh', createdYear:2021}];
const assetCards = [
  {
    type:'image',
    image: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    avatar: "assets/img/avatars/avatar5.jpg",
    nickName: "@nickname",
    currentPrice: 4.89,
    verified:true,
    likes: 189,
  },
  {
    type:'image',
    image: "assets/img/cover/cover2.jpg",
    title: "Les Immortels, the Treachery of Artificial Shadows",
    avatar: "assets/img/avatars/avatar3.jpg",
    nickName: "@neo",
    currentPrice: 2.61,
    verified:false,
    likes: 702,
  },
  {
    type:'video',
    image: "assets/img/cover/cover3.jpg",
    title: "Flowers in Concrete (Modal)",
    avatar: "assets/img/avatars/avatar15.jpg",
    nickName: "@min1max",
    currentPrice: 3.19,
    verified:true,
    likes: 37,
  },
  {
    type:'media',
    image: "assets/img/cover/cover3.jpg",
    title: "Flowers in Concrete (Modal)",
    avatar: "assets/img/avatars/avatar15.jpg",
    nickName: "@min1max",
    currentPrice: 3.19,
    verified:true,
    likes: 37,
  },
  {
    type:'image',
    image: "assets/img/cover/cover3.jpg",
    title: "Flowers in Concrete (Modal)",
    avatar: "assets/img/avatars/avatar15.jpg",
    nickName: "@min1max",
    currentPrice: 3.19,
    verified:true,
    likes: 37,
  },
  {
    type:'media',
    image: "assets/img/cover/cover3.jpg",
    title: "Flowers in Concrete (Modal)",
    avatar: "assets/img/avatars/avatar15.jpg",
    nickName: "@min1max",
    currentPrice: 3.19,
    verified:false,
    likes: 37,
  },
];
function Item() {
  return (
    <main className="main">
      <div className="container">
        <div className="row row--grid">
          {/* <!-- breadcrumb --> */}
          <BreadCrumb data={breadcrumb}/>
          {/* <!-- end breadcrumb --> */}

          <div className="col-12">
            <div className="main__title main__title--page">
              <h1>Exclusive digital asset</h1>
            </div>
          </div>
        </div>

        <div className="row">
          {/* <!-- content --> */}
          <div className="col-12 col-xl-8">
            <AssetItem image="assets/img/cover/cover-big.jpg"/>
          </div>
          {/* <!-- end content --> */}

          {/* <!-- sidebar --> */}
          <div className="col-12 col-xl-4">
            <div className="asset__info">
              <div className="asset__desc">
                <h2>Description</h2>
                <p>
                  This is a description of an NFT collectible. it can be sports card, music 
                  single, full length documentary, a blockbuster movie or a cool modern art piece.
                </p>
              </div>

              <AssetAuthor data={author}/>

              {/* <!-- tabs --> */}
              <Tabs historyData={historyData} bidsData={bidsData} detail={detail}/>
              {/* <!-- end tabs --> */}

              <div className="asset__wrap">
                <div className="asset__timer">
                  <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.3,8.59l.91-.9a1,1,0,0,0-1.42-1.42l-.9.91a8,8,0,0,0-9.79,0l-.91-.92A1,1,0,0,0,4.77,7.69l.92.91A7.92,7.92,0,0,0,4,13.5,8,8,0,1,0,18.3,8.59ZM12,19.5a6,6,0,1,1,6-6A6,6,0,0,1,12,19.5Zm-2-15h4a1,1,0,0,0,0-2H10a1,1,0,0,0,0,2Zm3,6a1,1,0,0,0-2,0v1.89a1.5,1.5,0,1,0,2,0Z"/></svg> Auction ends in</span>
                  <div className="asset__clock"></div>
                </div>

                <div className="asset__price">
                  <span>Minimum bid</span>
                  <span>0.2 BNB</span>
                </div>
              </div>

              {/* <!-- actions --> */}
              <div className="asset__btns">
                <a href="#modal-bid" className="asset__btn asset__btn--full asset__btn--clr open-modal">Place a bid</a>
              </div>
              {/* <!-- end actions --> */}

            </div>
          </div>
          {/* <!-- end sidebar --> */}
        </div>

        {/* <!-- explore --> */}
        <section className="row row--grid">
          {/* <!-- title --> */}
          <div className="col-12">
            <div className="main__title main__title--border-top">
              <h2><a href="/explore">You May Also Like</a></h2>
            </div>
          </div>
          {/* <!-- end title --> */}

          {/* <!-- carousel --> */}
          <div className="col-12">
            <div className="main__carousel-wrap">
              <div className="main__carousel main__carousel--explore owl-carousel" id="explore">                
                {assetCards.map((card,index)=>(
                  <Card data={card} key={`explore-${index}`}/>
                ))}
              </div>

              <button className="main__nav main__nav--prev" data-nav="#explore" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"/></svg></button>
              <button className="main__nav main__nav--next" data-nav="#explore" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"/></svg></button>
            </div>
          </div>
          {/* <!-- end carousel --> */}
        </section>
        {/* <!-- end explore --> */}
      </div>
      	<div id="modal-bid" className="zoom-anim-dialog mfp-hide modal modal--form">
          <button className="modal__close" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg></button>
          <h4 className="sign__title">Place a bid</h4>
          <div className="sign__group sign__group--row">
            <label className="sign__label" for="placebid">Your bid</label>
            <input id="placebid" type="text" name="placebid" className="sign__input"/>
            <span className="sign__text sign__text--small">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.</span>
          </div>
          <button className="sign__btn" type="button">Take a bid</button>
        </div>
    </main>
  );
}

export default Item;
