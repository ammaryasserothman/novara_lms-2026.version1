1. **Optimize Sequential Lesson Lookups in `LessonPage.tsx`**
   - Replace the multiple `course.syllabus.flatMap(m => m.lessons)` calls in the `onClick` and `disabled` handlers of the "Previous" and "Next Lesson" buttons.
   - Use `React.useMemo` to compute the `allLessons` and `currentIndex` just once per render (or when `course` / `lessonId` changes) instead of regenerating the flat array and traversing it four times on each render/interaction. This reduces O(N) array allocations and garbage collection.
2. **Verify changes**
   - Use `read_file` to inspect the `src/features/courses/pages/LessonPage.tsx` file and confirm the changes were made correctly.
3. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
4. **Submit PR**
   - Submit the changes using the specified format for Bolt's PR description, including `💡 What`, `🎯 Why`, `📊 Impact`, and `🔬 Measurement`.
