let xhr = new XMLHttpRequest();
let selectClient = [];

window.onload = function () {
    let date = new Date();
    let currentDate = "Current Date: " + date.toISOString().slice(0, 10);
    document.getElementById('date').innerHTML = currentDate;
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
         
            document.getElementById("form").innerHTML = xhr.responseText;

        }
      };
      xhr.open("GET", "rental.html", true);
      xhr.send();
}

function searchByName() {
    fetch("rentalclients.json").then(function (response) {
        return response.json();
    }).then(function (data) {
        const search = document.getElementById('name').value.toUpperCase();
        let tbody = document.getElementById('searchresults');
        let output = "";

        for(const row of data){
            if(row.last_name.startsWith(search)){
                output += '<tr><td id = "first">'+ row.first_name + '</td><td id="last">' + row.last_name + 
                '</td><td>'+'<input type="radio" name="select" class="choice" id = "selected" onclick="rentalpage()">'+'</td></tr>';
            let last_name = row.last_name;
            let first_name = row.first_name;
            let address = row.address;
            let state_prov = row.state_prov;
            let email = row.email;
            let phone = row.phone;

            let client = {last_name, first_name,
                          address, state_prov,
                          email, phone}
                
            selectClient.push(client);
            }
        }
        tbody.innerHTML = output;
    });
}

function rentalpage() {
    const checkedmem = document.getElementsByClassName('choice');
    for(let i = 0; i < selectClient.length; i++){
        if (checkedmem[i].checked == true) {
            document.getElementById('lastname').value = selectClient[i].last_name;
            document.getElementById('firstname').value = firstname.value = selectClient[i].first_name;
            document.getElementById('address').value = selectClient[i].address;
            document.getElementById('state').value = selectClient[i].state_prov;
            document.getElementById('email').value = selectClient[i].email;
            document.getElementById('phone').value = selectClient[i].phone;

            document.getElementById('lastname').disabled = false;
            document.getElementById('firstname').disabled = false;
            document.getElementById('address').disabled = false;
            document.getElementById('state').disabled = false;
            document.getElementById('email').disabled = false;
            document.getElementById('phone').disabled = false;
            document.getElementById('days').disabled = false;
        }
    }
}
    


function printresult(event) {
    event.preventDefault();
    let lastname = document.getElementById('lastname');
    let firstname = document.getElementById('firstname');
    let address = document.getElementById('address');
    let state = document.getElementById('state');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let days = document.getElementById('days');

    let result = "";
    let total = 0;
    result += '<h2>Order</h2><p>Name : ' + lastname.value + ' ' + firstname.value + '</p><p>Address : '
                + address.value + '</p><p>State/prov : ' + state.value + '</p><p>Email : ' + email.value + '</p><p>phone : '
                + phone.value + '</p><br>';

    if (document.getElementById('compact').checked) {
        result += '<p>Vehicle : Compact $15/day * ' + days.value + 'day(s) = $' + 15*days.value + '</p>';
        total += 15*days.value;
    }else if (document.getElementById('mid').checked) {
        result += '<p>Vehicle : Mid-size $20/day * ' + days.value + 'day(s) = $' + 20*days.value + '</p>';
        total += 20*days.value;
    }else if (document.getElementById('luxury').checked) {
        result += '<p>Vehicle : Luxury $35/day * ' + days.value + 'day(s) = $' + 35*days.value + '</p>';
        total += 35*days.value;
    }else if (document.getElementById('van').checked) {
        result += '<p>Vehicle : Van/Truck $40/day * ' + days.value + 'day(s) = $' + 40*days.value + '</p>';
        total += 40*days.value;
    }

    if (document.getElementById('roofrack').checked) {
        result += '<p>Roof Rack or Bicycle Rack extra $5/day * ' + days.value + 'day(s) = $' + 5*days.value + '</p>';
        total += 5*days.value;
    }
    if (document.getElementById('gps').checked) {
        result += '<p>GPS extra $10</p>';
        total += 10;
    }
    if (document.getElementById('childseat').checked) {
        result += '<p>Child Seat free</p>';
    }

    result += '<p>--------------------------------------------------------------</p>Total : $' + total;




    document.getElementById('invoice').innerHTML = result;
}