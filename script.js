const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQe7JJutODgPJT5YFZtMvTLdf38vVNZdKk9yg8nU955T8_khm9P035LInk-pPKIzQKYd_2i2jaixYg6/pub?output=csv";

fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1); // remove header
    let players = [];

    rows.forEach(row => {
      const cols = row.split(",");
      if(cols.length >= 2){
        players.push({
          name: cols[0].trim(),
          score: Number(cols[1].trim())
        });
      }
    });

    // Sort by score (highest first)
    players.sort((a,b) => b.score - a.score);

    const table = document.getElementById("leaderboard");

    players.forEach((p, i) => {
      const tr = document.createElement("tr");

      let rankClass = "";
      if(i === 0) rankClass = "gold";
      if(i === 1) rankClass = "silver";
      if(i === 2) rankClass = "bronze";

      tr.innerHTML = `
        <td class="${rankClass}">#${i+1}</td>
        <td>${p.name}</td>
        <td>${p.score}</td>
      `;

      table.appendChild(tr);
    });
  });

