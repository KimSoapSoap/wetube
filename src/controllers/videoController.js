import Video from "../models/Video";

let fakeUser = {
  username: "soap",
  loggedIn: true,
};
/* callback 방식으로 한 것
export const home = (req, res) => {
  Video.find({}, (error, videos) => {
    console.log("errors", error);
    console.log("videos", videos);

    return res.render("home", {
      pageTitle: "Home",
      fakeUser,
      videos: [],
    });
  });
};
*/

//이건 promise로 await async 방식으로 한 것
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "asc" });
    return res.render("home", {
      pageTitle: "Home",
      fakeUser,
      videos,
    });
  } catch {
    return res.render("server-error");
  }
};

export const watch = async (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", {
    pageTitle: video.title,
    video,
    hashtags: video.hashtags,
  });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  // const video = await Video.findById(id);
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "video not found." });
  }
  // video.title = title;
  // video.description = description;
  // video.hashtags = hashtags
  //   .split(",")
  //   .map((word) => (word.startsWith("#") ? word.trim() : `#${word.trim()}`));
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
    //   hashtags: hashtags.split(",").map((word) => `#${word.trim()}`),
  });

  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("Upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      // createdAt: Date.now(),
      // hashtags: hashtags.split(",").map((word) => `#${word.trim()}`),
      // meta: {
      //   views: 0,
      //   rating: 0,
      // },
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  // delete video
  return res.redirect("/");
};
export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: { $regex: new RegExp(`${keyword}$`, "i") },
    });
    // return res.render("search", { pageTitle: "Search", videos });
  }
  console.log(keyword);
  return res.render("search", { pageTitle: "Search", videos });
};
