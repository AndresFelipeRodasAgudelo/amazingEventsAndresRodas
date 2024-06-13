import * as myModule from "./module.js";

let events =[]
let padreTarjetas = document.querySelector(".padre");

fetch("https://aulamindhub.github.io/amazing-api/events.json")
  .then(res => res.json())
  .then(data => {
    events = data.events
    myModule.pintarPast(events, padreTarjetas)
  })