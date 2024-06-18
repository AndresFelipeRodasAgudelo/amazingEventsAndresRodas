fetch("https://aulamindhub.github.io/amazing-api/events.json")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    let events = data.events
    let asis = asistence(events)
    let capacity = capacityss(events)
    let mayorCap = capacity.pop()
    let asistencia = mayorAsis(asis)
    let mayorAsistencia = asistencia.pop()
    let menorAsistencia = asistencia.shift()
    console.log(events);

    function mayorAsis(array) {
      return array.map(e => {
        return {
          name: e.name,
          assistance: e.assistance / e.capacity * 100
        }
      }
      ).sort((a, b) => a.assistance - b.assistance)
    }

    function asistence(event) {
      return event.filter(e => e.assistance !== undefined).sort((a, b) => a.assistance - b.assistance)
    }
    function capacityss(event) {
      return event.filter(e => e.capacity).sort((a, b) => a.capacity - b.capacity)
    }

    let currentDate = data.currentDate
    let eventsByDate = eventFilter(events, currentDate);

    let statsPastEvents = calculateStatsByCategory(eventsByDate.pastEvents)
    let statUpcomingEvents = calculateStatsByCategory(eventsByDate.upcomingEvents)
    console.log(statsPastEvents);
    console.log(statUpcomingEvents);
    let { Books } = statUpcomingEvents
    let { Concert } = statUpcomingEvents
    let { Food } = statUpcomingEvents
    let { Museum } = statUpcomingEvents
    let { Party } = statUpcomingEvents
    let { Race } = statUpcomingEvents
    let perceAsis1 = Books.totalAssistence / Books.totalCapacity * 100
    console.log(perceAsis1);


    function calculateStatsByCategory(events) {
      let categories = {}
      events.forEach(event => {
        let assistance = event.assistance ?? event.estimate
        let capacity = event.capacity

        if (!categories[event.category]) {
          categories[event.category] = {
            name: event.category,
            "revenues": 0,
            "totalAssistence": 0,
            "totalCapacity": 0,
            "perceAsis": 0
          }
        }

        categories[event.category].revenues += assistance * event.price
        categories[event.category].totalAssistence += assistance
        categories[event.category].totalCapacity += capacity
        categories[event.category].perceAsis = assistance / capacity * 100     
       
      })
      
      return categories

    }

    function eventFilter(events, currentDate) {
      let upcomingEvents = []
      let pastEvents = []
      events.forEach(event => {
        event.date >= currentDate ? upcomingEvents.push(event) : pastEvents.push(event)
      })
      return {
        "upcomingEvents": upcomingEvents,
        "pastEvents": pastEvents
      }
    }

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
              <td>${mayorAsistencia.name} whith a assistance of ${mayorAsistencia.assistance.toFixed(2)}%</td>
              <td>${menorAsistencia.name} whith a assistance of ${menorAsistencia.assistance}%</td>
              <td>${mayorCap.name} whith a capacity of ${mayorCap.capacity} people  </td>
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
              <td>${Books.name}</td>
              <td>$ ${Books.revenues}</td>
              <td>${(Books.totalAssistence / Books.totalCapacity * 100).toFixed(2)}%</td>
            </tr>
            <tr>
              <td>${Concert.name}</td>
              <td>$ ${Concert.revenues}</td>
              <td>${(Concert.totalAssistence / Concert.totalCapacity * 100).toFixed(2)}%</td>
            </tr>
             <tr>
              <td>${Food.name}</td>
              <td>$ ${Food.revenues}</td>
              <td>${(Food.totalAssistence / Food.totalCapacity * 100).toFixed(2)}%</td>
            </tr>
             <tr>
              <td>${Museum.name}</td>
              <td>$ ${Museum.revenues}</td>
              <td>${(Museum.totalAssistence / Museum.totalCapacity * 100).toFixed(2)}%</td>
            </tr>
             <tr>
              <td>${Party.name}</td>
              <td>$ ${Party.revenues}</td>
              <td>${(Party.totalAssistence / Party.totalCapacity * 100).toFixed(2)}%</td>
            </tr>
             <tr>
              <td>${Race.name}</td>
              <td>$ ${Race.revenues}</td>
              <td>${(Race.totalAssistence / Race.totalCapacity * 100).toFixed(2)}%</td>
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
              <td>${statsPastEvents.Books.name}</td>
              <td>$ ${statsPastEvents.Books.revenues}</td>
              <td>${(statsPastEvents.Books.totalAssistence / statsPastEvents.Books.totalCapacity * 100).toFixed(2)}%</td>
            </tr>
            <tr>
              <td>${statsPastEvents.Concert.name}</td>
              <td>$ ${statsPastEvents.Concert.revenues}</td>
              <td>${(statsPastEvents.Concert.totalAssistence / statsPastEvents.Concert.totalCapacity * 100).toFixed(2)}%</td>
            </tr>
              <tr>
              <td>${statsPastEvents.Food.name}</td>
              <td>$ ${statsPastEvents.Food.revenues}</td>
              <td>${(statsPastEvents.Food.totalAssistence / statsPastEvents.Food.totalCapacity * 100).toFixed(2)}%</td>
            </tr>
              <tr>
              <td>${statsPastEvents.Museum.name}</td>
              <td>$ ${statsPastEvents.Museum.revenues}</td>
              <td>${(statsPastEvents.Museum.totalAssistence / statsPastEvents.Museum.totalCapacity * 100).toFixed(2)}%</td>
            </tr>
              <tr>
              <td>${statsPastEvents.Party.name}</td>
              <td>$ ${statsPastEvents.Party.revenues}</td>
              <td>${(statsPastEvents.Party.totalAssistence / statsPastEvents.Party.totalCapacity * 100).toFixed(2)}%</td>
            </tr>
              <tr>
              <td>${statsPastEvents.Cinema.name}</td>
              <td>$ ${statsPastEvents.Cinema.revenues}</td>
              <td>${(statsPastEvents.Cinema.totalAssistence / statsPastEvents.Cinema.totalCapacity * 100).toFixed(2)}%</td>
            </tr>
             <tr>
              <td>${statsPastEvents.Race.name}</td>
              <td>$ ${statsPastEvents.Race.revenues}</td>
              <td>${(statsPastEvents.Race.totalAssistence / statsPastEvents.Race.totalCapacity * 100).toFixed(2)}%</td>
            </tr>
          </tfoot>
        </table>`

  })