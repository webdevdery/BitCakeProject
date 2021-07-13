import React from "react";
import AuthorMeta from "../../components/AuthorMeta";
import Card from "../../components/Card";
import Paginator from "../../components/Paginator";
import Collection from "../../components/Collection";
import "./style.css";
const author = {avatar:"assets/img/avatars/avatar.jpg",authorName:'Adam Zapel',nickName:'@aaarthur', code:"XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh", text:'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary', followers:3829};
const cards = [
  {
    type:'image',
    image: "assets/img/cover/cover1.jpg",
    time: 900,
    title: "Walking on Air",
    avatar: "assets/img/avatars/avatar5.jpg",
    nickName: "@nickname",
    currentPrice: 4.89,
    verified:true,
    likes: 189,
  },
  {
    type:'video',
    image: ["assets/img/cover/cover3.jpg","assets/img/cover/cover3.jpg","assets/img/cover/cover3.jpg"],
    time: 300,
    title: "Flowers in Concrete (Modal)",
    avatar: "assets/img/avatars/avatar15.jpg",
    nickName: "@min1max",
    currentPrice: 3.19,
    verified:false,
    likes: 37,
  },
  {
    type:'image',
    image: "assets/img/cover/cover2.jpg",
    time: 3600,
    title: "Les Immortels, the Treachery of Artificial Shadows",
    avatar: "assets/img/avatars/avatar3.jpg",
    nickName: "@neo",
    currentPrice: 2.61,
    verified:false,
    likes: 702,
  },
  {
    type:'image',
    image: "assets/img/cover/cover3.jpg",
    time: 300,
    title: "Flowers in Concrete (Modal)",
    avatar: "assets/img/avatars/avatar15.jpg",
    nickName: "@min1max",
    currentPrice: 3.19,
    verified:true,
    likes: 37,
  },
  {
    type:'video',
    image: "assets/img/cover/cover3.jpg",
    time: 900,
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
    time: 3600,
    title: "Flowers in Concrete (Modal)",
    avatar: "assets/img/avatars/avatar15.jpg",
    nickName: "@min1max",
    currentPrice: 3.19,
    verified:true,
    likes: 37,
  }
];
const collections = [
  {bgimage:'assets/img/bg/bg-small.png',avatar:'assets/img/avatars/avatar3.jpg',name:'Hashmasks',number:'ERC-721',verified:true},
  {bgimage:'assets/img/bg/bg-small.png',avatar:'assets/img/avatars/avatar3.jpg',name:'Hashmasks',number:'ERC-721',verified:true},
  {bgimage:'assets/img/bg/bg-small.png',avatar:'assets/img/avatars/avatar3.jpg',name:'Hashmasks',number:'ERC-721',verified:false},
  {bgimage:'assets/img/bg/bg-small.png',avatar:'assets/img/avatars/avatar3.jpg',name:'Hashmasks',number:'ERC-721',verified:true},
  {bgimage:'assets/img/bg/bg-small.png',avatar:'assets/img/avatars/avatar3.jpg',name:'Hashmasks',number:'ERC-721',verified:false},
  {bgimage:'assets/img/bg/bg-small.png',avatar:'assets/img/avatars/avatar3.jpg',name:'Hashmasks',number:'ERC-721',verified:true},
  {bgimage:'assets/img/bg/bg-small.png',avatar:'assets/img/avatars/avatar3.jpg',name:'Hashmasks',number:'ERC-721',verified:true},
];
function CollectionPage() {
  return (
  <main className="main">
		<div className="main__author" data-bg="assets/img/bg/bg.png"></div>
		<div className="container">
			<div className="row row--grid">
				<div className="col-12 col-xl-3">
          <div className="author author--page">
            <AuthorMeta data={author}/>
          </div>
				</div>

				<div className="col-12 col-xl-9">
					<div className="row row--grid">
							{cards.map((card,index)=>(
                <div className="col-12 col-sm-6 col-lg-4"  key={`card-${index}`}>
                  <Card data={card}/>
                </div>
              ))}
					</div>

					{/* paginator */}
					<Paginator/>
					{/* end paginator */}
				</div>
			</div>

			{/* collections */}
			<section className="row row--grid">
				{/* title */}
				<div className="col-12">
					<div className="main__title">
						<h2>Hot collections</h2>
					</div>
				</div>
				{/* end title */}

				{/* carousel */}
				<div className="col-12">
					<div className="main__carousel-wrap">
						<div className="main__carousel main__carousel--collections owl-carousel" id="collections">
							{collections.map((collection,index)=>(
                  <Collection data={collection} key={`collection-${index}`}/>
              ))}   
						</div>

						<button className="main__nav main__nav--prev" data-nav="#collections" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"/></svg></button>
						<button className="main__nav main__nav--next" data-nav="#collections" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"/></svg></button>
					</div>
				</div>
				{/* end carousel */}
			</section>
			{/* end collections */}
		</div>
	</main>
  );
}
export default CollectionPage;