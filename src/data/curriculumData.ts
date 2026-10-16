import { Lesson } from '../types/mathverse';
import { CURRICULUM_GRADE_6 } from './curriculumGrade6';
import { CURRICULUM_GRADE_7 } from './curriculumGrade7';
import { CURRICULUM_GRADE_8 } from './curriculumGrade8';
import { CURRICULUM_GRADE_9 } from './curriculumGrade9';

export { CURRICULUM_GRADE_6, CURRICULUM_GRADE_7, CURRICULUM_GRADE_8, CURRICULUM_GRADE_9 };

export const CURRICULUM_DATA: Lesson[] = [
  ...CURRICULUM_GRADE_6,
  ...CURRICULUM_GRADE_7,
  ...CURRICULUM_GRADE_8,
  ...CURRICULUM_GRADE_9,
];
