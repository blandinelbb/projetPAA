import { TextField } from "@mui/material";
import "../css/searchfield.css";

export default function Searchfield(props) {
  return (
    <div id="search">
      Recherche
      <TextField
        id="searchfield"
        variant="outlined"
        value={props.value}
        onChange={props.onChange}
        sx={{ padding: "0px 0px 0px 10px" }}
      />
    </div>
  );
}
