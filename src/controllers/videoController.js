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
    const videos = await Video.find({});
    console.log(videos);
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
  console.log(video, id);
  return res.render("watch", {
    pageTitle: video.title,
    video,
  });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
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
      // createdAt: Date.now(),
      hashtags: hashtags.split(",").map((word) => `#${word.trim()}`),
      // meta: {
      //   views: 0,
      //   rating: 0,
      // },
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
export const search = (req, res) => res.send("Search Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
export const upload = (req, res) => res.send("Upload Video");
