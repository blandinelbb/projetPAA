import axios from "axios";

export default class Api {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async get(url) {
    return (await axios.get(`${this.baseURL}${url}`)).data;
  }
  async post(url, body) {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    return await axios.post(`${this.baseURL}${url}`, body, headers);
  }
  async delete(url, id) {
    console.log(id);
    return await axios.delete(`${this.baseURL}${url}/${id}`);
  }
  async createTask(content) {
    return await this.post("/taches", { content });
  }
  async getTaches() {
    return await this.get("/taches");
  }
  async deleteTask(id) {
    return await this.delete("/taches", id);
  }
  async getPersonnes() {
    return await this.get("/personnes?_embed=gifts");
  }
  async getGifts() {
    return await this.get("/gifts");
  }
  async createGift(content, personne, prix) {
    return await this.post("/gifts", { content, personne, prix });
  }
  async deleteGift(id) {
    return await this.delete("/gifts", id);
  }
  async getRdvs() {
    return await this.get("/rdvs");
  }
  async createRdv(date, title, time) {
    return await this.post("/rdvs", { date, title, time });
  }
}

export const api = new Api("http://localhost:3000");
