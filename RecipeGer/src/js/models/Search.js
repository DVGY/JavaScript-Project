import Axios from "axios";
import { APISearchURL } from "../config";
export default class Search {
  constructor(query) {
    this.query = query;
  }
  async getResult(query) {
    try {
      const res = await Axios(`${APISearchURL}?q=${this.query}`);
      this.result = res.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}
