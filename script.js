let range = [2, 5];


function toggleVisible(element) {
	element.style.color = element.style.color == 'yellow' ? 'red' : 'yellow';
}

function showAllAnswer(el) {
	el.innerHTML = el.innerHTML == 'Show All' ? 'Hide All' : 'Show All';
	let color;
	if (el.innerHTML == 'Show All') {
		el.innerHTML = 'Hide All';
		color = 'red';
	} else {
		el.innerHTML = 'Show All';
		color = 'yellow';
	}
	let spans = document.getElementsByName('answer');
	for (let i = 0; i < spans.length; i++) {
		spans[i].style.color = color;
	}
}

function toggleLoadingImage() {
	let loadingImage = document.getElementById('loadingImage');
	loadingImage.style.display = loadingImage.style.display == 'flex' ? 'none' : 'flex';
}

async function generate() {
	toggleLoadingImage();
	let words = document.getElementById('story').value.replace(/  +/g, ' ').split(' ');
	let count = 1;
	for (let i = 0; i < words.length; i = i + Math.floor(Math.random() * range[1]) + range[1]) {
		try {
			const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + words[i].replace(/[^a-zA-Z0-9 ]/g, ''));
			const jsonData = await response.json();
			if (jsonData && !jsonData.message) {
				var partOfSpeech = jsonData[0].meanings.map(el => el.partOfSpeech);
				if (partOfSpeech.includes('noun')) {
					count++;
					words[i] = "<span style='background-color:yellow'>(" + count + ")<span name='answer' style='color: yellow; padding: 0 5px ; cursor : pointer; font-weight:bold' onclick='toggleVisible(this)'>" + words[i] + "</span></span>";
				}
			}
		} catch (e) {
		}
	}
	document.getElementById('result').innerHTML = words.join(' ');
	toggleLoadingImage();
}
