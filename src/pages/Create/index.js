import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import AuthorMeta from "../../components/AuthorMeta";
import NFTDropzone from "../../components/Dropzone";
import Switch from "react-switch";
import { firestore } from "../../firebase";
import { toast } from "react-toastify";
import { NFTStorage } from "nft.storage";
import { NFTStorageKey, FactoryAddress } from "../../constants/index";
import { auth } from "../../firebase";
import ipfs from "utils/ipfsApi.js";
import "styles/create.css";

const client = new NFTStorage({ token: NFTStorageKey });

const author = {
  avatar: "/assets/img/avatars/avatar.jpg",
  authorName: "Adam Zapel",
  nickName: "@aaarthur",
  code: "XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh",
  text: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary",
  followers: 3829,
};
function Create() {
  const [user, setUser] = useState({});
  const [type, setType] = useState("audio");
  const [file, setFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);
  const [category, setCategory] = useState("art");
  const [isattach, setisattach] = useState(false);
  const [attachfile, setattachfile] = useState(null);
  const [name, setName] = useState("");
  const [royalties, setRoyalties] = useState("1");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [saleType, setSaleType] = useState("fix");
  const [auctionLength, setAuctionLength] = useState("12");
  const [buffer, setBuffer] = useState(null);
  const [bgBuffer, setBgBuffer] = useState(null);
  const [attachBuffer, setAttachBuffer] = useState(null);
  const [isCreateProcess, setCreateProcess] = useState(false);
  const [isSale, setIsSale] = useState(false);

  const { library, active, account } = useWeb3React();
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        getProfile(user);
      }
    });
  }, []);

  const getProfile = async (user) => {
    let userProfile = (
      await firestore.collection("users").doc(user.uid).get()
    ).data();
    const temp = { id: user.uid, email: user.email, ...userProfile };
    setUser(temp);
  };

  const getFile = (file, isAttach = false) => {
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      if (!isAttach) setBuffer(binaryStr);
      else setAttachBuffer(binaryStr);
    };
    reader.readAsArrayBuffer(file);
  };
  const getBgFile = (file) => {
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      setBgBuffer(binaryStr);
    };
    reader.readAsArrayBuffer(file);
  };

  const createNFT = async () => {
    try {
      await library
        .getSigner(account)
        .signMessage("Please check this account is yours");
      if (account) {
        setCreateProcess(true);
        const result = await ipfs.files.add(Buffer.from(buffer));
        const imgBg = bgFile ? await ipfs.files.add(Buffer.from(bgBuffer)) : null;
        const imgAttach = attachfile
          ? await ipfs.files.add(Buffer.from(attachBuffer))
          : null;
        const cid = await client.storeDirectory([
          new File(
            [
              JSON.stringify({
                name: name,
                description: description,
                creator: account,
                type,
                category,
                royalties: parseInt(royalties) * 5,
                image: `https://ipfs.io/ipfs/${result[0].hash}`,
                imageAttach: imgAttach
                  ? `https://ipfs.io/ipfs/${imgAttach[0].hash}`
                  : null,
                imageBg: imgBg ? `https://ipfs.io/ipfs/${imgBg[0].hash}` : null,
              }),
            ],
            "metadata.json"
          ),
        ]);
        if (cid) {
          const tokenURI = `https://ipfs.io/ipfs/${cid}/metadata.json`;
          firestore
            .collection("nfts")
            .doc()
            .set({
              tokenId: 0,
              tokenURI,
              ownerId: user.id,
              creatorId: user.id,
              owner: account,
              creator: account,
              price,
              isSale,
              saleType,
              auctionLength: saleType !== "fix" ? parseInt(auctionLength) : 0,
              time: saleType !== "fix" ? Date.now() + 3600 * 1000 * parseInt(auctionLength) : 0,
              likes: 0,
            })
            .then(() => {
              toast.success("Create NFT");
              history.push(`/creator/${user.id}`);
              setCreateProcess(false);
            })
            .catch((err) => {
              toast.error("Create failed.");
              console.log(err);
              setCreateProcess(false);
            });
        } else {
          toast.error("Uploading failed");
          setCreateProcess(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="main">
      <div className="main__author" data-bg="assets/img/home/bg.gif">
        <img src={user.imageCover} width="100%" height="100%" alt="" />
      </div>
      <div className="container">
        <div className="row row--grid">
          <div className="col-12 col-xl-3">
            <div className="author author--page">
              <AuthorMeta data={user} code={account} />
            </div>
          </div>
          <div className="col-12 col-xl-9">
            {/* title */}
            <div className="main__title main__title--create">
              <h2>Create and List an item for sale</h2>
            </div>
            {/* end title */}

            {/* create form */}
            <form action="#" className="sign__form sign__form--create">
              <div className="row">
                <div className="col-12">
                  <div className="sign__group">
                    <label className="sign__label" htmlFor="type">
                      NFT Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      className="sign__select"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                      <option value="image">Image</option>
                    </select>
                  </div>
                </div>

                <div className="col-12">
                  <label className="sign__label" htmlFor="files">
                    Upload file
                  </label>
                </div>

                {type === "audio" ? (
                  <div className="nftdropzone">
                    <NFTDropzone
                      nftType="Audio"
                      onChange={(newfile) => {
                        setFile(newfile);
                        getFile(newfile);
                      }}
                    />
                    <NFTDropzone
                      nftType="image"
                      onChange={(newfile) => {
                        setBgFile(newfile);
                        getBgFile(newfile);
                      }}
                    />
                  </div>
                ) : type === "video" ? (
                  <div className="nftdropzone">
                    <NFTDropzone
                      nftType="Video"
                      onChange={(newfile) => {
                        setFile(newfile);
                        getFile(newfile);
                      }}
                    />
                  </div>
                ) : type === "image" ? (
                  <div className="nftdropzone">
                    <NFTDropzone
                      nftType="image"
                      onChange={(newfile) => {
                        setFile(newfile);
                        getFile(newfile);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}

                <div className="col-12 pt-3">
                  <div className="sign__group filter__checkboxes">
                    <input
                      id="private"
                      type="checkbox"
                      name="private"
                      checked={isattach}
                      onChange={() => {
                        setisattach(!isattach);
                      }}
                    />
                    <label className="sign__label" htmlFor="private">
                      Attach a private file/unlockable content?
                    </label>
                  </div>
                </div>

                {isattach && (
                  <div className="nftdropzone">
                    <NFTDropzone
                      nftType={"all"}
                      onChange={(newfile) => {
                        getFile(newfile, true);
                        setattachfile(newfile);
                      }}
                    />
                  </div>
                )}

                <div className="col-12">
                  <div className="sign__group">
                    <label className="sign__label" htmlFor="category">
                      Select Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="sign__select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="art">Art</option>
                      <option value="music">Music</option>
                      <option value="film">Film</option>
                      <option value="sports">Sports</option>
                      <option value="education">Education</option>
                      <option value="photography">Photography</option>
                      <option value="games">Games</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="col-12">
                  <div className="sign__group">
                    <label className="sign__label" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      className="sign__input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="sign__group">
                    <label className="sign__label" htmlFor="royalties">
                      Royalties
                    </label>
                    <select
                      id="royalties"
                      name="royalties"
                      className="sign__select"
                      value={royalties}
                      onChange={(e) => setRoyalties(e.target.value)}
                    >
                      <option value="1">5%</option>
                      <option value="2">10%</option>
                      <option value="4">20%</option>
                    </select>
                  </div>
                </div>

                <div className="col-12">
                  <div className="sign__group">
                    <label className="sign__label" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="sign__textarea"
                      placeholder="e.g. ‘After purchasing, you will receive…’"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-12">
                  <h4 className="sign__title">Price and type</h4>
                </div>

                <div className="col-12">
                  <div className="sign__group">
                    <select
                      id="saleType"
                      name="saleType"
                      className="sign__select"
                      value={saleType}
                      onChange={(e) => setSaleType(e.target.value)}
                    >
                      <option value="fix">Fixed</option>
                      <option value="auction">Auction</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="sign__group">
                    <div className="col-9">
                      <label className="sign__title" htmlFor="price">
                        {saleType !== "fix" ? "Starting Bid " : ""}Price - in
                        "BNB"
                      </label>
                    </div>
                    <div className="col-3">
                      <label className="sign__title" htmlFor="sale">
                        Sale
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        name="price"
                        className="sign__input"
                        placeholder=""
                      />
                    </div>
                    <div className="col-3">
                      <Switch
                        onChange={() => {
                          setIsSale(!isSale);
                        }}
                        checked={isSale}
                        height={26}
                      />
                    </div>

                    <label className="sign__label" htmlFor="price">
                      Price in USD: ${price * 300}
                    </label>

                    <label className="sign__label" htmlFor="price">
                      current BNB price: 1 BNB = $300
                    </label>
                  </div>
                </div>
                {saleType !== "fix" && (
                  <div className="col-12">
                    <div className="sign__group">
                      <label className="sign__label" htmlFor="length">
                        Auction Length
                      </label>
                      <select
                        id="length"
                        name="length"
                        className="sign__select"
                        value={auctionLength}
                        onChange={(e) => setAuctionLength(e.target.value)}
                      >
                        <option value="12">12 hours</option>
                        <option value="24">24 hours</option>
                        <option value="48">2 days</option>
                        <option value="72">3 days</option>
                        <option value="168">7 days</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="col-12">
                  <button
                    type="button"
                    className="col-12 col-xl-3 sign__btn"
                    onClick={createNFT}
                    disabled={isCreateProcess}
                  >
                    Create item
                  </button>
                </div>
              </div>
            </form>
            {/* end create form */}
          </div>
        </div>
      </div>
    </main>
  );
}
export default Create;
