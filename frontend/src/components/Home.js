import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import "../css/home.css";
import image1 from "../photo/toDo.jpg";
import image2 from "../photo/calendrier.jpg";
import image3 from "../photo/gift.jpg";
import image4 from "../photo/tirelire-cochon.avif";
import { Container } from "@mui/material";

export default function Home() {
  const links = [
    {
      link: "/taches",
      title: "Vos tâches",
      photo: image1,
      description: "Pour ceux qui ont la flemme de se rappeler de leur tâche",
    },
    {
      link: "/rdvs",
      title: "Vos rendez-vous",
      photo: image2,
      description: "Pour ce qui oublie leurs rendez-vous",
    },
    {
      link: "/gifts",
      title: "Listes de vos idées cadeaux",
      photo: image3,
      description: "Pour ceux qui ont toujours trop d'idées cadeaux",
    },
  ];

  return (
    <div>
      <h4 id="bienvenue">Bienvenue !</h4>
      <h4 id="description">Découvrez votre site à tout faire</h4>
      <br />
      {links.map((i) => (
        <div id="container">
          <p id="description_module">
            <br />
            <strong>{i.description}</strong>
          </p>
          <Link
            to={i.link}
            style={{
              textAlign: "center",
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
              fontWeight: "bold",
              color: "black",
            }}
          >
            <Box
              sx={{
                width: 250,
                height: 250,
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "primary.main",
                },
                borderRadius: "100%",
              }}
            >
              <br />
              <img src={i.photo} alt={i.title}></img>
            </Box>
            <br />
          </Link>
        </div>
      ))}
      <Container
        sx={{ backgroundColor: "#7a8fd4", height: "50px", marginTop: "60px" }}
      >
        <p id="soon">Les autres modules à venir ...</p>
      </Container>
      <br />
      <Container style={{ textAlign: "center" }}>
        <p id="description_module">
          <strong>Gestion du porte feuille</strong>
        </p>
        <Box
          sx={{
            width: 250,
            height: 250,
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "primary.main",
            },
            borderRadius: "100%",
          }}
        >
          <img src={image4} alt={"a venir"}></img>
          <br />
        </Box>
        <br />
      </Container>
    </div>
  );
}
