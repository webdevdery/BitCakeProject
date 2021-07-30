import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEagerConnect } from "hooks/useEagerConnect";
import { useInactiveListener } from "hooks/useInactiveListener";

import Dropdown from "../Dropdown";
import Connect from "../Connect";

import "styles/header.css";
import { shortenHex } from "utils/helpers";
import EthBalance from "components/EthBalance";
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [97],
});

function Header(props) {
  const [open, setOpen] = useState(false);
  // const user = useSelector((state) => state.user);


  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    console.log("closing modal...");
    setOpen(false);
  };

  const { activate, connector, account } = useWeb3React();

  const connectWallet = () => {
    activate(injectedConnector);
  };
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);
  // mount only once or face issues :P
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <a href="/">
            <img src="assets/img/logo.svg" alt="" />
          </a>
        </div>

        <form className="header__search">
          <input
            type="text"
            placeholder="Search items, collections, and creators"
          />
          <button type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
            </svg>
          </button>
          <button type="button" className="close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
            </svg>
          </button>
        </form>

        <div className="header__menu">
          <ul className="header__nav">
            <li className="header__nav-item">
              <a className="header__nav-link" href="/">
                Home
              </a>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" href="/explore">
                Explore
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/activity" className="header__nav-link">
                Activity
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/create" className="header__nav-link">
                Create
              </a>
            </li>
            <li className="header__nav-item">
              <a
                className="header__nav-link"
                href="#/"
                role="button"
                id="dropdownMenu1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Resources{" "}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z" />
                </svg>
              </a>
              <ul
                className="dropdown-menu header__nav-menu"
                aria-labelledby="dropdownMenu1"
              >
                <li>
                  <a
                    href="assets/terms/BitCakeWhitePaper.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    BitCake
                    <br />
                    (BCK) White Paper
                  </a>
                </li>
                <li>
                  <a
                    href="assets/terms/BitCakeTermsOfService.pdf"
                    target="_blank"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="https://cakeshoplabs.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Design an NFT
                  </a>
                </li>
                <li>
                  <a
                    href=" https://t.me/bitcakeclub"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Telegram Community
                  </a>
                </li>
                <li>
                  <a
                    href="assets/terms/BitCakeStrategicPartners.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Become a Partner
                  </a>
                </li>
                <li>
                  <a href="/contacts" target="_blank">
                    Contact Us
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="header__actions">
          <div className="header__action header__action--search">
            <button className="header__action-btn" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
              </svg>
            </button>
          </div>
          {props.authenticated ? (
            <Dropdown />
          ) : (
            <div className="header__action header__action--signin">
              <a
                className="header__action-btn header__action-btn--signin"
                href="/signin"
              >
                <span>Sign in</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20,12a1,1,0,0,0-1-1H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H19A1,1,0,0,0,20,12ZM17,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16a1,1,0,0,0-2,0v3a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,17,2Z" />
                </svg>
              </a>
            </div>
          )}
          <div className="header__action header__action--signin">
            <a
              className="header__action-btn"
              href="/"
              onClick={handleClickOpen}
            >
              {!account ?
                <span style={{border:'1px solid blue', borderRadius:20, padding:'5px 10px'}}>
                  Connet Wallet
                </span>
                :
                <div>
                  <div style={{display:'inline-flex'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M19,7H18V6a3,3,0,0,0-3-3H5A3,3,0,0,0,2,6H2V18a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V10A3,3,0,0,0,19,7ZM5,5H15a1,1,0,0,1,1,1V7H5A1,1,0,0,1,5,5ZM20,15H19a1,1,0,0,1,0-2h1Zm0-4H19a3,3,0,0,0,0,6h1v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V8.83A3,3,0,0,0,5,9H19a1,1,0,0,1,1,1Z" />
                    </svg>
                  <span>{shortenHex(account, 4)}</span>
                  </div>
                    {/* <EthBalance /> */}
                </div>
              }
            </a>
          </div>
        </div>

        <button className="header__btn" type="button">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <Connect
        open={open}
        onClose={handleClose}
        connectWallet={connectWallet}
      />
    </header>
  );
}

export default Header;
