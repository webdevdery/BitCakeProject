import React from "react";
import { Link } from "react-router-dom";
import AuthorMeta from "../../components/AuthorMeta";
import Card from "../../components/Card";
import Paginator from "../../components/Paginator";
import Filter from "../../components/Filter";
import Activity from "../../components/Activity";
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
const activityData=[
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"list", nickName:"@Nickname", bnbPrice:0.049, timeAgo:4},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"purchase", nickName:"@johndoe",bnbPrice:0.011, timeAgo:21},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"transfer", fromName:"@johndoe", toName:"@Nickname", timeAgo:21},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"offer",nickName:"@johndoe", bnbPrice:0.011, timeAgo:23},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"like",nickName:"@johndoe", timeAgo:23},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"start",nickName:"@johndoe", timeAgo:23},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"list", nickName:"@Nickname", bnbPrice:0.049, timeAgo:4},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"purchase", nickName:"@johndoe",bnbPrice:0.011, timeAgo:21},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"transfer", fromName:"@johndoe", toName:"@Nickname", timeAgo:21},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"offer",nickName:"@johndoe", bnbPrice:0.011, timeAgo:23},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"like",nickName:"@johndoe", timeAgo:23},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"start",nickName:"@johndoe", timeAgo:23},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"transfer", fromName:"@johndoe", toName:"@Nickname", timeAgo:21},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"offer",nickName:"@johndoe", bnbPrice:0.011, timeAgo:23},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"like",nickName:"@johndoe", timeAgo:23},
  {cover:"assets/img/cover/cover1.jpg", title:"Walking on Air", method:"start",nickName:"@johndoe", timeAgo:23}
];
function AuthorPage() {
  const author = {avatar:"assets/img/avatars/avatar.jpg",authorName:'Adam Zapel',nickName:'@aaarthur', code:"XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh", 
  text:'NFT collector from Los Angeles, CA. I love sports memorabilia, particularly baseball cards and autographs.', followers:3829};
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
              <div className="profile">
                {/* tabs nav */}
                <ul className="nav nav-tabs profile__tabs" id="profile__tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">On Sale</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">Created</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">My Activity</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4" aria-selected="false">Settings</a>
                  </li>
                </ul>
                {/* end tabs nav */}
              </div>

              {/* content tabs */}
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tab-1" role="tabpanel">
                  <div className="row row--grid">
                    {cards.map((card,index)=>(
                      index < 6 &&
                      <div className="col-12 col-sm-6 col-lg-4" key={`card-${index}`}>
                        <Card data={card}/>
                      </div>
                    ))}                     
                  </div>

                  {/* collapse */}
                  <div className="row row--grid collapse" id="collapsemore">
                    {cards.map((card,index)=>(
                      index >= 6 &&
                      <div className="col-12 col-sm-6 col-lg-4" key={`card-${index}`}>
                        <Card data={card}/>
                      </div>
                    ))}   
                  </div>
                  <div className="row row--grid">
                    <div className="col-12">
                      <button className="main__load" type="button" data-toggle="collapse" data-target="#collapsemore" aria-expanded="false" aria-controls="collapsemore">Load more</button>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="tab-2" role="tabpanel">
                  <div className="row row--grid">
                    {cards.map((card,index)=>(
                      <div className="col-12 col-sm-6 col-lg-4" key={`card-${index}`}>
                        <Card data={card}/>
                      </div>
                    ))} 
                  </div>

                  {/* paginator */}
                  <Paginator/>
                  {/* end paginator */}
                </div>

                <div className="tab-pane fade" id="tab-3" role="tabpanel">
                  <div className="row">
                    {/* sidebar */}
                    <div className="col-12 col-xl-4 order-xl-2">
                      <div className="filter-wrap">
                        <button className="filter-wrap__btn" type="button" data-toggle="collapse" data-target="#collapseFilter" aria-expanded="false" aria-controls="collapseFilter">Open filter</button>

                        <div className="collapse filter-wrap__content" id="collapseFilter">
                          {/* filter */}
                          <Filter/>
                          {/* end filter */}
                        </div>
                      </div>
                    </div>
                    {/* end sidebar */}

                    {/* content */}
                    <div className="col-12 col-xl-8 order-xl-1">
                      <div className="row row--grid">                        
                        {activityData.map((activity,index)=>(
                        index < 8 &&
                          <div className="col-12 col-lg-6 col-xl-12" key={`activity-${index}`}>
                            <Activity data={activity}/>
                          </div>
                        ))}   
                      </div>                     

                      {/* collapse */}
                      <div className="row row--grid collapse" id="collapsemore1">
                        <div className="col-12 col-lg-6 col-xl-12">
                          {activityData.map((activity,index)=>(
                            index >= 8 &&
                              <div className="col-12 col-lg-6 col-xl-12" key={`activity-${index}`}>
                                <Activity data={activity}/>
                              </div>
                            ))}   
                        </div>
                      </div>

                      <div className="row row--grid">
                        <div className="col-12">
                          <button className="main__load" type="button" data-toggle="collapse" data-target="#collapsemore1" aria-expanded="false" aria-controls="collapsemore1">Load more</button>
                        </div>
                      </div>
                      {/* end collapse */}
                    </div>
                    {/* end content */}
                  </div>
                </div>

                <div className="tab-pane fade" id="tab-4" role="tabpanel">
                  <div className="row row--grid">
                    {/* details form */}
                    <div className="col-12 col-lg-6">
                      <form action="#" className="sign__form sign__form--profile">
                        <div className="row">
                          <div className="col-12">
                            <h4 className="sign__title">Profile details</h4>
                          </div>

                          <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                              <label className="sign__label" for="username">Login</label>
                              <input id="username" type="text" name="username" className="sign__input" placeholder="User123"/>
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                              <label className="sign__label" for="email">Email</label>
                              <input id="email" type="text" name="email" className="sign__input" placeholder="email@email.com"/>
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                              <label className="sign__label" for="firstname">First name</label>
                              <input id="firstname" type="text" name="firstname" className="sign__input" placeholder="John"/>
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                              <label className="sign__label" for="lastname">Last name</label>
                              <input id="lastname" type="text" name="lastname" className="sign__input" placeholder="Doe"/>
                            </div>
                          </div>

                          <div className="col-12">
                            <button className="sign__btn" type="button">Save</button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* end details form */}

                    {/* password form */}
                    <div className="col-12 col-lg-6">
                      <form action="#" className="sign__form sign__form--profile">
                        <div className="row">
                          <div className="col-12">
                            <h4 className="sign__title">Change password</h4>
                          </div>

                          <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                              <label className="sign__label" for="oldpass">Old password</label>
                              <input id="oldpass" type="password" name="oldpass" className="sign__input"/>
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                              <label className="sign__label" for="newpass">New password</label>
                              <input id="newpass" type="password" name="newpass" className="sign__input"/>
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                              <label className="sign__label" for="confirmpass">Confirm new password</label>
                              <input id="confirmpass" type="password" name="confirmpass" className="sign__input"/>
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                              <label className="sign__label" for="select">Select</label>
                              <select name="select" id="select" className="sign__select">
                                <option value="0">Option</option>
                                <option value="1">Option 2</option>
                                <option value="2">Option 3</option>
                                <option value="3">Option 4</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-12">
                            <button className="sign__btn" type="button">Change</button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* end password form */}
                  </div>
                </div>
              </div>
              {/* end content tabs */}
            </div>
          </div>	
        </div>
      </main>
  );
}
export default AuthorPage;