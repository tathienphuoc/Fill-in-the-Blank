let range = [2, 5];
let generateBtn = document.getElementById('generate');
let showAnswerBtn = document.getElementById('showAnswer');
let loadingImage = document.getElementById('loadingImage');
let answerTable = document.getElementById('answer');
let blankSection = document.getElementById('blankSection');

function toggleLoadingImage() {
	loadingImage.style.display = loadingImage.style.display == 'none' ? 'flex' : 'none';
	generateBtn.disabled = !generateBtn.disabled;
}

async function generate() {
	toggleLoadingImage();
	blankSection.innerHTML = '';
	let words = document.getElementById('story').value.replace(/  +/g, ' ').split(' ');
	let answer = [];
	let count = 1;
	for (let i = 0; i < words.length; i = i + Math.floor(Math.random() * range[1]) + range[1]) {
		try {
			const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + words[i].replace(/[^a-zA-Z0-9 ]/g, ''));
			const jsonData = await response.json();
			if (jsonData && !jsonData.message) {
				var partOfSpeech = jsonData[0].meanings.map(el => el.partOfSpeech);
				if (partOfSpeech.includes('noun')) {
					answer.push(words[i]);
					words[i] = "<span style='background-color:yellow;padding: 0 60px 0 0;'>(" + count +")</span>";
					count++;
				}
			}
		} catch (e) {
			console.log(e.message);
		}
	}
	blankSection.innerHTML = words.join(' ');
	toggleLoadingImage();
	let html='';
	for (let i = 0; i < answer.length; i++) { 
		html += '<tr><th scope="row">' + (i + 1) + '</th><td>' + answer[i]+'</td></tr>';
	}
	answerTable.innerHTML=html;
}
