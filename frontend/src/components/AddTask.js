import { Button, Divider, Snackbar, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { api } from "../lib/Api";
import "../css/add.css";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class AddTask extends React.Component {
  state = {
    content: "",
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
      <div id="task">
        {this.state.confirmation}
        <form onSubmit={(e) => this.submit(e)}>
          <Container>
            <Divider textAlign="left" style={{ margin: "40px 0px" }}>
              Tâche
            </Divider>
            Nom :
            <TextField
              value={this.state.content}
              onChange={(e) => this.updateContent(e)}
              variant="outlined"
              sx={{ padding: "0px 0px 0px 10px" }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ margin: "7px 0px 0px 10px" }}
              onClick={this.handleClick}
            >
              Créer une tâche
            </Button>
            <Divider style={{ margin: "50px 0px" }} />
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
            La tâche a été créée !
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

  async submit(e) {
    e.preventDefault();
    await api.createTask(this.state.content);
    this.setState({ ...this.state, confirmation: true });
    window.location.reload(true);
  }
}
