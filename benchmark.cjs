const { performance } = require('perf_hooks');

const EVENTS = Array.from({ length: 1000 }, (_, i) => ({
   id: `e${i}`,
   date: new Date(2024, 9, Math.floor(Math.random() * 31) + 1),
   type: 'quiz'
}));
const currentDate = new Date(2024, 9, 1);
const filteredEvents = EVENTS;

const t0 = performance.now();
for (let j = 0; j < 100; j++) {
   for (let i = 1; i <= 31; i++) {
      const getEventsForDay = (day) => {
         return filteredEvents.filter(e =>
            e.date.getDate() === day &&
            e.date.getMonth() === currentDate.getMonth() &&
            e.date.getFullYear() === currentDate.getFullYear()
         );
      };
      getEventsForDay(i);
   }
}
const t1 = performance.now();
console.log(`Before: ${(t1 - t0).toFixed(2)} ms`);

const t2 = performance.now();
for (let j = 0; j < 100; j++) {
   const eventsByDay = new Map();
   const month = currentDate.getMonth();
   const year = currentDate.getFullYear();
   for (const event of filteredEvents) {
      if (event.date.getMonth() === month && event.date.getFullYear() === year) {
         const day = event.date.getDate();
         if (!eventsByDay.has(day)) eventsByDay.set(day, []);
         eventsByDay.get(day).push(event);
      }
   }
   for (let i = 1; i <= 31; i++) {
      const dayEvents = eventsByDay.get(i) || [];
   }
}
const t3 = performance.now();
console.log(`After: ${(t3 - t2).toFixed(2)} ms`);
