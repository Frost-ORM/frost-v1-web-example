import {
  Exclude,
  Serialize,
  FrostApi,
  FrostEntity,
  FrostNode,
  FrostObject,
  Relation,
  RelationTypes
} from '@frost-orm/frost-web'
import { PROFESSOR_COURSES, STUDENT_COURSES } from './consts';
import {Professor } from './professor';
import {Student } from './student'

export enum Duration {
  FULL_YEAR = 24,
  FULL_SEMESTER = 12,
  HALF_SEMESTER = 6,
}


@FrostEntity({collectionPath:'/testing/courses'})
export class Course extends FrostObject<Course> {

    name?:string;
    difficultyLevel?: "INTRODUCTORY" | "INTERMEDIATE" | "UPPER_INTERMEDIATE" | "ADVANCED_PLACEMENT";
    duration?: Duration; // in weeks
    department?: string;

    @Relation({ name: STUDENT_COURSES, type: () => Student })
    students?: () => Student[]

    @Relation(
      {
        name: PROFESSOR_COURSES,
        type: () => Professor,
        relation: RelationTypes.ONE_TO_MANY
      }
    )
    professor?:() => Professor

}

@FrostNode({
    entity: Course,
})
export class CourseApi extends FrostApi<Course> {}

/**
 * This type is the type of the map that should be passed to the constructor of Club class
 */
export type CourseConstructorData = ConstructorParameters<typeof Course>[0]
