import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import AuthorMeta from "components/AuthorMeta";
import NFTDropzone from "components/Dropzone";
import Switch from "react-switch";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router-dom";

import { firestore } from "firebase.js";
import { toast } from "react-toastify";
import { NFTStorage } from "nft.storage";
import ipfs from "utils/ipfsApi.js";
import { NFTStorageKey } from "constants/index";

import "styles/create.css";

const client = new NFTStorage({ token: NFTStorageKey });

const author = {
  avatar: "assets/img/avatars/avatar.jpg",
  authorName: "Adam Zapel",
  nickName: "@aaarthur",
  code: "XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh",
  text: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary",
  followers: 3829,
};
const categories = [
  { id: 1, name: "Audio" },
  { id: 2, name: "Video" },
  { id: 3, name: "Digital Art" },
];
function Create() {
  const history = useHistory();
  const collectionList = ["Music", "Art", "Video", "Audio"];
  const [currencyType, setCurrencyType] = useState(true);
  const [price, setPrice] = useState(0);
  const [royalties, setRoyalties] = useState("1");
  const [description, setDescription] = useState("");
  const [saleType, setSaleType] = useState("fix");
  const [auctionLength, setAuctionLength] = useState("12");
  const [type, setType] = useState("image");
  const [file, setFile] = useState(null);
  const [collectionfile, setcollectionfile] = useState();
  const [name, setName] = useState("");

  const [isattach, setisattach] = useState(false);
  const [attachfile, setattachfile] = useState();
  const [category, setCategory] = useState("audio");
  const [buffer, setBuffer] = useState(null);
  const [attachBuffer, setAttachBuffer] = useState(null);

  const { active, account } = useWeb3React();

  const handleSelect = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };
  const bnbRate = 300;
  const handleChange = () => {
    console.log("true");
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
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
  const [isCreateProcess, setCreateProcess] = useState(false);

  const createNFT = async () => {
    if (active) {
      setCreateProcess(true);
      const result = await ipfs.files.add(Buffer.from(buffer));
      const imgAttach = attachfile
        ? await ipfs.files.add(Buffer.from(attachBuffer))
        : null;
      const cid = await client.storeDirectory([
        new File(
          [
            JSON.stringify({
              title: name,
              description: description,
              creator: account,
              type,
              category,
              royalties: parseInt(royalties) * 5,
              image: `https://ipfs.io/ipfs/${result[0].hash}`,
              imageAttach: imgAttach
                ? `https://ipfs.io/ipfs/${imgAttach[0].hash}`
                : null,
            }),
          ],
          "metadata.json"
        ),
      ]);
      console.log("/upload task", cid);
      if (cid) {
        const tokenURI = `https://ipfs.io/ipfs/${cid}/metadata.json`;
        firestore
          .collection("nfts")
          .doc()
          .set({
            tokenId: 0,
            tokenURI,
            owner: account,
            creator: account,
            price,
            saleType,
            auctionLength: saleType === "auction" ? auctionLength : 0,
            likes: 0,
          })
          .then(() => {
            toast.success("Create NFT");
            history.push(`/creator/${account}`);
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
  };
  return (
    <main className="main">
      <div className="main__author"></div>
      <div className="container">
        <div className="row row--grid">
          <div className="col-12 col-xl-3">
            <div className="author author--page">
              <AuthorMeta data={author} />
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
                    <label className="sign__label" htmlFor="royalties">
                      Master Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="sign__select"
                      onChange={(e) => handleSelect(e)}
                    >
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                      <option value="image">Image</option>
                    </select>
                    {category === "audio" && (
                      <label className="sign__label">
                        Add an audio file and a preview image
                      </label>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <label className="sign__label" htmlFor="royalties">
                    Upload file
                  </label>
                </div>

                {category === "audio" ? (
                  <>
                    <div className="nftdropzone">
                      <NFTDropzone
                        nftType="Audio"
                        onChange={(newfile) => {
                          console.log("wewer");
                          setFile(newfile);
                          getFile(newfile);
                        }}
                      />
                      <NFTDropzone
                        nftType="image"
                        onChange={(newfile) => {
                          console.log("wewer");
                          setFile(newfile);
                          getFile(newfile);
                        }}
                      />
                    </div>
                  </>
                ) : category === "video" ? (
                  <div className="nftdropzone">
                    <NFTDropzone
                      nftType="Video"
                      onChange={(newfile) => {
                        console.log("wewer");
                        setFile(newfile);
                        getFile(newfile);
                      }}
                    />
                  </div>
                ) : category === "image" ? (
                  <div className="nftdropzone">
                    <NFTDropzone
                      nftType="image"
                      onChange={(newfile) => {
                        console.log("wewer");
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
                        setattachfile(newfile);
                      }}
                    />
                  </div>
                )}

                <div className="col-12">
                  <div className="sign__group">
                    <label className="sign__label" htmlFor="royalties">
                      Select Category
                    </label>
                    <select
                      id="subcategory"
                      name="subcategory"
                      className="sign__select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="1">Art</option>
                      <option value="2">Music</option>
                      <option value="3">Film</option>
                      <option value="4">Sports</option>
                      <option value="5">Education</option>
                      <option value="6">Photography</option>
                      <option value="7">Games</option>
                      <option value="8">Other</option>
                    </select>
                  </div>
                </div>

                <div className="col-12">
                  <div className="sign__group">
                    <CreatableSelect
                      isClearable
                      placeholder="Create or select collection"
                      onChange={handleChange}
                      options={collectionList}
                      className="sign__select cursor-pointer"
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="sign__group">
                    <label className="sign__label" htmlFor="listingtitle">
                      Listing title
                    </label>
                    <input
                      id="listingtitle"
                      type="text"
                      name="listingtitle"
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
                      <option value="3">20%</option>
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
                      placeholder="e. g. 'After purchasing you will able to recived...'"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <div className="filter__checkboxes">
                      <input
                        id="descriptioncheck"
                        type="checkbox"
                        name="descriptioncheck"
                        defaultChecked
                      />
                      <label htmlFor="descriptioncheck">
                        Transfer Copyright when purchased?
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <h4 className="sign__title">Price and type</h4>
                </div>

                <div className="col-12">
                  <div className="sign__group">
                    <select
                      name="royalties"
                      className="sign__select"
                      value={saleType}
                      onChange={(e) => setSaleType(e.target.value)}
                    >
                      <option value="1">Fixed</option>
                      <option value="2">Auction</option>
                      <option value="3">Auction with Buy Now</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="sign__group">
                    <label className="sign__label" htmlFor="tags">
                      Starting Bid Price - in {currencyType ? "BNB" : "USD"}
                    </label>
                    <div className="col-9">
                      <input
                        type="number"
                        onChange={(e) => handlePrice(e)}
                        name="price"
                        className="sign__input"
                        placeholder=""
                      />
                    </div>
                    <div className="col-3">
                      <Switch
                        onChange={() => {
                          setCurrencyType(!currencyType);
                        }}
                        checked={currencyType}
                        height={26}
                      />
                    </div>
                    {currencyType ? (
                      <>
                        <label className="sign__label" htmlFor="tags">
                          Price in BNB: {(price / bnbRate).toFixed(6)}
                        </label>
                      </>
                    ) : (
                      <>
                        <label className="sign__label" htmlFor="tags">
                          Price in USD: {(price * bnbRate).toFixed(6)}
                        </label>
                      </>
                    )}
                    <label className="sign__label" htmlFor="tags">
                      current BNB price: 1 ETH = $2476.96
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="sign__group">
                    <label className="sign__label" htmlFor="length">
                      Auction Length
                    </label>
                    <select id="length" name="length" className="sign__select">
                      <option value="1">12 hours</option>
                      <option value="2">24 hours</option>
                      <option value="3">2 days</option>
                      <option value="4">3 days</option>
                      <option value="5">7 days</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-xl-3">
                  <button
                    type="button"
                    className="sign__btn"
                    onClick={createNFT}
                    disabled={setCreateProcess}
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
