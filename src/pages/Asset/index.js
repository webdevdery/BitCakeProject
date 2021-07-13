import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import AssetItem from "../../components/AssetItem";
import AssetAuthor from "../../components/AssetAuthor";
import Tabs from "./Tabs";
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
                <h2>Descriptions</h2>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.</p>
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
              <h2><a href="explore.html">Other author assets</a></h2>
            </div>
          </div>
          {/* <!-- end title --> */}

          {/* <!-- carousel --> */}
          <div className="col-12">
            <div className="main__carousel-wrap">
              <div className="main__carousel main__carousel--explore owl-carousel" id="explore">
                <div className="card">
                  <a href="item.html" className="card__cover">
                    <img src="assets/img/cover/cover1.jpg" alt=""/>
                  </a>
                  <h3 className="card__title"><a href="item.html">Walking on Air</a></h3>
                  <div className="card__author">
                    <img src="assets/img/avatars/avatar5.jpg" alt=""/>
                    <a href="author.html">@midinh</a>
                  </div>
                  <div className="card__info">
                    <div className="card__price">
                      <span>Reserve price</span>
                      <span>4.89 BNB</span>
                    </div>
                    
                    <button className="card__likes" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"/></svg>
                      <span>189</span>
                    </button>
                  </div>
                </div>

                <div className="card">
                  <a href="item.html" className="card__cover">
                    <img src="assets/img/cover/cover2.jpg" alt=""/>
                  </a>
                  <h3 className="card__title"><a href="item.html">Les Immortels, the Treachery of Artificial Shadows</a></h3>
                  <div className="card__author card__author--verified">
                    <img src="assets/img/avatars/avatar5.jpg" alt=""/>
                    <a href="author.html">@midinh</a>
                  </div>
                  <div className="card__info">
                    <div className="card__price">
                      <span>Reserve price</span>
                      <span>2.61 BNB</span>
                    </div>
                    
                    <button className="card__likes" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"/></svg>
                      <span>702</span>
                    </button>
                  </div>
                </div>

                <div className="card">
                  <a href="item.html" className="card__cover">
                    <img src="assets/img/cover/cover3.jpg" alt=""/>
                  </a>
                  <h3 className="card__title"><a href="item.html">Flowers in Concrete</a></h3>
                  <div className="card__author">
                    <img src="assets/img/avatars/avatar5.jpg" alt=""/>
                    <a href="author.html">@midinh</a>
                  </div>
                  <div className="card__info">
                    <div className="card__price">
                      <span>Reserve price</span>
                      <span>3.19 BNB</span>
                    </div>
                    
                    <button className="card__likes card__likes--active" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"/></svg>
                      <span>37</span>
                    </button>
                  </div>
                </div>

                <div className="card">
                  <a href="item.html" className="card__cover">
                    <img src="assets/img/cover/cover4.jpg" alt=""/>
                  </a>
                  <h3 className="card__title"><a href="item.html">Industrial Revolution</a></h3>
                  <div className="card__author card__author--verified">
                    <img src="assets/img/avatars/avatar5.jpg" alt=""/>
                    <a href="author.html">@midinh</a>
                  </div>
                  <div className="card__info">
                    <div className="card__price">
                      <span>Reserve price</span>
                      <span>1.11 BNB</span>
                    </div>
                    
                    <button className="card__likes" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"/></svg>
                      <span>23</span>
                    </button>
                  </div>
                </div>

                <div className="card">
                  <a href="item.html" className="card__cover">
                    <img src="assets/img/cover/cover5.jpg" alt=""/>
                  </a>
                  <h3 className="card__title"><a href="item.html">I Love You</a></h3>
                  <div className="card__author card__author--verified">
                    <img src="assets/img/avatars/avatar5.jpg" alt=""/>
                    <a href="author.html">@midinh</a>
                  </div>
                  <div className="card__info">
                    <div className="card__price">
                      <span>Reserve price</span>
                      <span>0.99 BNB</span>
                    </div>
                    
                    <button className="card__likes" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"/></svg>
                      <span>358</span>
                    </button>
                  </div>
                </div>

                <div className="card">
                  <a href="item.html" className="card__cover card__cover--video">
                    <img src="assets/img/cover/cover6.jpg" alt=""/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.53,7.15a1,1,0,0,0-1,0L17,8.89A3,3,0,0,0,14,6H5A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3h9a3,3,0,0,0,3-2.89l3.56,1.78A1,1,0,0,0,21,17a1,1,0,0,0,.53-.15A1,1,0,0,0,22,16V8A1,1,0,0,0,21.53,7.15ZM15,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8h9a1,1,0,0,1,1,1Zm5-.62-3-1.5V11.12l3-1.5Z"/></svg>
                  </a>
                  <h3 className="card__title"><a href="item.html">Walking on Air</a></h3>
                  <div className="card__author">
                    <img src="assets/img/avatars/avatar5.jpg" alt=""/>
                    <a href="author.html">@midinh</a>
                  </div>
                  <div className="card__info">
                    <div className="card__price">
                      <span>Reserve price</span>
                      <span>1.63 BNB</span>
                    </div>
                    
                    <button className="card__likes" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"/></svg>
                      <span>90</span>
                    </button>
                  </div>
                </div>

                <div className="card">
                  <a href="item.html" className="card__cover">
                    <img src="assets/img/cover/cover7.jpg" alt=""/>
                  </a>
                  <h3 className="card__title"><a href="item.html">Tranquility</a></h3>
                  <div className="card__author">
                    <img src="assets/img/avatars/avatar5.jpg" alt=""/>
                    <a href="author.html">@midinh</a>
                  </div>
                  <div className="card__info">
                    <div className="card__price">
                      <span>Reserve price</span>
                      <span>2.55 BNB</span>
                    </div>
                    
                    <button className="card__likes" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"/></svg>
                      <span>64</span>
                    </button>
                  </div>
                </div>
              </div>

              <button className="main__nav main__nav--prev" data-nav="#explore" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"/></svg></button>
              <button className="main__nav main__nav--next" data-nav="#explore" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"/></svg></button>
            </div>
          </div>
          {/* <!-- end carousel --> */}
        </section>
        {/* <!-- end explore --> */}
      </div>
    </main>
  );
}

export default Item;
