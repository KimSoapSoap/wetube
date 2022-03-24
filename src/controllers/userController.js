import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) =>
  res.render("join", { pateTitle: "Create Account" });
export const postJoin = async (req, res) => {
  console.log(req.body);
  const { email, name, username, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("Join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation does not match",
    });
  }

  const alreadyExists = await User.exists({ $or: [{ username }, { email }] });
  if (alreadyExists) {
    console.log("hi", alreadyExists);
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This email/username is already taken",
    });
  }
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
    return res
      .status(400)
      .render("join", { pageTitle: "Join", errorMessage: error._message });
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  console.log(user.password);
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res
      .status(400)
      .render("login", { pageTitle, errorMessage: "Wrong password" });
  }
  console.log("user logged in!");
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");
