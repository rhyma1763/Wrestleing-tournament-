const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQe7JJutODgPJT5YFZtMvTLdf38vVNZdKk9yg8nU955T8_khm9P035LInk-pPKIzQKYd_2i2jaixYg6/pub?gid=0&single=true&output=csv";
fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);
    let players = [];

    rows.forEach(row => {
      if (!row.trim()) return;

      const cols = row.split(",");

      players.push({
        name: cols[0],
        score: Number(cols[1]) || 0,
        data: cols.slice(2)
      });
    });

    players.sort((a,b) => b.score - a.score);

    const table = document.getElementById("leaderboard");

    players.forEach((p,i) => {
      const tr = document.createElement("tr");

      let rankClass="";
      if(i===0) rankClass="gold";
      if(i===1) rankClass="silver";
      if(i===2) rankClass="bronze";

      tr.innerHTML = `
        <td class="${rankClass}">#${i+1}</td>
        <td>${p.name}</td>
        <td>${p.score}</td>
      `;

      p.data.forEach(value=>{
        const td=document.createElement("td");
        td.textContent=value;
        tr.appendChild(td);
      });

      table.appendChild(tr);
    });
  });
