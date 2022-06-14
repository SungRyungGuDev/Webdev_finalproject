let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {

    if(this.readyState == 4 && this.status == 200){
        Valfunc(xhttp); 
       }
}

xhttp.open("GET", "FinalQuiz.xml", true);
xhttp.send();

function Valfunc(xml) { 
	let num, title, answer1, answer2, answer3, answer4, correctAnwer;
	let txt, numtxt, a, b, c, d, xmlDoc, correctAnwers;

	txt = numtxt = ''; 

	xmlDoc = xml.responseXML;

	num = xmlDoc.getElementsByTagName("qnumber");
	title = xmlDoc.getElementsByTagName("qtitle");
	answer1 = xmlDoc.getElementsByTagName("a");
	answer2 = xmlDoc.getElementsByTagName("b");
	answer3 = xmlDoc.getElementsByTagName("c");
	answer4 = xmlDoc.getElementsByTagName("d");

	correctAnwer = xmlDoc.getElementsByTagName("rightanswers");
	correctAnwers = correctAnwer[0].childNodes[0].nodeValue;
	let finalAnwer = correctAnwers.split(",");
	console.log(finalAnwer[1]);
    
	
	for(let i = 0; i < num.length; i++){
	txt = '<p class="question">Question ' + num[i].childNodes[0].nodeValue + ': </p>';
	numtxt = title[i].childNodes[0].nodeValue + "<br>";
	
	a = '<label><input type="radio" name="'+i+'"  id="a'+i+'">' + "A) " + answer1[i].childNodes[0].nodeValue + "<br></label>";
	b = '<label><input type="radio" name="'+i+'"  id="b'+i+'">' + "B) " + answer2[i].childNodes[0].nodeValue + "<br></label>";
	c = '<label><input type="radio" name="'+i+'"  id="c'+i+'">' + "C) " + answer3[i].childNodes[0].nodeValue + "<br></label>";
	d = '<label><input type="radio" name="'+i+'"  id="d'+i+'">' + "D) " + answer4[i].childNodes[0].nodeValue + "<br>" + "<br></label>";
	document.getElementById("problem").innerHTML += txt + numtxt + a + b + c + d;
	}
	
    function onSubmit(event) {
		event.preventDefault();
		let grade = 0;
		if (document.getElementById('b0').checked) {
			console.log(answer2[0].childNodes[0].nodeValue);
			grade++;
		}
		if (document.getElementById('a1').checked) {
			console.log(answer1[1].childNodes[0].nodeValue);
			grade++;
		}
		if (document.getElementById('d2').checked) {
			console.log(answer4[2].childNodes[0].nodeValue);
			grade++;
		}
		if (document.getElementById('a3').checked) {
			console.log(answer1[3].childNodes[0].nodeValue);
			grade++;
		}
		if (document.getElementById('c4').checked) {
			console.log(answer3[4].childNodes[0].nodeValue);
			grade++;
		}
		console.log(grade);

		document.getElementById('result').innerHTML =
		'<p class="summary">Total Grade</p>' +
		'<p class="total">Grade: ' + grade + '/5</p>';
		
		return false;
	}


	document.getElementById('form').onsubmit = onSubmit;

}

