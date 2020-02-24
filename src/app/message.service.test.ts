import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService
  beforeEach(() => {
    messageService = new MessageService();
  })

  it('should have no message to start', () => {
    expect(messageService.messages.length).toBe(0)
  });
  

   it('should add a message when add is called', () => {
    messageService.add('message1');
    expect(messageService.messages.length).toBe(1);
  });


  it('should remove all messages when clear is called', () => {
    messageService.add('message1');
    messageService.clear();
    expect(messageService.messages.length).toBe(0);
  });

})