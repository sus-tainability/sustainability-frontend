export const routes = {
  authentication: {
    login: "/login",
  },
  story: {
    base: "/story",
    game: "/story/game",
    mockGame: "/story/game/:id",
    mockVote: "/story/vote/:id1/:id2",
    takePhoto: "/story/takephoto",
    photoLanding: "/story/photo",
    verification: "/story/verification",
  },
  profile: {
    base: "/profile",
  },
};
