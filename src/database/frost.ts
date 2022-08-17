import { Frost } from '@frost-orm/frost-web'
import { ClubApi } from './club'
import { CourseApi } from './courses'
import { ProfessorApi } from './professor'
import { StudentApi } from './student'

import {
getDatabase
} from "firebase/database";

const firebaseConfig = {
}

if(!Object.keys(firebaseConfig).length) {
    alert("Missing Firebase Configuration")
    throw new Error("Missing Firebase Configuration");
}

export const FrostApp = Frost.initialize(firebaseConfig, {

    CourseApi,
    ClubApi,
    ProfessorApi,
    StudentApi,
})


export const fireDB = getDatabase(FrostApp.firebaseApp)
