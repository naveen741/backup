const EventEmitter=require('events')
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// Only do this once so we don't loop forever
myEmitter.once('newListener', (event, listener) => {
    console.log(event);
//   if (event === 'event') {
//     // Insert a new listener in front
//     myEmitter.on('event', () => {
//       console.log('B');
//       console.log('ab');
//     });
//   }
});
myEmitter.on('event', () => {
    console.error('AB');
  });
myEmitter.on('event', () => {
  console.log('A');
});

myEmitter.emit('event');
//myEmitter.emit('event');
