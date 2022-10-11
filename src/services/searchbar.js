// Local Imports
import UsersModel from "../models/users.js";
import ArticlesModel from "../models/learning.js";
import CalendarModel from "../models/calendar.js";

export const search = async (searchStr) => {
  const regex = new RegExp(searchStr, "i");

  const users = [...(await UsersModel.find({ firstName: { $regex: regex } })), ...(await UsersModel.find({ lastName: { $regex: regex } }))];
  const articles = await ArticlesModel.find({ title: { $regex: regex } });
  const calendar = await CalendarModel.find({ title: { $regex: regex } });

  console.log({ users, articles, calendar });
  return { users, articles, calendar };
};

export default {
  search,
};
