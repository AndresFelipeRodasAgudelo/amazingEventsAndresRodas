import * as myModule from "./module.js";

let events = []
let padreTarjetas = document.querySelector(".padre");

fetch("https://aulamindhub.github.io/amazing-api/events.json")
  .then(res => res.json())
  .then(data => {
    events = data.events
    myModule.pintarUp(events, padreTarjetas)

    document.querySelector(".padreChec").addEventListener("change", () => filtroUp(events));
    document.querySelector(".search1").addEventListener("input", () => filtroUp(events));
  })

function filtroUp(events) {

  let check = document.querySelectorAll("input[type=checkbox]:checked");
  let searchText = document.querySelector(".search1").value.toLowerCase().trim();

  let filtrar = events.filter(evento => {
    let matchCategoria = check.length === 0 || Array.from(check).some(chk => chk.value === evento.category);
    let matchSearch = evento.name.toLowerCase().includes(searchText) || evento.description.toLowerCase().includes(searchText);
    return matchCategoria && matchSearch;
  });

  filtrar.length === 0 ? padreTarjetas.innerHTML = `
      <div class="text-center">
        <p>⚠ No results found</p>
      </div>` : myModule.pintarUp(filtrar, padreTarjetas);
}