import React from "react";
import { Typography, Divider, Grid, IconButton, Tooltip } from "@mui/material";
import { Box, Container } from "@mui/system";
import { api } from "../lib/Api";
import AddGift from "./AddGift";
import Searchfield from "./Searchfield";
import DeleteIcon from "@mui/icons-material/Delete";

export default class Gift extends React.Component {
  state = {
    gifts: [],
    results: [],
    search: "",
    id: "",
  };

  async componentDidMount() {
    const gifts = await api.getGifts();
    this.setState({ ...this.state, gifts, results: this.state.gifts });
  }

  search(event) {
    const search = event.target.value;
    let results = this.state.gifts;
    if (search.length > 0) {
      results = this.state.gifts.filter((p) => {
        return p.content.toLowerCase().includes(search.toLowerCase());
      });
    }
    this.setState({ ...this.state, search, results });
  }

  async delete(event) {
    await api.deleteGift(this.state.id);
    window.location.reload(true);
  }

  render() {
    return (
      <Container>
        <AddGift />
        <br />
        <Searchfield
          value={this.state.search}
          onChange={(e) => this.search(e)}
        />
        <br />
        {this.state.results.map((i, index) => (
          <Box
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              backgroundColor: "white",
              margin: "20px",
              borderRadius: "7px",
              display: "inline-block",
            }}
            key={index}
          >
            <Box
              sx={{
                my: 3,
                mx: 2,
              }}
            >
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h6" component="div">
                    {i.content}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h6" component="div">
                    {i.prix}€
                    <Tooltip title="Double clic pour supprimer">
                      <IconButton
                        style={{ color: "#cb0e0e" }}
                        aria-label="delete"
                        component="label"
                        onClick={(e) => {
                          this.setState({ id: i.id });
                          this.delete(i);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </Grid>
              </Grid>
              <Divider variant="middle" />
              <Typography color="text.secondary" variant="body2">
                Pour {i.personne}
              </Typography>
            </Box>
          </Box>
        ))}
      </Container>
    );
  }
}
