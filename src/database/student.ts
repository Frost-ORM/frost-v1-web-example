import {
	Exclude,
	Serialize,
	FrostApi,
	FrostEntity,
	FrostNode,
	FrostObject,
	Relation,
	RelationTypes,
	DateSerializer,
} from '@frost-orm/frost-web';
import {Course} from "./courses";
import {Club } from "./club";
import { CLUB_STUDENTS, STUDENT_COURSES } from "./consts";


@FrostEntity({ collectionPath: "/testing/students" })
export class Student extends FrostObject<Student> {

	name?: string;
	year?: "FRESHMAN" | "SOPHOMORE" | "JUNIOR" | "SENIOR";
	email?: string;

	@Exclude()
	excludeExample?: string;

	@DateSerializer<Student>()
	birthday?: Date;



	@Relation({
		name: STUDENT_COURSES,
		relation: RelationTypes.MANY_TO_MANY,
		type: () => Course,
	})
	courses?: () => Course[];

	@Relation({ name: CLUB_STUDENTS, type: () => Club, relation: RelationTypes.ONE_TO_MANY })
	club?: () => Club;
}

@FrostNode({
	entity: Student,
})
export class StudentApi extends FrostApi<Student> {}

export type StudentConnectOptions = Parameters<StudentApi['add']>[1]
