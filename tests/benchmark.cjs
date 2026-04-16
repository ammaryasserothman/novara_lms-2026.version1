const { performance } = require('perf_hooks');

const course = {
  syllabus: Array.from({ length: 50 }, (_, i) => ({
    lessons: Array.from({ length: 20 }, (_, j) => ({
      id: `l-${i}-${j}`
    }))
  }))
};
const completedLessons = Array.from({ length: 50 * 20 - 1 }, (_, i) => {
  const m = Math.floor(i / 20);
  const l = i % 20;
  return `l-${m}-${l}`;
});

const enrollment = { completedLessons };

function getNextLessonFlatMap() {
    const allLessons = course.syllabus.flatMap(m => m.lessons);
    const next = allLessons.find(l => !enrollment.completedLessons.includes(l.id));
    return next ? next.id : null;
}

function getNextLessonOptimized() {
    const completedSet = new Set(enrollment.completedLessons);
    for (const module of course.syllabus) {
        for (const lesson of module.lessons) {
            if (!completedSet.has(lesson.id)) {
                return lesson.id;
            }
        }
    }
    return null;
}

const start1 = performance.now();
getNextLessonFlatMap();
const end1 = performance.now();
console.log(`flatMap + includes: ${end1 - start1} ms`);

const start2 = performance.now();
getNextLessonOptimized();
const end2 = performance.now();
console.log(`Optimized (Set + for...of): ${end2 - start2} ms`);
