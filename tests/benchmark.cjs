const { performance } = require('perf_hooks');

// Generate mock data
const NUM_COURSES = 5000;
const NUM_ENROLLMENTS = 500;
const CATEGORIES = ['Design', 'Development', 'Business', 'Marketing', 'Photography'];

const courses = [];
for (let i = 0; i < NUM_COURSES; i++) {
  courses.push({
    id: `c${i}`,
    title: `Course ${i}`,
    category: CATEGORIES[i % CATEGORIES.length],
  });
}

const enrollments = {};
for (let i = 0; i < NUM_ENROLLMENTS; i++) {
  enrollments[`c${i}`] = { courseId: `c${i}` };
}

// Old implementation
function getRecommendedCoursesOld() {
  const enrolledIds = Object.keys(enrollments);
  const userCategories = enrolledIds
    .map(id => courses.find(c => c.id === id)?.category)
    .filter(Boolean);

  return courses
    .filter(c => !enrolledIds.includes(c.id))
    .sort((a, b) => {
      const aMatch = userCategories.includes(a.category) ? 1 : 0;
      const bMatch = userCategories.includes(b.category) ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 2);
}

// New implementation
function getRecommendedCoursesNew() {
  const enrolledIds = new Set(Object.keys(enrollments));

  const userCategories = new Set();
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    if (enrolledIds.has(course.id) && course.category) {
      userCategories.add(course.category);
    }
  }

  const recommended = [];
  const fallbacks = [];

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    if (!enrolledIds.has(course.id)) {
      if (userCategories.has(course.category)) {
        recommended.push(course);
        if (recommended.length >= 2) break;
      } else if (fallbacks.length < 2) {
        fallbacks.push(course);
      }
    }
  }

  let i = 0;
  while (recommended.length < 2 && i < fallbacks.length) {
    recommended.push(fallbacks[i]);
    i++;
  }

  return recommended;
}

// Warm up
for (let i = 0; i < 10; i++) {
  getRecommendedCoursesOld();
  getRecommendedCoursesNew();
}

const startOld = performance.now();
for (let i = 0; i < 100; i++) {
  getRecommendedCoursesOld();
}
const endOld = performance.now();
const oldTime = (endOld - startOld) / 100;

const startNew = performance.now();
for (let i = 0; i < 100; i++) {
  getRecommendedCoursesNew();
}
const endNew = performance.now();
const newTime = (endNew - startNew) / 100;

console.log(`Old Implementation: ${oldTime.toFixed(4)} ms`);
console.log(`New Implementation: ${newTime.toFixed(4)} ms`);
console.log(`Speedup: ${(oldTime / newTime).toFixed(2)}x`);
