// Local Imports
import searchbarDelegate from "../delegates/searchbar.js";

export const search = async (req, res) => {
  const { search } = req.query;
  const response = await searchbarDelegate.search(search);
  res.status(200).json(response);
  return response;
};

export default {
  search,
};
