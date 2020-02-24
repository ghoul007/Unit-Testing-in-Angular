import { StrengthPipe } from './strength.pipe';

describe('test pipe', ()=>{

const pipe = new StrengthPipe();
  it('is weak', ()=>{
      expect(pipe.transform(5)).toBe('5 (weak)');
  })

  it('should display strong if strength is 10', () => {
   const pipe = new StrengthPipe();
    expect(pipe.transform(10)).toBe('10 (strong)');
});
})




