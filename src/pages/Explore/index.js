import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Filter from "../../components/Filter";
import Card from "../../components/Card";
const breadcrumb = [
	{title:"Home",page:'/'},
	{title:"Explorer",page:"/explorer"},
];
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
  },
  {
    type:'video',
    image: "assets/img/cover/cover3.jpg",
    time: 300,
    title: "Flowers in Concrete (Modal)",
    avatar: "assets/img/avatars/avatar15.jpg",
    nickName: "@min1max",
    currentPrice: 3.19,
    verified:false,
    likes: 37,
  },	
  {
    type:'video',
    image: "assets/img/cover/cover3.jpg",
    time: 300,
    title: "Flowers in Concrete (Modal)",
    avatar: "assets/img/avatars/avatar15.jpg",
    nickName: "@min1max",
    currentPrice: 3.19,
    verified:false,
    likes: 37,
  },	
];
function Explore() {
  return (
		<main className="main">
				<div className="container">
					<div className="row row--grid">
						<BreadCrumb data={breadcrumb}/>
						<div className="col-12">
							<div className="main__title main__title--page">
								<h1>Explore exclusive digital assets</h1>
							</div>
						</div>
						<Filter/>
					</div>

					<div className="row row--grid">						
						{cards.map((card,index)=>(
							<div className="col-12 col-sm-6 col-lg-4 col-xl-3"  key={`card-${index}`}>
								<Card data={card}/>
							</div>
						))} 						
					</div>

					{/* <!-- paginator --> */}
					<div className="row row--grid">
						<div className="col-12">
							<div className="paginator">
								<span className="paginator__pages">8 from 169</span>

								<ul className="paginator__list">
									<li>
										<a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"/></svg></a>
									</li>
									<li className="active"><a href="#">1</a></li>
									<li><a href="#">2</a></li>
									<li><a href="#">3</a></li>
									<li><a href="#">4</a></li>
									<li>
										<a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"/></svg></a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					{/* <!-- end paginator --> */}
				</div>
			</main>
  );
}

export default Explore;
