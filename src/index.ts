import "@polymer/paper-card/paper-card.js";

import "@polymer/paper-button/paper-button.js";
import type { PaperButtonElement } from "@polymer/paper-button/paper-button.js";
import { FrostApp } from "./database/frost";
import { addStudents, setData } from "./database/mock-data";
import { Subject } from "rxjs";
import type { Student } from "./database/student";
import { studentCard } from "./studentCard";
import { clubCard } from "./clubCard";
import { courseCard } from "./courseCard";
import { Club } from "./database/club";
import type { Course } from "./database/courses";


const app = document.getElementById("app-root") as HTMLDivElement;

app.innerHTML = `
<div id="top">
  <paper-button id="mock-btn" raised class="indigo">Set Initial Mock Data</paper-button>
  <paper-button id="mock-students-btn" raised class="indigo">Add Mock Students Data</paper-button>
</div>
<main>
  <div id="lists-container">

    <div id="courses-container">
      <h2>Courses</h2>
      <div id="courses-list">
      </div>
    </div>

    <div id="clubs-container">
      <h2>Clubs</h2>
      <div id="clubs-list">
      </div>
    </div>
    
    <div id="students-container">
      <h2>Students</h2>
      <div id="students-list">
      </div>
    </div>

  </div>
</main>
`;

const mockBtn = document.getElementById("mock-btn") as PaperButtonElement;
const mockStudentsBtn = document.getElementById(
	"mock-students-btn",
) as PaperButtonElement;

/*
 * Sets The initial Mock Data (Clubs,Courses,Professors, Some Students)
 */
mockBtn.onclick = () => {
	setData();
};
/*
 * Adds Extra Mock Students Data
 */
mockStudentsBtn.onclick = () => {
	addStudents();
};




const clubsList = document.getElementById("clubs-list") as HTMLDivElement;
const coursesList = document.getElementById("courses-list") as HTMLDivElement;
const studentsList = document.getElementById("students-list") as HTMLDivElement;

export const studentsSubject = new Subject<Student[]>();
export let selected: {type:"club"|"course",id?:string} | undefined = undefined;


/*
 * When Clicked set the data in the selected variable
 * and Emit the new students list
 */
function handleStudentsListClick(data: Club | Course){
    selected = { type: data instanceof Club ? "club":"course", id: data.id };
    studentsSubject.next(data.students?.() ?? []);
}

/*
 * Courses Observer 
 * (No Constraints Passed , So it listens to all Courses) 
 * included with each course is the connected students and professor
 */
FrostApp.CourseApi.observeMany({
  include: ["professor", "students"],
}).subscribe((data) => {

  /*
   * When the data changes the coursesList div is modified
   */
  coursesList.replaceChildren(...data.map((course)=>courseCard(course,handleStudentsListClick)));


  /*
   * if the selected course changes then emit the new students list
   * if empty then emit an empty student list
   */
  if (selected && selected.type === "course" ) {
      if(!data.length) studentsSubject.next([])
      else studentsSubject.next(data.find((value)=>value.id === selected?.id)?.students?.() ?? []);
  }

});

/*
* Clubs Observer 
* (No Constraints Passed , So it listens to all Clubs) 
* included with each club is the connected students and supervisor
*/
FrostApp.ClubApi.observeMany({ include: ["supervisor", "students"] }).subscribe(
  (data) => {
      /*
       * When the data changes the clubsList div is modified
       */
      clubsList.replaceChildren(...data.map((club)=>clubCard(club,handleStudentsListClick)));
  

      /*
       * if the selected club changes then emit the new students list
       * if empty then emit an empty student list
       */
      if (selected && selected.type === "club" ) {
          if(!data.length) studentsSubject.next([])
          else studentsSubject.next(data.find((value)=>value.id === selected?.id)?.students?.() ?? []);
      }

  },
);

studentsSubject.subscribe((data) => {
  /*
   * When the data changes the studentsList div is modified
   */
  studentsList.replaceChildren(...data.map(studentCard));
});

