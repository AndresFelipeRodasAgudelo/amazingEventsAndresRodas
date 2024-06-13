import * as myModule from "./module.js";

let padreTarjetas = document.querySelector(".padre");
let events = []

fetch("https://aulamindhub.github.io/amazing-api/events.json")
  .then(res => res.json())
  .then(data => {
    events = data.events
    myModule.pintar(events, padreTarjetas);
  });
