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
import {Club } from './club'
import { CLUB_SUPERVISOR, PROFESSOR_COURSES } from './consts';
import {Course} from './courses'



@FrostEntity({collectionPath:'/testing/professor'})
export class Professor extends FrostObject<Professor>{

    name?:string;
    department?:string;
    email?:string;


    @Relation({ name: PROFESSOR_COURSES , type: () => Course, relation:RelationTypes.ONE_TO_MANY, master:true})
    courses?: () => Course[]

    @Relation({ name: CLUB_SUPERVISOR, type: () => Club,relation:RelationTypes.ONE_TO_ONE })
    club?: () => Club

}

@FrostNode({
    entity: Professor,
})
export class ProfessorApi extends FrostApi<Professor> {}

export type ProfessorConnectOptions = Parameters<ProfessorApi['add']>[1]
