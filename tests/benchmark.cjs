const { performance } = require('perf_hooks');

// Generate Mock Data
const numCourses = 1000;
const numEnrollments = 200;

const courses = Array.from({ length: numCourses }, (_, i) => ({
    id: `c${i}`,
    category: `cat${i % 10}`
}));

const enrollments = {};
for (let i = 0; i < numEnrollments; i++) {
    enrollments[`c${i}`] = { courseId: `c${i}` };
}

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

function getRecommendedCoursesNew() {
    // 1. Get user categories using a Set for O(1) lookup
    const enrolledIdsSet = new Set(Object.keys(enrollments));
    const userCategoriesSet = new Set();

    // Instead of find(), pre-calculate categories (though courses might not need find if we iterate once)
    // Actually, to get categories of enrolled courses:
    for (const course of courses) {
        if (enrolledIdsSet.has(course.id) && course.category) {
            userCategoriesSet.add(course.category);
        }
    }

    // 2. Find courses NOT enrolled, prioritizing matching categories
    const recommended = [];
    const others = [];

    for (const course of courses) {
        if (!enrolledIdsSet.has(course.id)) {
            if (userCategoriesSet.has(course.category)) {
                recommended.push(course);
                if (recommended.length >= 2) break; // Optimization: we just need 2 matches
            } else if (others.length < 2) {
                others.push(course);
            }
        }
    }

    while (recommended.length < 2 && others.length > 0) {
        recommended.push(others.shift());
    }

    return recommended;
}

// Warm up
for (let i = 0; i < 100; i++) {
    getRecommendedCoursesOld();
    getRecommendedCoursesNew();
}

const startOld = performance.now();
for (let i = 0; i < 1000; i++) {
    getRecommendedCoursesOld();
}
const timeOld = performance.now() - startOld;

const startNew = performance.now();
for (let i = 0; i < 1000; i++) {
    getRecommendedCoursesNew();
}
const timeNew = performance.now() - startNew;

console.log(`Old: ${timeOld.toFixed(2)}ms`);
console.log(`New: ${timeNew.toFixed(2)}ms`);
