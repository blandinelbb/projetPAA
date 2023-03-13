import "../css/navbar.css";
import * as React from "react";

// export default function NavBar() {
//   return (
//     <div>
//       <Container sx={{ backgroundColor: "#7a8fd4" }}>
//         <Box sx={{ height: "60px", width: "1000px" }}>
//           <p id="title"> Mon site à tout faire</p>
//         </Box>
//       </Container>
//       <hr></hr>
//     </div>
//   );
// }

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

const pages = [
  {
    link: "/taches",
    title: "Vos tâches",
  },
  {
    link: "/rdvs",
    title: "Vos rendez-vous",
  },
  {
    link: "/gifts",
    title: "Listes de vos idées cadeaux",
  },
];
export default function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CloudQueueIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 7,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Cloud
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Typography
                variant="h7"
                noWrap
                component="a"
                href={page.link}
                sx={{
                  mr: 10,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  color: "inherit",
                  textDecoration: "none",
                  fontFamily: "",
                }}
              >
                {page.title}
              </Typography>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
