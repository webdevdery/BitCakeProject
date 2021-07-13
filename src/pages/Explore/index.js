import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Filter from "../../components/ExploreFilter";
import Card from "../../components/Card";
import Paginator from "../../components/Paginator";
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
						<Paginator />
					{/* <!-- end paginator --> */}
				</div>
			</main>
  );
}

export default Explore;
