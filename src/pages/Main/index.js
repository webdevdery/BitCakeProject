import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import SellerList from "../../components/SellerList";
import { firestore } from "../../firebase";

import "styles/main.css";
import axios from "axios";

function Main() {
  const [userLists, setUserLists] = useState([]);
  const [sellerLists, setSellerLists] = useState([]);
  const [nfts, setNfts] = useState([]);

  const getNFTLists = async () => {
    const nfts = await firestore.collection("nfts").get();
    let user_nfts = [];
    let nfts_list = [];
    for (let i = 0; i < nfts.docs.length; i++) {
      const x = nfts.docs[i];
      const temp = x.data();
      const tt = (await axios.get(temp.tokenURI)).data;
      if (!user_nfts[temp.creatorId]) user_nfts[temp.creatorId] = [];
      const ite = { id: x.id, ...temp, ...tt };
      user_nfts[temp.creatorId].push(ite);
      nfts_list.push(ite);
    }
    setNfts(nfts_list);
    console.log(nfts_list.filter((x) => x.isSale && x.saleType !== "fix"));
    let temp = Object.keys(user_nfts).map((x) => ({
      id: x,
      nfts: user_nfts[x],
    }));
    const users = temp.sort((a, b) => {
      return b.nfts.length - a.nfts.length;
    });
    setUserLists(users);
    let users_info = [];
    const users_ids = users.map((x) => x.id);
    for (let i = 0; i < users_ids.length; i++) {
      const user_info = (
        await firestore.collection("users").doc(users_ids[i]).get()
      ).data();
      users_info.push({
        ...user_info,
        verified: true,
        currentPrice: users[i].nfts.length,
      });
    }
    setSellerLists(users_info);
  };
  useEffect(() => {
    getNFTLists();
  }, []);
  return (
    <main className="main">
      {/* <!-- home --> */}
      <div className="home">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="home__content">
                <h1 className="home__title">
                  Discover digital assets minted and secured <br />
                  on the Binance Smart Chain
                </h1>
                <p className="home__text">
                  It’s free to list your digital collectibles on the sweetest
                  NFT marketplace in the universe.
                  <br />
                </p>

                <div className="home__btns">
                  <a href="/explore" className="home__btn home__btn--clr">
                    Explore
                  </a>
                  <a href="/signin" className="home__btn grey">
                    Create
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end home --> */}

      <div className="container">
        {/* <!-- live auctions --> */}
        <section className="row row--grid">
          {/* <!-- title --> */}
          <div className="col-12">
            <div className="main__title">
              <h2>
                <a href="/explore">Live auctions</a>
              </h2>
            </div>
          </div>
          {/* <!-- end title --> */}

          {/* <!-- carousel --> */}
          <div className="col-12">
            <div className="main__carousel-wrap  my__caro">
              <div className="main__carousel my__card">
                {nfts
                  .filter((x) => x.isSale && x.saleType !== "fix")
                  .map(
                    (card, index) =>
                      index < 4 && <Card data={card} key={`card-${index}`} />
                  )}
              </div>
              <button
                className="main__nav main__nav--prev"
                data-nav="#live"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z" />
                </svg>
              </button>
              <button
                className="main__nav main__nav--next"
                data-nav="#live"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z" />
                </svg>
              </button>
            </div>
          </div>
          {/* <!-- end carousel --> */}
        </section>
        {/* <!-- end live auctions --> */}

        {/* <!-- top sellers --> */}
        <section className="row row--grid">
          {/* <!-- title --> */}
          <div className="col-12">
            <div className="main__title">
              <h2>Top creators</h2>

              <a href="/creators" className="main__link">
                View all{" "}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z" />
                </svg>
              </a>
            </div>
          </div>
          {/* <!-- end title --> */}

          {/* <!-- sellers list --> */}
          <div className="col-12">
            <ul className="sellers-list">
              {sellerLists.map((data, index) => (
                <SellerList key={`seller-${index}`} data={data} index={index} />
              ))}
            </ul>
          </div>
          {/* <!-- end sellers list --> */}
        </section>
        {/* <!-- end top sellers --> */}
        {/* <!-- Explorer--> */}
        <section className="row row--grid">
          {/* <!-- title --> */}
          <div className="col-12">
            <div className="main__title">
              <h2>
                <a href="/explore">Explorer</a>
              </h2>
            </div>
          </div>
          {/* <!-- end title --> */}

          {/* <!-- carousel --> */}
          <div className="col-12">
            <div className="main__carousel-wrap  my__caro">
              <div className="main__carousel my__card">
                {nfts
                  .filter((x) => x.isSale && x.saleType === "fix")
                  .map(
                    (card, index) =>
                      index < 4 && <Card data={card} key={`card-${index}`} />
                  )}
              </div>
              <button
                className="main__nav main__nav--prev"
                data-nav="#live"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z" />
                </svg>
              </button>
              <button
                className="main__nav main__nav--next"
                data-nav="#live"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z" />
                </svg>
              </button>
            </div>
          </div>
          {/* <!-- end carousel --> */}
        </section>
        {/* <!-- end live auctions --> */}

        {/* <!-- get started --> */}
        <div className="row row--grid">
          {/* <!-- title --> */}
          <div className="col-12">
            <div className="main__title main__title--border-top">
              <h2>Get started creating & selling your Digital Collectibles.</h2>
            </div>
          </div>
          {/* <!-- end title --> */}

          <div className="col-12 col-md-6 col-lg-4 col-xl-3">
            <div className="feature">
              <span className="feature__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19,7H18V6a3,3,0,0,0-3-3H5A3,3,0,0,0,2,6H2V18a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V10A3,3,0,0,0,19,7ZM5,5H15a1,1,0,0,1,1,1V7H5A1,1,0,0,1,5,5ZM20,15H19a1,1,0,0,1,0-2h1Zm0-4H19a3,3,0,0,0,0,6h1v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V8.83A3,3,0,0,0,5,9H19a1,1,0,0,1,1,1Z" />
                </svg>
              </span>
              <h3 className="feature__title">Set up your wallet</h3>
              <p className="feature__text">
                Once you’ve set up your crypto wallet of choice, connect it to
                the BitCake marketplace
                <br />
                <a href="/signin">Connect my wallet</a>.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4 col-xl-3">
            <div className="feature">
              <span className="feature__icon feature__icon--green">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M10,13H4a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,19H5V15H9ZM20,3H14a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM19,9H15V5h4Zm1,7H18V14a1,1,0,0,0-2,0v2H14a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2ZM10,3H4A1,1,0,0,0,3,4v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,9H5V5H9Z" />
                </svg>
              </span>
              <h3 className="feature__title">Create your collection</h3>
              <p className="feature__text">
                Click Create and set up your collection. Add social links, a
                description, profile & banner images, and set a secondary sales
                fee.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4 col-xl-3">
            <div className="feature">
              <span className="feature__icon feature__icon--purple">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.71,6.29a1,1,0,0,0-1.42,0L20,7.59V2a1,1,0,0,0-2,0V7.59l-1.29-1.3a1,1,0,0,0-1.42,1.42l3,3a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l3-3A1,1,0,0,0,22.71,6.29ZM19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h8a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21Z" />
                </svg>
              </span>
              <h3 className="feature__title">Add Your Collectible</h3>
              <p className="feature__text">
                Upload your work, add a title and description, and customize
                your NFTs with properties, stats, and unlockable content.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4 col-xl-3">
            <div className="feature feature--last">
              <span className="feature__icon feature__icon--red">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M15,12a1,1,0,1,0,1-1A1,1,0,0,0,15,12Zm6.71-.71-5-5A1,1,0,0,0,16,6H5A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3H16a1,1,0,0,0,.71-.29l5-5A1,1,0,0,0,21.71,11.29ZM15.59,16H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8H15.59l4,4Z" />
                </svg>
              </span>
              <h3 className="feature__title">List them for sale</h3>
              <p className="feature__text">
                Choose between auctions, fixed-price listings, and
                declining-price listings. You choose how you want to sell your
                NFTs, and we help you sell them!
              </p>
            </div>
          </div>
        </div>
        {/* <!-- end get started --> */}
      </div>
    </main>
  );
}

export default Main;
