import React from "react";
import "../css/task.css";
import { api } from "../lib/Api";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Container } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTask from "./AddTask.js";

export default class Task extends React.Component {
  state = {
    taches: [],
    id: "",
  };

  async componentDidMount() {
    const taches = await api.getTaches();
    this.setState({ ...this.state, taches });
  }

  async delete(event) {
    this.setState({ id: event });
    await api.deleteTask(this.state.id).then((res) => {
      window.location.reload(true);
    });
  }

  render() {
    return (
      <Container>
        <br />
        <AddTask />
        <TableContainer component={Paper} sx={{ margin: " 30px 0px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableCell>
                <strong>Tâche</strong>
              </TableCell>
              <TableCell>
                <strong>Fait</strong>
              </TableCell>
            </TableHead>
            <TableBody>
              {this.state.taches.map((i) => {
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {i.content}
                    </TableCell>
                    <Checkbox />
                    <Tooltip title="Double clic pour supprimer">
                      <IconButton
                        style={{ color: "#cb0e0e" }}
                        aria-label="delete"
                        component="label"
                        onClick={(e) => {
                          this.delete(i.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}
