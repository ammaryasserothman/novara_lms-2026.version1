const { performance } = require('perf_hooks');

// Mock data generator
const generateMockData = (numCourses) => {
  const courses = [];
  const enrollments = {};
  const categories = ['Tech', 'Business', 'Art', 'Science', 'Math'];

  for (let i = 0; i < numCourses; i++) {
    const id = `c${i}`;
    courses.push({
      id,
      title: `Course ${i}`,
      category: categories[i % categories.length]
    });

    // Enroll in ~10% of courses
    if (i % 10 === 0) {
      enrollments[id] = { courseId: id };
    }
  }
  return { courses, enrollments };
};

const { courses, enrollments } = generateMockData(5000);

// ORIGINAL ALGORITHM
const getRecommendedOriginal = () => {
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
};

// OPTIMIZED ALGORITHM
const getRecommendedOptimized = () => {
  const enrolledIds = new Set(Object.keys(enrollments));
  const userCategories = new Set();

  for (const c of courses) {
    if (enrolledIds.has(c.id) && c.category) {
      userCategories.add(c.category);
    }
  }

  const matches = [];
  const nonMatches = [];

  for (const c of courses) {
    if (!enrolledIds.has(c.id)) {
      if (userCategories.has(c.category)) {
        matches.push(c);
      } else {
        nonMatches.push(c);
      }
    }
  }

  return [...matches, ...nonMatches].slice(0, 2);
};

// Warmup
for (let i = 0; i < 10; i++) {
  getRecommendedOriginal();
  getRecommendedOptimized();
}

// Benchmark
const start1 = performance.now();
for (let i = 0; i < 100; i++) {
  getRecommendedOriginal();
}
const time1 = performance.now() - start1;

const start2 = performance.now();
for (let i = 0; i < 100; i++) {
  getRecommendedOptimized();
}
const time2 = performance.now() - start2;

console.log(`Original algorithm (100 runs): ${time1.toFixed(2)}ms`);
console.log(`Optimized algorithm (100 runs): ${time2.toFixed(2)}ms`);
console.log(`Speedup: ${(time1 / time2).toFixed(2)}x`);
