import { HeroComponent} from './hero.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TestBed, ComponentFixture } from '@angular/core/testing'
import { By} from '@angular/platform-browser'

describe('HeroComponent', ()=>{
let fixture: ComponentFixture<HeroComponent>;
beforeEach(()=>{
TestBed.configureTestingModule({
    declarations:[HeroComponent],
    schemas: [NO_ERRORS_SCHEMA]
})

fixture =  TestBed.createComponent(HeroComponent)

})

  it ('should render the hero name', () => {
      fixture.componentInstance.hero = {
          id: 1, name:'Ghoul', strength: 3
      }
      fixture.detectChanges();
      const de  =  fixture.debugElement.query(By.css('a'))
      expect(de.nativeElement.textContent).toContain('Ghoul');
      expect(fixture.nativeElement.querySelector('a').textContent).toContain('Ghoul')
  })


})