const fs = require('fs');
const content = fs.readFileSync('src/features/dashboard/pages/Dashboard.tsx', 'utf-8');

const newContent = content.replace(
`   if (!user) return null;

   // Logic: Get Active Course (Most recently accessed or highest progress < 100)
   const enrolledCourseIds = Object.keys(enrollments);
   const activeEnrollmentKey = enrolledCourseIds.find(id => enrollments[id].status === 'in_progress') || enrolledCourseIds[0];
   const activeCourse = courses.find(c => c.id === activeEnrollmentKey);
   const activeEnrollment = activeEnrollmentKey ? enrollments[activeEnrollmentKey] : null;

   // Logic: Get other enrolled courses (Max 2 for display)
   const otherEnrolledCourses = enrolledCourseIds
      .filter(id => id !== activeEnrollmentKey)
      .map(id => {
         const course = courses.find(c => c.id === id);
         return course ? { ...course, progress: enrollments[id].progress } : null;
      })
      .filter((c): c is (Course & { progress: number }) => c !== null)
      .slice(0, 2);

   const recommendations = getRecommendedCourses();`,
`   const dashboardData = React.useMemo(() => {
      if (!user || !courses || !enrollments) return null;

      const enrolledCourseIds = Object.keys(enrollments);
      const activeEnrollmentKey = enrolledCourseIds.find(id => enrollments[id].status === 'in_progress') || enrolledCourseIds[0];
      const activeCourse = courses.find(c => c.id === activeEnrollmentKey);
      const activeEnrollment = activeEnrollmentKey ? enrollments[activeEnrollmentKey] : null;

      const otherEnrolledCourses = enrolledCourseIds
         .filter(id => id !== activeEnrollmentKey)
         .map(id => {
            const course = courses.find(c => c.id === id);
            return course ? { ...course, progress: enrollments[id].progress } : null;
         })
         .filter((c): c is (Course & { progress: number }) => c !== null)
         .slice(0, 2);

      return {
         enrolledCourseIds,
         activeCourse,
         activeEnrollment,
         otherEnrolledCourses
      };
   }, [user, courses, enrollments]);

   // eslint-disable-next-line react-hooks/exhaustive-deps
   const recommendations = React.useMemo(() => getRecommendedCourses(), [courses, enrollments]);

   if (!user || !dashboardData) return null;

   const { enrolledCourseIds, activeCourse, activeEnrollment, otherEnrolledCourses } = dashboardData;`
);

fs.writeFileSync('src/features/dashboard/pages/Dashboard.tsx', newContent);
console.log('Patched Dashboard.tsx');
