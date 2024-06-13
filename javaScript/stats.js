fetch("https://aulamindhub.github.io/amazing-api/events.json")
  .then(res => res.json())
  .then(data => {
    let events = data.events
    let currandate = data.currentDate
    console.log(data);

    let past = []
    events.forEach(element => {
      past.length === 0 ? past.push(element) : false
      past[0].assistance < element.assistance ? past.pop() && past.push(element) : false;

    });

    let pastLow = []
    events.forEach(element => {
      pastLow.length === 0 ? pastLow.push(element) : false
      pastLow[0].assistance > element.assistance ? pastLow.pop() && pastLow.push(element) : false;

    });

    let capacitys = []
    events.forEach(element => {
      capacitys.length === 0 ? capacitys.push(element) : false;
      capacitys[0].capacity < element.capacity ? capacitys.pop() && capacitys.push(element) : false;
    });

    let up = []
    events.forEach(e => {
      e.date > currandate ? up.push(e) : false;
    })
    console.log(up);

    let categorys = []
    console.log(categorys);
    for (let i = 0; i < up.length; i++) {
      categorys.push(up[i].category)
    }
    
    let food = up[0].estimate * up[0].price
    let foodPerce = up[0].estimate

    let estimateBooks = up[1].estimate + up[2].estimate + up[3].estimate
    let priceBooks = up[1].price +  up[2].price + up [3].price
    let books = estimateBooks * priceBooks

    let estimateParty = up[4].estimate + up[5].estimate + up [6].estimate  + up[7].estimate 
    let priceParty = up[4].price + up[5].price + up [6].price  + up [7].price
    let party = estimateParty + priceParty

    let estimateRace = up[8].estimate + up[9].estimate + up [10].estimate  + up [11].estimate + up [12].estimate 
    let priceRace = up [8].price + up[9].price + up[10].price + up[11].price  + up [12].price 
    let race = estimateRace * priceRace

    let estimateConcert = up[13].estimate + up[14].estimate
    let priceConcert = up[13].price + up[14].price
    let concert = estimateConcert * priceConcert

    let estimateMuseum = up[15].estimate + up[16].estimate + up [17].estimate  + up[18].estimate 
    let priceMuseum = up[15].price + up[16].price + up [17].price  + up[18].price
    let museum = estimateMuseum * priceMuseum 

    let pastEvents = []
    events.forEach(e => {
      e.date < currandate ? pastEvents.push(e) : false;
    })
    console.log(pastEvents);

    let categorysPast = pastEvents.map(e => e.category)
    console.log(categorysPast);

    let perceFood = pastEvents[0].assistance + pastEvents[6].assistance + pastEvents[7].assistance + pastEvents[8].assistance + pastEvents[9].assistance + pastEvents[10].assistance
    let foodPrice = pastEvents[0].price + pastEvents[6].price + pastEvents[7].price + pastEvents[8].price + pastEvents[9].price + pastEvents[10].price
    let foodPast = perceFood * foodPrice

    let perceMuseum = pastEvents[1].assistance + pastEvents[17].assistance
    let museumPrice = pastEvents[1].price + pastEvents[17].price
    let museumPast = perceMuseum * museumPrice

    let perceConcert = pastEvents[2].assistance + pastEvents[14].assistance + pastEvents[15].assistance + pastEvents[16].assistance
    let concertPrice = pastEvents[2].price + pastEvents[14].price + pastEvents[15].price + pastEvents[16].price
    let concertPast = perceConcert * concertPrice

    let perceRace = pastEvents[3].assistance + pastEvents[13].assistance
    let racePrice = pastEvents[3].price + pastEvents[13].price 
    let racePast= perceRace * racePrice

    let perceBooks = pastEvents[4].assistance + pastEvents[11].assistance
    let booksPrice = pastEvents[4].price + pastEvents[11].price 
    let booksPast = perceBooks * booksPrice

    let cinemaPast = pastEvents[5].assistance * pastEvents[5].price
    let perceCinema = pastEvents[5].assistance

    let partyPast = pastEvents[12].assistance * pastEvents[12].price
    let perceParty = pastEvents[12].assistance

    let padre = document.querySelector(".padre");
    padre.innerHTML = `
  <table class="table mt-3 table1">
        <thead>
          <tr class="table-dark">
            <th colspan="3">
              Events Statistics
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th> Events with higuest % of assistance</th>
            <th>Events with lowest % of assistance</th>
            <th>Events with larger capacity</th>
          </tr>
          <tr>
            <td>${past[0].name} whith a assistance of ${past[0].assistance} people</td>
            <td>${pastLow[0].name} whith a assistance of ${pastLow[0].assistance} people</td>
            <td>${capacitys[0].name} whith a capacity of ${capacitys[0].capacity} people  </td>
          </tr>
          <tr class="table-dark">
            <th colspan="3">
              Upcoming events statistics by category
            </th>
          </tr>
          <tr>
            <th>Categories</th>
            <th>Revenues</th>
            <th>Estimated assitance percentage</th>
          </tr>
          <tr>
            <td>${up[0].category}</td>
            <td>$ ${food}</td>
            <td>${foodPerce}</</td>
          </tr>
          <tr>
            <td>${categorys[1]}</td>
            <td>$ ${books}</td>
            <td>${estimateBooks}</td>
          </tr>
           <tr>
            <td>${categorys[4]}</td>
            <td>$ ${party}</td>
            <td>${estimateParty}</td>
          </tr>
           <tr>
            <td>${categorys[8]}</td>
            <td>$ ${race}</td>
            <td>${estimateRace}</td>
          </tr>
           <tr>
            <td>${categorys[13]}</td>
            <td>$ ${concert}</td>
            <td>${estimateConcert}</td>
          </tr>
           <tr>
            <td>${categorys[15]}</td>
            <td>$ ${museum}</td>
            <td>${estimateMuseum}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="table-dark">
            <th colspan="3">Past events statistics by category</th>
          </tr>
          <tr>
            <th>Categories</th>
            <th>Revenues</th>
            <th>Percentage of assitance</th>
          </tr>
          <tr>
            <td>${categorysPast[0]}</td>
            <td>$ ${foodPast}</td>
            <td>${perceFood}</td>
          </tr>
          <tr>
            <td>${categorysPast[1]}</td>
            <td>$ ${museumPast}</td>
            <td>${perceMuseum}</td>
          </tr>
            <tr>
            <td>${categorysPast[2]}</td>
            <td>$ ${concertPast}</td>
            <td>${perceConcert}</td>
          </tr>
            <tr>
            <td>${categorysPast[3]}</td>
            <td>$ ${racePast}</td>
            <td>${perceRace}</td>
          </tr>
            <tr>
            <td>${categorysPast[4]}</td>
            <td>$ ${booksPast}</td>
            <td>${perceBooks}</td>
          </tr>
            <tr>
            <td>${categorysPast[5]}</td>
            <td>$ ${cinemaPast}</td>
            <td>${perceCinema}</td>
          </tr>
           <tr>
            <td>${categorysPast[12]}</td>
            <td>$ ${partyPast}</td>
            <td>${perceParty}</td>
          </tr>
        </tfoot>
      </table>`
    console.log(padre);

  })

