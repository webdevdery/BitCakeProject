import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import { grey } from "@material-ui/core/colors";
import { useWeb3React } from "@web3-react/core";

import { assets } from "utils/assets";
import { shortenHex } from "utils/helpers";

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
  disconnect: {
    display: "flex",
    justifyContent: "center",
  },
});

const providers = [
  {
    name: "MetaMask",
    avatar: assets.MetaMask,
  },
  // {
  //   name: "Wallet Connect",
  //   avatar: assets.WalletConnect,
  // },
];
let closeImg = {
  cursor: "pointer",
  float: "right",
  marginTop: "5px",
  width: "20px",
};

function Connect(props) {
  const classes = useStyles();
  const { open, onClose, connectWallet } = props;
  const { active, account } = useWeb3React();
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle className={classes.title}>
        <div>
          Select Wallet Provider
          <img
            src="https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png"
            style={closeImg}
            alt="close"
            onClick={onClose}
          />
        </div>
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
              secondary={
                <Typography type="subtitle2" style={{ color: "#FFFFFF" }}>
                  {provider.name === "MetaMask" &&
                    active &&
                    shortenHex(account, 5)}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default Connect;
