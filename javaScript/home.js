import * as myModule from "./module.js";

let padreTarjetas = document.querySelector(".padre");
let events = []

fetch("https://aulamindhub.github.io/amazing-api/events.json")
  .then(res => res.json())
  .then(data => {
    events = data.events
    myModule.pintar(events, padreTarjetas);
    filtro(events);

    document.querySelector(".padreChec").addEventListener("change", () => filtro(events));
    document.querySelector(".search1").addEventListener("input", () => filtro(events)); 
  });

  function filtro(events) {

    let check = document.querySelectorAll("input[type=checkbox]:checked");
    let searchText = document.querySelector(".search1").value.toLowerCase().trim();

    let filtrar = events.filter(evento => {
        let matchCategoria = check.length === 0 || Array.from(check).some(chk => chk.value === evento.category);
        let matchSearch = evento.name.toLowerCase().includes(searchText) || evento.description.toLowerCase().includes(searchText);
        return matchCategoria && matchSearch;
    });

    filtrar.length === 0? padreTarjetas.innerHTML = `
      <div class="text-center">
        <p>⚠ No results found</p>
      </div>` : myModule.pintar(filtrar, padreTarjetas);    
}
