import React, { useEffect, useState } from "react";
import { MenuItem, Select, Button } from "@mui/material";
import { api } from "../lib/Api";

export default function AuthorsSelector(props) {
  const [authors, setAuthors] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setAuthors(await api.getListes());
    }
    fetchData();
  }, [refresh]);

  return (
    <React.Fragment>
      <Select value={props.value} onChange={props.onChange}>
        {authors.map((liste) => {
          return <MenuItem value={liste.id}>{liste.name}</MenuItem>;
        })}
      </Select>
      <Button onClick={() => setRefresh(refresh + 1)}>Refresh</Button>
    </React.Fragment>
  );
}
