
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDetailComponent} from './hero-detail.component';
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {FormsModule} from '@angular/forms';


describe('HeroCompoenent', ()=>{
 let fixture: ComponentFixture<HeroDetailComponent>;
 let mockHeroService, mockActivatedRoute, mockLocation ;

beforeEach(()=>{
    mockActivatedRoute = {snapshot:{paramMap: {get: () => '3'}}}
    mockLocation = { back:  jest.fn() }
    mockHeroService = { 
        getHero:  jest.fn().mockReturnValue(of({id: 3, name: 'ghoul', strength: 100})),
        updateHero:  jest.fn().mockReturnValue(of({}))
        }

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService
        },
         {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },{
          provide: Location,
          useValue: mockLocation
        }
      ],
      // schemas: []
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
})


it('should render hero name in a h2 tag', ()=>{

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('GHOUL')
})

  it ('should call updateHero when  save is called',  () => {
      fixture.detectChanges();
      fixture.componentInstance.save();
      expect(mockHeroService.updateHero).toHaveBeenCalled();
      
  })
 
})
 
