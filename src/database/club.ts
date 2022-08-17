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
import { CLUB_STUDENTS, CLUB_SUPERVISOR } from './consts';
import {Professor} from './professor';
import {Student} from './student'



@FrostEntity({collectionPath:'/testing/clubs'})
export class Club extends FrostObject<Club> {

    name?: string;

    type?: "STEM" | "SPORTS" | "CREATIVE";

    roomId?: string;

    @Relation({ name: CLUB_STUDENTS, type: () => Student,relation: RelationTypes.ONE_TO_MANY, master: true })
    students?: () => Student[]

    @Relation({ name: CLUB_SUPERVISOR, type: () => Professor,relation:RelationTypes.ONE_TO_ONE })
    supervisor?: () => Professor
}

@FrostNode({
    entity: Club,
})
export class ClubApi extends FrostApi<Club> {}

/**
 * This type is the type of the map that should be passed to the constructor of Club class
 */
export type ClubConstructorData = ConstructorParameters<typeof Club>[0]