// Local Imports
import searchbarService from "../services/searchbar.js";
import { checkParams } from "../commons/functions.js";

export const search = async (searchStr) => {
  checkParams(searchStr);
  return await searchbarService.search(searchStr);
};

export default {
  search,
};
