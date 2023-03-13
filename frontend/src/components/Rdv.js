import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { api } from "../lib/Api";
import AddRdv from "./AddRdv";
// import "react-calendar/dist/Calendar.css";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export default function Rdv() {
  const [rdvs, setRdvs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setRdvs(await api.getRdvs());
    }
    fetchData();
  }, []);

  function transformDate(e) {
    const liste = [];
    rdvs.forEach((e) => {
      console.log(e);
      liste.push({ date: e.date, title: e.title + " " + e.time });
    });
    return liste;
  }

  return (
    <Container>
      <AddRdv />
      <br />
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={transformDate()}
      />
    </Container>
  );
}
