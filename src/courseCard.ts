import type { Course } from "./database/courses";

export function courseCard(course: Course, onClick: (course:Course)=>any) {
  const card = document.createElement("paper-card");
  card.heading = course.name;
  card.innerHTML = `
  <div class="card-content">

    <strong>Professor</strong>: ${course.professor?.().name} <br/><br/>
    <strong>Difficulty Level</strong>: ${course.difficultyLevel} <br/>
    <strong>Department</strong>: ${course.department} <br/>
    <strong>Difficulty Level</strong>: ${course.duration} weeks <br/><br/>
    <strong># of Students</strong>: ${course.getConnectedKeys("students")?.length} <br/>

    
  </div>
  <div class="card-actions">
    <paper-button>Students List</paper-button>
  </div>
  `;
  let btn = card.querySelector("paper-button");
  if (btn) {
    btn.onclick = () => onClick(course);
  }

  return card;
}
