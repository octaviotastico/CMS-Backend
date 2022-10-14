// Local Imports
import UsersModel from "../models/users.js";
import ArticlesModel from "../models/learning.js";
import CalendarModel from "../models/calendar.js";

export const search = async (searchStr) => {
  const regex = new RegExp(searchStr, "i");

  const users = await UsersModel.find({
    $or: [{ username: { $regex: regex } }, { firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  })
    .select("username firstName lastName profilePicture")
    .limit(5);
  const articles = await ArticlesModel.find({ title: { $regex: regex } })
    .select("title subtitle preview")
    .limit(5);
  const calendar = await CalendarModel.find({ title: { $regex: regex } })
    .select("title description preview")
    .limit(5);

  console.log({ users, articles, calendar });
  return {
    articles,
    calendar: calendar.map((elem) => ({
      title: elem.title,
      subtitle: elem.description,
      preview: elem.preview,
    })),
    users: users.map((elem) => ({
      title: `${elem.firstName} ${elem.lastName}`,
      subtitle: elem.username,
      preview: elem.profilePicture,
    })),
  };
};

export default {
  search,
};
