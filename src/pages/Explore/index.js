import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Filter from "../../components/ExploreFilter";
import Card from "../../components/Card";
import Paginator from "../../components/Paginator";
const breadCrumb = [
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
const tabs=[
  {href:"#tab-1",control:"tab-2", title:"All"},
  {href:"#tab-2",control:"tab-2", title:"Art"},
  {href:"#tab-3",control:"tab-3", title:"Music"},
  {href:"#tab-4",control:"tab-4", title:"Film"},
  {href:"#tab-5",control:"tab-5", title:"Sports"},
  {href:"#tab-6",control:"tab-6", title:"Education"},
  {href:"#tab-7",control:"tab-7", title:"Photography"},
  {href:"#tab-8",control:"tab-8", title:"Games"},
  {href:"#tab-9",control:"tab-9", title:"Other"},
];
function Explore() {
  return (
		<main className="main">
				<div className="container">
					<div className="row row--grid">
						<BreadCrumb data={breadCrumb}/>
						<div className="col-12">
							<div className="main__title main__title--page">
								<h1>Explore exclusive digital assets</h1>
							</div>
						</div>
            <div className="col-12">
              <ul className="nav nav-tabs main__tabs" id="main__tabs" role="tablist">
                {tabs.map((tab,index)=>(
                <li className="nav-item" key={`tab-${index}`}>
                  <a className={`nav-link ${index===0?'active':''}`} data-toggle="tab" href={tab.href} role="tab" aria-controls={tab.control} aria-selected="true">{tab.title}</a>
                </li>))}
              </ul>
            </div>
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
