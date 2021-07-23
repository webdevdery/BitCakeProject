import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { grey } from "@material-ui/core/colors";

import { useWeb3React } from "@web3-react/core";
import { UnsupportedChainIdError } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEagerConnect } from "../../hooks/useEagerConnect";
import { useInactiveListener } from "../../hooks/useInactiveListener";

import metamask from "assets/img/wallets/metamask.svg";
import walletconnect from "assets/img/wallets/walletconnect.svg";

const useStyles = makeStyles({
  dialog: {
    backgroundColor: grey[800],
    padding: 20,
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  title: {
    backgroundColor: grey[800],
    color: grey[50],
    textAlign: "center",
  },
  list: {
    backgroundColor: grey[700],
    color: grey[50],
    padding: 20,
    minWidth: 300,
    marginTop: 20,
  },

  listText: {
    padding: 20,
    fontSize: 30,
  },
  avatar: {
    width: 70,
    height: 70,
  },
});

const providers = [
  {
    name: "MetaMask",
    avatar: metamask,
  },
  {
    name: "Wallet Connect",
    avatar: walletconnect,
  },
];
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [97],
});
function Connect(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const { error, chainId, account, library, activate, active, connector } =
    useWeb3React();
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;
  useEffect(() => {
    setWrongNetwork(isUnsupportedChainIdError);
  }, [isUnsupportedChainIdError]);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
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
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className={classes.title}>
        Select Wallet Provider
      </DialogTitle>
      <List className={classes.dialog}>
        {providers.map((provider) => (
          <ListItem
            button
            onClick={connectWallet}
            key={provider.name}
            className={classes.list}
          >
            <ListItemAvatar>
              <img
                src={provider.avatar}
                alt="wallet-avatar"
                className={classes.avatar}
              />
            </ListItemAvatar>
            <ListItemText
              className={classes.listText}
              primary={provider.name}
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default Connect;
