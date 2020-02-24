tutorial practical on angular unit testing from Pluralsight courses by Joe Eames

## Jest

### Setup Jest Config

```js
import 'jest-preset-angular';

/* global mocks for jsdom */
const mock = () => {
  let storage: { [key: string]: string } = {};
  return {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => (storage[key] = value || ''),
    removeItem: (key: string) => delete storage[key],
    clear: () => (storage = {})
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
```

### Initialize with TestBed

```js


describe('HeroCompoenent', ()=>{
 let component: HeroesComponent;
 let fixture: ComponentFixture<HeroesComponent>;
 let mockHeroService;
 let HEROES;

beforeEach(()=>{
 HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperBro', strength: 55 }
    ];

    mockHeroService ={
      'getHeroes': jest.fn().mockReturnValue(of(HEROES)),
      'addHero': jest.fn(),
      'deleteHero': jest.fn().mockReturnValue(of(true))
    }

    component =  new HeroesComponent(mockHeroService)

    TestBed.configureTestingModule({
      declarations: [HeroesComponent,
      HeroComponent,
      RouterLinkDirectiveStub],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService
        }
      ],
      // schemas: []
    });
    fixture = TestBed.createComponent(HeroesComponent);


})


```


### Mock with jest

```js
    mockHeroService ={
      'getHeroes': jest.fn().mockReturnValue(of(HEROES)),
      'addHero': jest.fn(),
      'deleteHero': jest.fn().mockReturnValue(of(true))
    }

```


### Watch with 

```js
   jest.spyOn(fixture.componentInstance, 'delete');
   ```



### Mock Directive

```js

@Directive({
  selector: '[routerLink]',
  host: {'(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any;

  onClick(){
    this.navigatedTo = this.linkParams;
  }
}
```

### Mock  Compoenent

```js
 @Component({
    selector: 'app-hero',
    template: `
      <div></div>
    `
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }
  ```



  ### Mock  Service

  ```js

describe("HeroService", () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService;
    
    beforeEach(function () {
        mockMessageService = { add: jest.fn() }

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HeroService,
                { provide: MessageService, useVale: mockMessageService }
            ]
        })

        httpTestingController =  TestBed.get(HttpTestingController);
        service=  TestBed.get(HeroService)
    });

    it('shoulf call with current url', () => {
        service.getHero(4).subscribe();
        const req = httpTestingController.expectOne('api/heroes/4');
        req.flush({id: 4, name: 'SuperDude', strength: 100});
        
    });
})
```