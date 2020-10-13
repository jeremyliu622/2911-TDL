import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainComponent } from './app.main';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('MainComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [
        MainComponent
      ],
    }).compileComponents();
  }));

  it('the getTime functions should return 630', () => {
    const _datetime = new Date(2020, 5, 5, 10, 30)
    
    const fixture = TestBed.createComponent(MainComponent);
    const app = fixture.componentInstance;
    expect(app.getTime(_datetime)).toEqual(630)
  });

});
