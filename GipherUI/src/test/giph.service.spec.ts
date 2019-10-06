import { TestBed } from "@angular/core/testing";
import { GiphService } from "src/app/services/giph.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AuthenticationService } from "src/app/services/authentication.service";
import { environment } from "src/environments/environment";
import { GiphRecommended } from "src/app/models/giphRecommended";

describe('GiphService', () => {
  let giphService: GiphService;
  let httpTestingController: HttpTestingController;
  let authenticationService: AuthenticationService;
  let bookMarkUrl = 'http://localhost:8765/giphermanager/giphermanager/api/v1/bookmark/';
  let fetchBookmarkUrl = 'http://localhost:8765/giphermanager/giphermanager/api/v1/bookmark/admin';
  let giphyApiKey: String = environment.giphyApiKey;
  let giphyTrendingURL: String = environment.giphyTrendingURL;
  let giphySearchURL: String = environment.giphySearchURL;
  let apiGatewayURL: String = environment.apiGatewayURL;
  let apiBookmark: String = environment.apiBookmark;
  let apiRecommended: String = environment.apiRecommended;
  let giphyFetchURL: String = environment.giphyFetchURL;
  let bookmarkResponse = {"id":"123","gifId":"h1tIk7PDhf9tEx6syw","userName":"admin"};
  let bookmarks = [{"id":"123","gifId":"SRO0ZwmImic0","userName":"admin"},{"id":"134","gifId":"3ornjSZp9jUtEFlsL6","userName":"admin"}];
  let searchTerm = "searchTerm";
  let gifIds = '1,2,3';
  let recommendedGifs: Array<GiphRecommended> = [{"gifId":"SRO0ZwmImic0","count":2},{"gifId":"1tHzw9PZCB3gY","count":1}];
  let gifId = '123';
  let userId = "admin";
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GiphService, AuthenticationService],
      imports: [HttpClientTestingModule]
    });

    giphService = TestBed.get(GiphService);
    httpTestingController = TestBed.get(HttpTestingController);
    authenticationService = TestBed.get(AuthenticationService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should bookmark gif', () => {
    giphService.bookMarkGiph("1", "admin").subscribe(res => {
      expect(res).toEqual(bookmarkResponse);
    });

    const httpMockReq = httpTestingController.expectOne(bookMarkUrl);
    httpMockReq.flush(bookmarkResponse);
    expect(httpMockReq.request.method).toBe('POST');
  });

  it('should fetch bookmarked gif', () => {
    giphService.fetchBookmarkedGiphs("admin").subscribe(res => {
      expect(res).toEqual(bookmarks);
    });

    const httpMockReq = httpTestingController.expectOne(fetchBookmarkUrl);
    httpMockReq.flush(bookmarks);
    expect(httpMockReq.request.method).toBe('GET');
  });

  it('should delete bookmark', () => {
    giphService.deleteBookmark(userId, gifId).subscribe(res => {
      expect(res).toEqual(recommendedGifs);
    });

    const httpMockReq = httpTestingController.expectOne(`${apiGatewayURL}${apiBookmark}${gifId}/${userId}`);
    expect(httpMockReq.request.method).toBe('DELETE');
    httpMockReq.flush(recommendedGifs); 
  });

  it('should fetch recommended gif', () => {
    giphService.fetchRecommendedGiphs().subscribe(res => {
      expect(res).toEqual(recommendedGifs);
    });

    const httpMockReq = httpTestingController.expectOne(`${apiGatewayURL}${apiRecommended}`);
    expect(httpMockReq.request.method).toBe('GET');
    httpMockReq.flush(recommendedGifs); 
  });

  it('should fetch trending gifs from Giphy', () => {
    giphService.fetchGiphs().subscribe(res => {
      expect(res).toEqual(bookmarks);
    });

    const httpMockReq = httpTestingController.expectOne(`${giphyTrendingURL}&api_key=${giphyApiKey}`);
    httpMockReq.flush(bookmarks);
    expect(httpMockReq.request.method).toBe('GET');
  });

  it('should search gifs from Giphy', () => {
    giphService.searchGiphs(searchTerm).subscribe(res => {
      expect(res).toEqual(bookmarks);
    });

    const httpMockReq = httpTestingController.expectOne(`${giphySearchURL}&api_key=${giphyApiKey}&q=${searchTerm}`);
    httpMockReq.flush(bookmarks);
    expect(httpMockReq.request.method).toBe('GET');
  });

  it('should fetch gif from Giphy by Ids', () => {
    giphService.fetchGiphsById(gifIds).subscribe(res => {
      expect(res).toEqual(recommendedGifs);
    });

    const httpMockReq = httpTestingController.expectOne(`${giphyFetchURL}&api_key=${giphyApiKey}&ids=${gifIds}`);
    httpMockReq.flush(recommendedGifs);
    expect(httpMockReq.request.method).toBe('GET');
  });

})