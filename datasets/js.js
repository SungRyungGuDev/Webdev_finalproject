function menuChoice(choice) {

    let updateElement = document.getElementById("input");
    if (choice == permit) {
        updateElement.innerHTML = `<br>
        <input type="text" id="permitnum" required placeholder="Search by id" onkeyup="searchbyid()">`
    } else if (choice == address){
        updateElement.innerHTML = `<br>
        <input type="text" id="inputadd" required placeholder="Search by address" onkeyup="searchbyadd()">`
    } else{
        updateElement.innerHTML = `<br>
        <input type="text" id="inputcost" required placeholder="Search by estimated cost greater than" onkeyup="searchbycost()">`
    } 
}


function searchbyid() {
    fetch("https://data.calgary.ca/resource/c2es-76ed.json").then(function (response) {
        return response.json();
    }).then(function (data) {
        const inputdata = document.getElementById("permitnum");
        document.getElementById("searchresults").innerHTML = "";
        let output = "";
        for(let i = 0; i < 1000; i++){
            if(data[i].permitnum.toUpperCase().includes(inputdata.value.toUpperCase())){
                output += '<tr><td>'+ data[i].permitnum + '</td><td>' + data[i].originaladdress + '</td><td>' + data[i].permittypemapped + '</td><td>' +
                data[i].latitude + '</td><td>' + data[i].longitude + '</td><td>' + data[i].estprojectcost + '</td><td>' + '<A href = "https://www.google.com/maps/search/?api=1&query=' 
                + data[i].latitude + '%2C' + data[i].longitude + '" target="_blank">Click here to see map</A></td></tr>';
            }
        }
        document.getElementById("searchresults").innerHTML += output;
    });   
}

function searchbyadd() {
    fetch("https://data.calgary.ca/resource/c2es-76ed.json").then(function (response) {
        return response.json();
    }).then(function (data) {
        const inputdata = document.getElementById("inputadd");
        document.getElementById("searchresults").innerHTML = "";
        let output = "";
        for(let i = 0; i < 1000; i++){
            if(data[i].originaladdress.toUpperCase().includes(inputdata.value.toUpperCase())){
                output += '<tr><td>'+ data[i].permitnum + '</td><td>' + data[i].originaladdress + '</td><td>' + data[i].permittypemapped + '</td><td>' +
                data[i].latitude + '</td><td>' + data[i].longitude + '</td><td>' + data[i].estprojectcost + '</td><td>' + '<A href = "https://www.google.com/maps/search/?api=1&query=' 
                + data[i].latitude + '%2C' + data[i].longitude + '" target="_blank">Click here to see map</A></td></tr>';
            }
        }
        document.getElementById("searchresults").innerHTML += output;
    });   
}

function searchbycost() {
    fetch("https://data.calgary.ca/resource/c2es-76ed.json").then(function (response) {
        return response.json();
    }).then(function (data) {
        const inputdata = document.getElementById("inputcost");
        document.getElementById("searchresults").innerHTML = "";
        let output = "";
        for(let i = 0; i < 1000; i++){
            if(parseInt(data[i].estprojectcost) > parseInt(inputdata.value)){
                output += '<tr><td>'+ data[i].permitnum + '</td><td>' + data[i].originaladdress + '</td><td>' + data[i].permittypemapped + '</td><td>' +
                data[i].latitude + '</td><td>' + data[i].longitude + '</td><td>' + data[i].estprojectcost + '</td><td>' + '<A href = "https://www.google.com/maps/search/?api=1&query=' 
                + data[i].latitude + '%2C' + data[i].longitude + '" target="_blank">Click here to see map</A></td></tr>';
            }
        }
        document.getElementById("searchresults").innerHTML += output;
    });   
}

