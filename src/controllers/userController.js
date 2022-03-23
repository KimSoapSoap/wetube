import User from "../models/User";

export const getJoin = (req, res) =>
  res.render("join", { pateTitle: "Create Account" });
export const postJoin = async (req, res) => {
  console.log(req.body);
  const { email, name, username, password, location } = req.body;
  try {
    await User.create({
      email,
      name,
      username,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error.MongoServerError);
    return res.redirect("/join");
  }
};
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");
