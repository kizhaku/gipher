// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
