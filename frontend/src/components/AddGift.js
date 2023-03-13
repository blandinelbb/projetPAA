import { Button, Divider, Snackbar, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { api } from "../lib/Api";
import "../css/add.css";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default class AddGift extends React.Component {
  state = {
    content: "",
    personne: "",
    prix: "",
    listes: [],
    confirmation: false,
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    return (
      <div id="gift">
        {this.state.confirmation}
        <form onSubmit={(e) => this.submit(e)}>
          <Container>
            <Divider textAlign="left" style={{ margin: "40px 0px" }}>
              Cadeaux
            </Divider>
            Idée cadeau :
            <TextField
              value={this.state.content}
              onChange={(e) => this.updateContent(e)}
              variant="outlined"
              sx={{ padding: "0px 15px 0px 10px" }}
            />
            Pour :
            <TextField
              value={this.state.personne}
              onChange={(e) => this.updatePersonne(e)}
              variant="outlined"
              sx={{ padding: "0px 15px 0px 10px" }}
            />
            Prix :
            <TextField
              value={this.state.prix}
              onChange={(e) => this.updatePrix(e)}
              variant="outlined"
              sx={{ padding: "0px 0px 0px 10px" }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ margin: "7px 0px 0px 10px" }}
              onClick={this.handleClick}
            >
              Ajouter
            </Button>
            <Divider style={{ margin: "50px 0px 20px 0px" }} />
          </Container>
        </form>
        <Snackbar
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert
            onClose={this.handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            L'idée cadeau a bien été ajoutée à la liste!
          </Alert>
        </Snackbar>
      </div>
    );
  }

  updateContent(event) {
    this.setState({
      ...this.state,
      content: event.target.value,
      confirmation: false,
    });
  }
  updatePersonne(event) {
    this.setState({
      ...this.state,
      personne: event.target.value,
      confirmation: false,
    });
  }
  updatePrix(event) {
    this.setState({
      ...this.state,
      prix: event.target.value,
      confirmation: false,
    });
  }
  async submit(e) {
    e.preventDefault();
    await api.createGift(
      this.state.content,
      this.state.personne,
      this.state.prix
    );
    this.setState({ ...this.state, confirmation: true });
    window.location.reload(true);
  }
}
