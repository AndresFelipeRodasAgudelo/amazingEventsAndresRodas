let url = window.location.href
let url1 = new URL(url).searchParams.get("id")
let padre = document.querySelector(".padre")

fetch("https://aulamindhub.github.io/amazing-api/events.json")
  .then(res => res.json())
  .then(data => {
   let events = data.events
   
   for (let i = 0; i < events.length; i++) {
    if (events[i]._id == url1) {
      creacion (padre, events[i])
    }
   }
  })


  function creacion (padre, table) {
    let newTable = document.createElement("div")
    newTable.classList.add("col-md-6")
    newTable.classList.add("align-self-center")
    newTable.innerHTML = `
    <img class="w-100 object-fit-cover border rounded" src="${table.image}" alt="concert">`
    padre.appendChild(newTable);
  
    let newTable1 = document.createElement("div")
    newTable1.classList.add("col-md-6")
    newTable1.innerHTML = `
    <h2 class="text-center">${table.name}</h2>
    <ol class="list-group list-group-numbered">
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">date</div>
          ${table.date}
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">description</div>
          ${table.description}
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">category</div>
          ${table.category}
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">place</div>
          ${table.place}
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">capacity</div>
          ${table.capacity}
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">estimate</div>
          ${table.estimate}
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">price</div>
          ${table.price}
        </div>
      </li>
    </ol>`
  
    padre.appendChild(newTable1)
  }