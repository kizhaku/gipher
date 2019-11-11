export const environment = {
  production: true,
  apiGatewayURL: "http://localhost:8765/",
  apiLogin: "accountmanager/auth/api/v1/login/",
  apiAuthenticateToken: "accountmanager/auth/api/v1/isauthenticated/",
  apiRegisterUser: "/accountmanager/auth/api/v1/user/",
  apiBookmark: "giphermanager/giphermanager/api/v1/bookmark/",
  apiRecommended: "gipherrecommendersystem/gipherrecommender/api/v1/giphs",
  giphyApiKey: "DVa67iQKqrw6hJFfW7VslcCCQ6dSAn3q",
  giphyTrendingURL: "http://api.giphy.com/v1/gifs/trending?limit=20&rating=PG&lang=en",
  giphySearchURL: "http://api.giphy.com/v1/gifs/search?limit=20&rating=PG&lang=en",
  giphyFetchURL: "http://api.giphy.com/v1/gifs?limit=20&rating=PG&lang=en",
  bookmarkImage: "../assets/baseline-bookmark-24px.svg",
  deleteImage: "../assets/baseline-delete-24px.svg"
};
