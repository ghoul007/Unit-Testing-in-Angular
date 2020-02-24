import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'



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