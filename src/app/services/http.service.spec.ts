import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sendPostRequest', () => {
    it('should call httpClient post', () => {
      spyOn(service.httpClient, 'post');

      service.sendPostRequest({
        Email: 'email@some.com',
      });
      expect(service.httpClient.post).toHaveBeenCalled();
    });
  })
});
