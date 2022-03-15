const fakeUser = {
  username: "soap",
  loggedIn: true,
};

export const trending = (req, res) => {
  const videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const videosArrObj = [
    { title: "Hello" },
    { title: "Video #2" },
    { title: "Whatsup" },
  ];
  const mixinsPractice = [
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
  return res.render("home", {
    pageTitle: "Home",
    fakeUser: fakeUser,
    videos, //videos: videos,   ES6에 의해 A:A 는 A로 표현?
    videosArrObj, //videosArrObj: videosArrObj,
    mixinsPractice, //mixinsPractice: mixinsPractice,
  });
};
export const search = (req, res) => res.send("Search Video");
export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });
export const edit = (req, res) => res.send("Edit Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
export const upload = (req, res) => res.send("Upload Video");
