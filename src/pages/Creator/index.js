import React, { useState, useEffect, useCallback } from "react";
import AuthorMeta from "components/AuthorMeta";
import Card from "components/Card";
import Paginator from "components/Paginator";
import Filter from "components/Filter";
import Activity from "components/Activity";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { firestore, storage } from "../../firebase";
import { updateProfile } from "reducers/actions/userAction";
import { useWeb3React } from "@web3-react/core";
import Axios from "axios";
import { useParams } from "react-router-dom";

const activityData = [
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "list",
    nickName: "@Nickname",
    bnbPrice: 0.049,
    timeAgo: 4,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "purchase",
    nickName: "@johndoe",
    bnbPrice: 0.011,
    timeAgo: 21,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "transfer",
    fromName: "@johndoe",
    toName: "@Nickname",
    timeAgo: 21,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "offer",
    nickName: "@johndoe",
    bnbPrice: 0.011,
    timeAgo: 23,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "like",
    nickName: "@johndoe",
    timeAgo: 23,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "start",
    nickName: "@johndoe",
    timeAgo: 23,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "list",
    nickName: "@Nickname",
    bnbPrice: 0.049,
    timeAgo: 4,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "purchase",
    nickName: "@johndoe",
    bnbPrice: 0.011,
    timeAgo: 21,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "transfer",
    fromName: "@johndoe",
    toName: "@Nickname",
    timeAgo: 21,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "offer",
    nickName: "@johndoe",
    bnbPrice: 0.011,
    timeAgo: 23,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "like",
    nickName: "@johndoe",
    timeAgo: 23,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "start",
    nickName: "@johndoe",
    timeAgo: 23,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "transfer",
    fromName: "@johndoe",
    toName: "@Nickname",
    timeAgo: 21,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "offer",
    nickName: "@johndoe",
    bnbPrice: 0.011,
    timeAgo: 23,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "like",
    nickName: "@johndoe",
    timeAgo: 23,
  },
  {
    cover: "assets/img/cover/cover1.jpg",
    title: "Walking on Air",
    method: "start",
    nickName: "@johndoe",
    timeAgo: 23,
  },
];
function AuthorPage() {
  const { id } = useParams();
  const author = {
    avatar: "/assets/img/avatars/avatar.jpg",
    authorName: "",
    nickName: "",
    email: "",
    code: "XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh",
    text: "NFT collector from Los Angeles, CA. I love sports memorabilia, particularly baseball cards and autographs.",
    followers: 3829,
  };
  const { library, active, account } = useWeb3React();
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("/assets/img/avatars/avatar.jpg");
  const [file, setFile] = useState(null);
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [cards, setCards] = useState([]);
  const [uid, setUid] = useState("");
  const [createdCards, setCreatedCards] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((auth) => {
      if (auth) {
        // setEmail(auth.email);
        setUid(auth.uid);
      }
    });
    getProfile(id);
  }, [id]);

  const getProfile = async (id) => {
    let userProfile = (
      await firestore.collection("users").doc(id).get()
    ).data();
    if (!userProfile)
      userProfile = {
        avatar: "/assets/img/avatars/avatar.jpg",
        firstName: "",
        lastName: "",
        nickName: "",
        bio: "",
        email: "",
      }
    setEmail(userProfile.email)
    setUser(userProfile);
    updateProfile(userProfile)
    resetProfile(userProfile)
  };
  const getNFTList = async () => {
    console.log('get nft list')
    const res = await firestore.collection("nfts").get()
    let lists = []
    let createdLists = []
    for (let i = 0; i < res.docs.length; i++)
    {
      let doc = res.docs[i].data()
      if (doc.ownerId === id || doc.creatorId === id) {
        const nftInfo = await Axios.get(doc.tokenURI);
        if(doc.ownerId === id)
          lists.push({ id: res.docs[i].id, ...user, ...doc, ...nftInfo.data })
        if(doc.creatorId === id)
          createdLists.push({ id: res.docs[i].id, ...user, ...doc, ...nftInfo.data })
      }
    }
    setCards(lists)
    setCreatedCards(createdLists)
  }

  useEffect(() => {
    getNFTList()
  }, [account])
  
  const saveProfile = async () => {
    if (!firstName || !lastName || !nickName || !bio) {
      toast.error("Please input required fields");
    }
    if (avatar !== user.avatar && file) {
      const uploadTask = await storage.ref(`/avatars/${uid}`).put(file);
      if (uploadTask.state === "success") {
        const imgUrl = await uploadTask.ref.getDownloadURL();
        const author = {
          avatar: imgUrl || "/assets/img/avatars/avatar.jpg",
          firstName,
          lastName,
          nickName,
          email,
          bio,
        };
        firestore
          .collection("users")
          .doc(uid)
          .set(author)
          .then(() => {
            toast.success("Update profile");
          })
          .catch((err) => {
            toast.error("Update failed.");
          });
      } else {
        toast.error("Uploading avatar failed.");
      }
    }
  };

  const updateAvatar = useCallback((e) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (event) => {
      const target = event.target;
      const files = target.files;
      const file = files[0];
      setFile(file);
      setAvatar(URL.createObjectURL(file));
    };
    input.click();
  }, []);
  const resetProfile = (data) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setAvatar(data.avatar);
    setNickName(data.nickName);
    setBio(data.bio);
    setEmail(data.email);
  };

  return (
    <main className="main">
      <div className="main__author" data-bg="assets/img/bg/bg.png"></div>
      <div className="container">
        <div className="row row--grid">
          <div className="col-12 col-xl-3">
            <div className="author author--page">
              <AuthorMeta data={user} code={account} />
            </div>
          </div>

          <div className="col-12 col-xl-9">
            <div className="profile">
              {/* tabs nav */}
              <ul
                className="nav nav-tabs profile__tabs"
                id="profile__tabs"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#tab-0"
                    role="tab"
                    aria-controls="tab-0"
                    aria-selected="true"
                  >
                    My NFTs
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab-1"
                    role="tab"
                    aria-controls="tab-1"
                    aria-selected="true"
                  >
                    On Sale
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab-2"
                    role="tab"
                    aria-controls="tab-2"
                    aria-selected="false"
                  >
                    Created
                  </a>
                </li>

                {id === uid &&
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tab-4"
                      role="tab"
                      aria-controls="tab-4"
                      aria-selected="false"
                    >
                      Settings
                    </a>
                  </li>
                }
              </ul>
              {/* end tabs nav */}
            </div>

            {/* content tabs */}
            <div className="tab-content">
              <div
                className="tab-pane fade"
                id="tab-1"
                role="tabpanel"
              >
                <div className="row row--grid">
                  {cards.filter(x=>x.isSale).map(
                    (card, index) =>
                      index < 6 && (
                        <div
                          className="col-12 col-sm-6 col-lg-4"
                          key={`card-${index}`}
                        >
                          <Card data={card} />
                        </div>
                      )
                  )}
                </div>

                {/* collapse */}
                <div className="row row--grid collapse" id="collapsemore">
                  {cards.filter(x=>x.isSale).map(
                    (card, index) =>
                      index >= 6 && (
                        <div
                          className="col-12 col-sm-6 col-lg-4"
                          key={`card-${index}`}
                        >
                          <Card data={card} />
                        </div>
                      )
                  )}
                </div>
                <div className="row row--grid">
                  <div className="col-12">
                    <button
                      className="main__load"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapsemore"
                      aria-expanded="false"
                      aria-controls="collapsemore"
                    >
                      Load more
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade show active"
                id="tab-0"
                role="tabpanel"
              >
                <div className="row row--grid">
                  {cards.map(
                    (card, index) =>
                      index < 6 && (
                        <div
                          className="col-12 col-sm-6 col-lg-4"
                          key={`card-${index}`}
                        >
                          <Card data={card} />
                        </div>
                      )
                  )}
                </div>

                {/* collapse */}
                <div className="row row--grid collapse" id="collapsemore1">
                  {cards.map(
                    (card, index) =>
                      index >= 6 && (
                        <div
                          className="col-12 col-sm-6 col-lg-4"
                          key={`card-${index}`}
                        >
                          <Card data={card} />
                        </div>
                      )
                  )}
                </div>
                <div className="row row--grid">
                  <div className="col-12">
                    <button
                      className="main__load"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapsemore1"
                      aria-expanded="false"
                      aria-controls="collapsemore1"
                    >
                      Load more
                    </button>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="tab-2" role="tabpanel">
                <div className="row row--grid">
                  {createdCards.map((card, index) => (
                    <div
                      className="col-12 col-sm-6 col-lg-4"
                      key={`card-${index}`}
                    >
                      <Card data={card} />
                    </div>
                  ))}
                </div>

                {/* paginator */}
                <Paginator />
                {/* end paginator */}
              </div>

              <div className="tab-pane fade" id="tab-4" role="tabpanel">
                <div className="row row--grid">
                  {/* details form */}
                  <div className="col-12 col-lg-6">
                    <form action="#" className="sign__form sign__form--profile">
                      <div className="row">
                        <div className="col-12 sign__avatar">
                          <img src={avatar} alt="" onClick={updateAvatar} />
                        </div>
                        <div className="col-12">
                          <h4 className="sign__title">Profile details</h4>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="sign__group">
                            <label className="sign__label" htmlFor="firstname">
                              First name
                            </label>
                            <input
                              id="firstname"
                              type="text"
                              name="firstname"
                              className="sign__input"
                              placeholder="John"
                              value={firstName || ""}
                              onChange={(e) => {
                                setFirstName(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="sign__group">
                            <label className="sign__label" htmlFor="lastname">
                              Last name
                            </label>
                            <input
                              id="lastname"
                              type="text"
                              name="lastname"
                              className="sign__input"
                              placeholder="Doe"
                              value={lastName || ""}
                              onChange={(e) => {
                                setLastName(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="sign__group">
                            <label className="sign__label" htmlFor="nickName">
                              NickName
                            </label>
                            <input
                              id="nickName"
                              type="text"
                              name="nickName"
                              className="sign__input"
                              placeholder="@mario"
                              value={nickName || ""}
                              onChange={(e) => {
                                setNickName(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-12 ol-md-6 col-lg-12 col-xl-6">
                          <div className="sign__group">
                            <label className="sign__label" htmlFor="email">
                              Email
                            </label>
                            <input
                              id="email"
                              type="text"
                              name="email"
                              value={email}
                              className="sign__input"
                              placeholder="email@email.com"
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="col-12 ol-md-6 col-lg-12 col-xl-12">
                          <div className="sign__group">
                            <label className="sign__label" htmlFor="bio">
                              Bio
                            </label>
                            <textarea
                              id="bio"
                              type="text"
                              name="bio"
                              className="sign__textarea"
                              placeholder="Type your bio"
                              value={bio || ""}
                              onChange={(e) => {
                                setBio(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            className="sign__btn"
                            type="button"
                            onClick={saveProfile}
                          >
                            Save
                          </button>
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
                            <label className="sign__label" htmlFor="oldpass">
                              Old password
                            </label>
                            <input
                              id="oldpass"
                              type="password"
                              name="oldpass"
                              className="sign__input"
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                          <div className="sign__group">
                            <label className="sign__label" htmlFor="newpass">
                              New password
                            </label>
                            <input
                              id="newpass"
                              type="password"
                              name="newpass"
                              className="sign__input"
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                          <div className="sign__group">
                            <label
                              className="sign__label"
                              htmlFor="confirmpass"
                            >
                              Confirm new password
                            </label>
                            <input
                              id="confirmpass"
                              type="password"
                              name="confirmpass"
                              className="sign__input"
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                          <div className="sign__group">
                            <label className="sign__label" htmlFor="select">
                              Select
                            </label>
                            <select
                              name="select"
                              id="select"
                              className="sign__select"
                            >
                              <option value="0">Option</option>
                              <option value="1">Option 2</option>
                              <option value="2">Option 3</option>
                              <option value="3">Option 4</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-12">
                          <button className="sign__btn" type="button">
                            Change
                          </button>
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
