import React from "react";
import BreadCrumb from "components/BreadCrumb";
import Filter from "./Filter";
import Author from "components/Author";
const breadCrumb = [
  { title: "Home", page: "/" },
  { title: "Creators", page: "/creators" },
];
const authors = [
  {
    bgImage: "assets/img/bg/bg-small.png",
    avatar: "assets/img/avatars/avatar.jpg",
    authorName: "Adam Zapel",
    nickName: "@aaarthur",
    text: "NFT collector from Los Angeles, CA. I love sports memorabilia, particularly baseball cards and autographs.",
    followers: 3829,
  },
  {
    bgImage: "assets/img/bg/bg-small.png",
    avatar: "assets/img/avatars/avatar.jpg",
    authorName: "Adam Zapel",
    nickName: "@aaarthur",
    text: "NFT collector from Los Angeles, CA. I love sports memorabilia, particularly baseball cards and autographs.",
    followers: 3829,
  },
  {
    bgImage: "assets/img/bg/bg-small.png",
    avatar: "assets/img/avatars/avatar.jpg",
    authorName: "Adam Zapel",
    nickName: "@aaarthur",
    text: "NFT collector from Los Angeles, CA. I love sports memorabilia, particularly baseball cards and autographs.",
    followers: 3829,
  },
  {
    bgImage: "assets/img/bg/bg-small.png",
    avatar: "assets/img/avatars/avatar.jpg",
    authorName: "Adam Zapel",
    nickName: "@aaarthur",
    text: "NFT collector from Los Angeles, CA. I love sports memorabilia, particularly baseball cards and autographs.",
    followers: 3829,
  },
  {
    bgImage: "assets/img/bg/bg-small.png",
    avatar: "assets/img/avatars/avatar.jpg",
    authorName: "Adam Zapel",
    nickName: "@aaarthur",
    text: "NFT collector from Los Angeles, CA. I love sports memorabilia, particularly baseball cards and autographs.",
    followers: 3829,
  },
  {
    bgImage: "assets/img/bg/bg-small.png",
    avatar: "assets/img/avatars/avatar.jpg",
    authorName: "Adam Zapel",
    nickName: "@aaarthur",
    text: "NFT collector from Los Angeles, CA. I love sports memorabilia, particularly baseball cards and autographs.",
    followers: 3829,
  },
  {
    bgImage: "assets/img/bg/bg-small.png",
    avatar: "assets/img/avatars/avatar.jpg",
    authorName: "Adam Zapel",
    nickName: "@aaarthur",
    text: "NFT collector from Los Angeles, CA. I love sports memorabilia, particularly baseball cards and autographs.",
    followers: 3829,
  },
  {
    bgImage: "assets/img/bg/bg-small.png",
    avatar: "assets/img/avatars/avatar.jpg",
    authorName: "Adam Zapel",
    nickName: "@aaarthur",
    text: "NFT collector from Los Angeles, CA. I love sports memorabilia, particularly baseball cards and autographs.",
    followers: 3829,
  },
];
function Authors() {
  return (
    <main className="main">
      <div className="container">
        <div className="row row--grid">
          {/* breadcrumb */}
          <BreadCrumb data={breadCrumb} />
          {/* end breadcrumb */}

          {/* title */}
          <div className="col-12">
            <div className="main__title main__title--page">
              <h1>Creators</h1>
            </div>
          </div>
          {/* end title */}
          <Filter />
        </div>

        {/* authors */}
        <div className="row row--grid">
          {authors.map((author, index) => (
            <div
              className="col-12 col-sm-6 col-lg-4 col-xl-3"
              key={`author-${index}`}
            >
              <Author data={author} />
            </div>
          ))}
        </div>
        {/* end authors */}

        {/* paginator */}
        <div className="row row--grid">
          <div className="col-12">
            <div className="paginator">
              <span className="paginator__pages">8 from 169</span>

              <ul className="paginator__list">
                <li>
                  <a href="/#">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z" />
                    </svg>
                  </a>
                </li>
                <li className="active">
                  <a href="/#">1</a>
                </li>
                <li>
                  <a href="/#">2</a>
                </li>
                <li>
                  <a href="/#">3</a>
                </li>
                <li>
                  <a href="/#">4</a>
                </li>
                <li>
                  <a href="/#">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* end paginator */}
      </div>
    </main>
  );
}
export default Authors;
