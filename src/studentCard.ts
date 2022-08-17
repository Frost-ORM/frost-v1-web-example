import type { Student } from "./database/student";

export function studentCard(student: Student) {
  const card = document.createElement("paper-card");
  card.heading = student.name;
  card.innerHTML = `
  <div class="card-content">
      
    <strong>Supervisor</strong>: ${student.id} <br/><br/>
    <strong>Year</strong>: ${student.year} <br/><br/>
    <strong>Email</strong>: ${student.email} <br/><br/>
    <strong>DOB</strong>: ${student.birthday} <br/><br/>
    <strong>Club</strong>: ${student.getConnectedKeys("club")?.[0] ?? "None"} <br/><br/>
    <strong># of Courses</strong>: ${student.getConnectedKeys("courses")?.length || "None"} <br/><br/>


  </div>
  `;

  return card;
}
