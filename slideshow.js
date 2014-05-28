var slides = [];

(function loadSlide(i) {
	var filename = "slide" + (i < 10 ? "0" : "") + i +  ".html";
	var xhr = new XMLHttpRequest();
	xhr.open('GET', filename, false);
	xhr.send(null);
	if (xhr.status === 200) {
		var slide = document.createElement('section');
		slide.innerHTML = xhr.responseText;
		slides[i] = slide;
		loadSlide(i+1);
	}
})(1);

var nav = document.createElement('div');
nav.setAttribute('id', 'nav');
nav.innerHTML = "<button id='back'>&lt;</button> <span id='pagenum'></span> <button id='next'>&gt;</button>";
document.body.appendChild(nav);
var backButton = document.getElementById('back');
var nextButton = document.getElementById('next');
var pageNumber = document.getElementById('pagenum');


var i = undefined;

function showSlide(j) {
	if (i !== undefined) document.body.removeChild(slides[i]);
	i = j;
	document.body.appendChild(slides[i]);
	if (i === 1) backButton.setAttribute('disabled', ''); else backButton.removeAttribute('disabled');
	if (i === slides.length - 1) nextButton.setAttribute('disabled', ''); else nextButton.removeAttribute('disabled');
	pageNumber.innerText = i;
	history.replaceState(i, null, "#" + i);
}

backButton.addEventListener('click', function() { showSlide(i-1) }, false);
nextButton.addEventListener('click', function() { showSlide(i+1) }, false);		
window.addEventListener('keydown', function(e) {
	if (e.keyCode === 39) {
		if (i < slides.length - 1) {
			if (e.shiftKey) showSlide(slides.length - 1); else showSlide(i+1);
		}
		e.preventDefault();			
	} else if (e.keyCode === 37) {
		if (i > 1) {
			if (e.shiftKey) showSlide(1); else showSlide(i-1);
		}
		e.preventDefault();
	}
}, true);

function onPopstate(e) {
	var i = parseInt(window.location.hash.substr(1), 10) || 1;
	if (i < 1) i = 1;
	if (i > slides.length) i = slides.length - 1;
	showSlide(i);
}
window.addEventListener('popstate', onPopstate, false);
onPopstate();
