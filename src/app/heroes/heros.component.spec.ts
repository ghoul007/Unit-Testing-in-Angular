
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import {HeroComponent} from '../hero/hero.component';
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';


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



describe('HeroCompoenent', ()=>{
 let component: HeroesComponent;
 let fixture: ComponentFixture<HeroesComponent>;
 let mockHeroService;
 let HEROES;


//  @Component({
//     selector: 'app-hero',
//     template: `
//       <div></div>
//     `
//   })
  // class FakeHeroComponent {
  //   @Input() hero: Hero;
  // }






beforeEach(()=>{
 HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperBro', strength: 55 }
    ];

// const  b  =  jest.fn();
    mockHeroService ={
      'getHeroes': jest.fn().mockReturnValue(of(HEROES)),
      'addHero': jest.fn(),
      'deleteHero': jest.fn().mockReturnValue(of(true))
    }

    component =  new HeroesComponent(mockHeroService)


    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent  /*FakeHeroComponent*/, RouterLinkDirectiveStub],
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





  describe('heros', () => {

    it('should set heroes correctly from service', () => {

    fixture.detectChanges();

   expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    expect(fixture.componentInstance.heroes.length).toBe(3);
  });


    it('should remove hero from heroes list', () => {
      component.heroes = HEROES;
      component.delete(HEROES[2]);
      expect(component.heroes.length).toBe(2);

    });


    it('should  deleteHero function called', () => {
      component.heroes = HEROES;
      component.delete(HEROES[2]);
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2])

    });



    it('should render heros compoenents', ()=>{

      fixture.detectChanges();
      const heroComponentDEs =  fixture.debugElement.queryAll(By.directive(HeroComponent))
      expect(heroComponentDEs.length).toEqual(3);

      expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('SpiderDude')

      heroComponentDEs.forEach((hero, i)=>expect(hero.componentInstance.hero).toEqual(HEROES[i]))


    })


    it(`should call heroService.deleteHero when the Hero Component's delete button is clicked`, () => {

      jest.spyOn(fixture.componentInstance, 'delete');
      fixture.detectChanges();
      const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
      heroComponents[0].triggerEventHandler('delete', null)
      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
     })


    it('should add a new hero to the hero list when the add button is clicked', () => {
      fixture.detectChanges();

      const name = 'ghoul'
      mockHeroService.addHero.mockReturnValue(of({id: 5, name, strength: 4}));
      const inputElement =  fixture.debugElement.query(By.css('input')).nativeElement;
      const addButton = fixture.debugElement.query(By.css('button'));

      inputElement.value= name;
      addButton.triggerEventHandler('click', null);
      fixture.detectChanges();
      const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
      expect(heroText).toContain(name)

    })



    it ('should have the correct route for the first hero', () => {
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    const routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);
    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);
    expect(routerLink.navigatedTo).toBe('/detail/1');
    })



  })
})

