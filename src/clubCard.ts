import type { Club } from "./database/club";
import { selected } from "./index";

export function clubCard(club: Club, onClick: (club:Club)=>any) {
  const card = document.createElement("paper-card");
  card.heading = club.name;
  card.innerHTML = `
  <div class="card-content">
      
    <strong>Supervisor</strong>: ${club.supervisor?.().name} <br/><br/>
    <strong>Room ID</strong>: ${club.roomId} <br/>
    <strong>Type</strong>: ${club.type} <br/>
    <strong># of Students</strong>: ${club.getConnectedKeys("students")?.length} <br/>

  </div>
  <div class="card-actions">
    <paper-button>Students List</paper-button>
  </div>
  `;
  let btn = card.querySelector("paper-button");
  if (btn) {
    btn.onclick = ()=>onClick(club)
  }
  return card;
}
