const { performance } = require('perf_hooks');

// Mock data generation
const generateMockData = (numCourses, numEnrollments) => {
  const categories = ['Frontend', 'Backend', 'Data Science', 'Design', 'Business', 'Marketing'];
  const courses = [];
  for (let i = 0; i < numCourses; i++) {
    courses.push({
      id: `c${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      title: `Course ${i}`
    });
  }

  const enrollments = {};
  for (let i = 0; i < numEnrollments; i++) {
    enrollments[`c${i}`] = { courseId: `c${i}` };
  }

  return { courses, enrollments };
};

const runBenchmark = () => {
  const { courses, enrollments } = generateMockData(10000, 500);

  // --- ORIGINAL LOGIC ---
  const getRecommendedCoursesOriginal = () => {
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

  // --- OPTIMIZED LOGIC (No map cache, just set optimization + early return) ---
  const getRecommendedCoursesOptimized = () => {
    // 1. Get user categories from enrolled courses via Set for O(1) lookups
    const enrolledIdsSet = new Set(Object.keys(enrollments));

    // Instead of find on the whole array, we iterate once if we don't have a map
    // but building a map is actually O(N). If we only do this operation sometimes,
    // let's see how building the set is.
    const userCategoriesSet = new Set();
    for (const course of courses) {
      if (enrolledIdsSet.has(course.id) && course.category) {
         userCategoriesSet.add(course.category);
      }
    }

    // 2. Find courses NOT enrolled, prioritizing matching categories
    const recommended = [];
    const fallbacks = [];

    // O(N) single pass instead of O(N log N) sort
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      if (recommended.length >= 2) break; // early return

      if (!enrolledIdsSet.has(course.id)) {
        if (userCategoriesSet.has(course.category)) {
          recommended.push(course);
        } else if (fallbacks.length < 2) {
          fallbacks.push(course);
        }
      }
    }

    // Fill up to 2 if needed
    while (recommended.length < 2 && fallbacks.length > 0) {
      recommended.push(fallbacks.shift());
    }

    return recommended;
  };

  const iterations = 100;

  let start = performance.now();
  for (let i = 0; i < iterations; i++) {
    getRecommendedCoursesOriginal();
  }
  let end = performance.now();
  console.log(`Original Logic: ${(end - start).toFixed(2)} ms`);

  start = performance.now();
  for (let i = 0; i < iterations; i++) {
    getRecommendedCoursesOptimized();
  }
  end = performance.now();
  console.log(`Optimized Logic 2: ${(end - start).toFixed(2)} ms`);
};

runBenchmark();
