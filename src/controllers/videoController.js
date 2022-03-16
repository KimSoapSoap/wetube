let fakeUser = {
  username: "soap",
  loggedIn: true,
};
let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 3,
    createdAt: "10 minutes ago",
    views: 459,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 4,
    createdAt: "5 minutes ago",
    views: 259,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 5,
    createdAt: "1 minutes ago",
    views: 159,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", {
    pageTitle: "Home",
    fakeUser,
    videos, //videos: videos,   ES6에 의해 A:A 는 A로 표현?
  });
};
export const watch = (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  const video = videos[id - 1];
  console.log("Show video", video);
  return res.render("watch", {
    pageTitle: `Watching ${video.title}`,
    id,
    video,
  });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  console.log("get", video);
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("Upload", { pageTitle: "Upload video" });
};
export const postUpload = (req, res) => {
  const newVideo = {
    title: req.body.title,
    rating: 0,
    comments: 0,
    createdAt: "1 minutes ago",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
export const search = (req, res) => res.send("Search Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
export const upload = (req, res) => res.send("Upload Video");
