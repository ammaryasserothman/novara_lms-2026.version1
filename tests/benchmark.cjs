const { performance } = require('perf_hooks');

// Generate large mock data
const generateData = () => {
  const syllabus = [];
  const completedLessons = [];

  let lessonIdCounter = 0;
  for (let i = 0; i < 500; i++) {
    const lessons = [];
    for (let j = 0; j < 10; j++) {
      const lessonId = `l_${lessonIdCounter++}`;
      lessons.push({ id: lessonId });
      // Complete first 4900 lessons
      if (lessonIdCounter <= 4900) {
        completedLessons.push(lessonId);
      }
    }
    syllabus.push({ lessons });
  }

  return { syllabus, completedLessons };
};

const data = generateData();
const { syllabus, completedLessons } = data;

function unoptimizedGetNext() {
  const allLessons = syllabus.flatMap(m => m.lessons);
  const next = allLessons.find(l => !completedLessons.includes(l.id));
  return next ? next.id : null;
}

function optimizedGetNext() {
  const completedSet = new Set(completedLessons);
  for (const module of syllabus) {
    for (const lesson of module.lessons) {
      if (!completedSet.has(lesson.id)) {
        return lesson.id;
      }
    }
  }
  return null;
}

// Warmup
for(let i=0; i<10; i++) {
  unoptimizedGetNext();
  optimizedGetNext();
}

const start1 = performance.now();
for(let i=0; i<100; i++) {
  unoptimizedGetNext();
}
const end1 = performance.now();

const start2 = performance.now();
for(let i=0; i<100; i++) {
  optimizedGetNext();
}
const end2 = performance.now();

console.log(`Unoptimized: ${(end1 - start1).toFixed(2)} ms`);
console.log(`Optimized: ${(end2 - start2).toFixed(2)} ms`);
