import {
  Button,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Snackbar,
} from "@mui/material";
import { Container } from "@mui/system";
import HelpIcon from "@mui/icons-material/Help";
import MuiAlert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { api } from "../lib/Api";
import "../css/add.css";
import "../css/addRdv.css";

import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddRdv() {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [listes, setListes] = useState([]);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      setListes(await api.getRdvs());
    }
    fetchData();
  }, []);

  async function submit(e) {
    e.preventDefault();
    await api.createRdv(date, title, time);
    window.location.reload(true);
  }

  return (
    <div id="task">
      <form onSubmit={(e) => submit(e)}>
        <Container>
          <Divider textAlign="left" style={{ margin: "40px 0px" }}>
            Rendez-vous
          </Divider>
          Nom :
          <TextField
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
            sx={{ padding: "0px 0px 0px 10px" }}
          ></TextField>
          <br />
          <br />
          Date du rendez-vous :
          <div className="card flex justify-content-center">
            <Calendar
              value={date}
              onChange={(e) => {
                const d = e.value;
                const m = d.getMonth() + 1;
                const day = d.getDate();
                const min = d.getMinutes();

                if (m < 10 && day < 10)
                  setDate(d.getFullYear() + "-0" + m + "-0" + d.getDate());
                else if (m < 10 && day > 10)
                  setDate(d.getFullYear() + "-0" + m + "-" + d.getDate());
                else if (m > 10 && day < 10)
                  setDate(d.getFullYear() + "-" + m + "-0" + d.getDate());
                else setDate(d.getFullYear() + "-" + m + "-" + d.getDate());

                if (min < 10) setTime(d.getHours() + "H0" + d.getMinutes());
                else setTime(d.getHours() + "H" + d.getMinutes());
              }}
              dateFormat="dd/mm/yy"
              showTime
              hourFormat="24"
              showIcon
            />
            <Tooltip title="Double clic sur une date pour la selectionner">
              <IconButton>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </div>
          <br />
          <Button
            variant="contained"
            type="submit"
            sx={{ margin: "7px 0px 0px 10px" }}
            onClick={handleClick}
          >
            Ajouter un rdv
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Le rendez-vous a été ajouter!
            </Alert>
          </Snackbar>
          <Divider style={{ margin: "50px 0px" }} />
        </Container>
      </form>
    </div>
  );
}
