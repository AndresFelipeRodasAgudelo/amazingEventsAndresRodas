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

    let pastEvents = []
    events.forEach(e => {
      e.date < currandate ? pastEvents.push(e) : false;
    })
    console.log(pastEvents);

    let categorysPast = pastEvents.map(e => e.category)
    console.log(categorysPast);

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
            <td>Events with lowest % of assistance</td>
            <td>Events with larger capacity</td>
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
            <td>Revenues</td>
            <td>Percentage of assitance</td>
          </tr>
          <tr>
            <td>${up[0].category}</td>
            <td>${food}</td>
            <td>${foodPerce}</</td>
          </tr>
          <tr>
            <td>${categorys[1]}</td>
            <td></td>
            <td></td>
          </tr>
           <tr>
            <td>${categorys[4]}</td>
            <td></td>
            <td></td>
          </tr>
           <tr>
            <td>${categorys[8]}</td>
            <td></td>
            <td></td>
          </tr>
           <tr>
            <td>${categorys[13]}</td>
            <td></td>
            <td></td>
          </tr>
           <tr>
            <td>${categorys[15]}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="table-dark">
            <th colspan="3">Past events statistics by category</th>
          </tr>
          <tr>
            <th>Categories</th>
            <td>Revenues</td>
            <td>Percentage of assitance</td>
          </tr>
          <tr>
            <td>${categorysPast[0]}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>${categorysPast[1]}</td>
            <td></td>
            <td></td>
          </tr>
            <tr>
            <td>${categorysPast[2]}</td>
            <td></td>
            <td></td>
          </tr>
            <tr>
            <td>${categorysPast[3]}</td>
            <td></td>
            <td></td>
          </tr>
            <tr>
            <td>${categorysPast[4]}</td>
            <td></td>
            <td></td>
          </tr>
            <tr>
            <td>${categorysPast[5]}</td>
            <td></td>
            <td></td>
          </tr>
           <tr>
            <td>${categorysPast[12]}</td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>`
    console.log(padre);

  })

