const { performance } = require('perf_hooks');

// Generate large mock data
const syllabus = [];
for (let i = 0; i < 100; i++) {
  const lessons = [];
  for (let j = 0; j < 50; j++) {
    lessons.push({ id: `l-${i}-${j}` });
  }
  syllabus.push({ lessons });
}

// 4999 completed lessons, last one is incomplete
const completedLessons = [];
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 50; j++) {
    if (i === 99 && j === 49) break;
    completedLessons.push(`l-${i}-${j}`);
  }
}

function unoptimized() {
  const start = performance.now();
  const allLessons = syllabus.flatMap(m => m.lessons);
  const next = allLessons.find(l => !completedLessons.includes(l.id));
  const end = performance.now();
  return end - start;
}

function optimized() {
  const start = performance.now();
  const completedSet = new Set(completedLessons);
  let next = null;
  outer: for (const module of syllabus) {
    for (const lesson of module.lessons) {
      if (!completedSet.has(lesson.id)) {
        next = lesson;
        break outer;
      }
    }
  }
  const end = performance.now();
  return end - start;
}

const unoptTime = unoptimized();
const optTime = optimized();

console.log(`Unoptimized: ${unoptTime.toFixed(2)}ms`);
console.log(`Optimized: ${optTime.toFixed(2)}ms`);
console.log(`Improvement: ${(unoptTime / optTime).toFixed(2)}x faster`);
