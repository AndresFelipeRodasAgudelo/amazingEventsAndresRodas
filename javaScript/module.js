let events = []
let currentDate
let padreTarjetas = document.querySelector(".padre");

fetch("https://aulamindhub.github.io/amazing-api/events.json")
    .then(res => res.json())
    .then(data => {
        events = data.events
        currentDate = data.currentDate
        let categorias = obtenerCategorias(events);

        crearChec(document.querySelector(".padreChec"), categorias);
        filtro(events);
        obtenerCategorias(events)

        document.querySelector(".padreChec").addEventListener("change", () => filtro(events));
        document.querySelector(".search1").addEventListener("input", () => filtro(events));
    });

export let urlQuemada = "http://127.0.0.1:5500/details.html";
export let urlQuemada1 = new URL(urlQuemada);

export function pintar(events, padreTarjetas) {
    padreTarjetas.innerHTML = "";
    for (let i = 0; i < events.length; i++) {
        creacion(padreTarjetas, events[i]);
    }
}

export function pintarUp(events, padreTarjetas) {
    padreTarjetas.innerHTML = "";
    for (let i = 0; i < events.length; i++) {
        events[i].date > currentDate? creacion(padreTarjetas, events[i]) : false;
    }
}

export function pintarPast(events, padreTarjetas) {
    padreTarjetas.innerHTML = "";
    for (let i = 0; i < events.length; i++) {
        events[i].date < currentDate? creacion(padreTarjetas, events[i]) : false;
    }
}

export function creacion(padreTarjetas, tarjeta) {
    let newTarget = document.createElement("div");
    newTarget.classList.add("row");
    newTarget.classList.add("padre");
    newTarget.style.width = "18rem";
    newTarget.innerHTML = `
    <div class="card col-md border border-success p-2 mb-2 bg-success p-2 text-dark bg-opacity-10">
      <img src="${tarjeta.image}" alt="..." class="img rounded-top">
      <div class="card-body">
        <h5 class="card-title">${tarjeta.name}</h5>
        <p class="card-text">${tarjeta.description}</p>
      </div>
      <div class="card-body">
        <span class="me-4">Price: ${tarjeta.price}</span>
        <a href="${urlQuemada1 + "?id=" + tarjeta._id}" class="card-link btn btn-outline-primary">Details</a>
      </div>
    </div>`;
    padreTarjetas.appendChild(newTarget);
}

export function obtenerCategorias(events) {
    let categorias = [];
    events.forEach(event => {
        !categorias.includes(event.category)? categorias.push(event.category) : false;
    });
    return categorias;
}

export function crearChec(chec, categorias) {
    categorias.forEach((categoria, i) => {
        let chec1 = document.createElement("div");
        chec1.classList.add("form-check");
        chec1.classList.add("form-check-inline");
        chec1.innerHTML = `
      <input class="form-check-input mt-1" name="categorys" type="checkbox" id="inlineCheckbox${i + 1}" value="${categoria}">
      <label class="form-check-label ms-2" for="inlineCheckbox${i + 1}">${categoria}</label>`;
        chec.appendChild(chec1);
    });
}

export function filtro(events) {

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
      </div>` : pintar(filtrar, padreTarjetas);    
}