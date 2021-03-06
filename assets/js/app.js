let audio = new Audio("/audios/music.mp3");

let isClickedOnce = false;
function click_play() {
	if (isClickedOnce) {
		return false;
	}
	audio.play()
	isClickedOnce = true;
}

audio.addEventListener("ended", function(){ 
	window.open('','_self').close(); 
});
	

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// ?Έ?€?΄?€ ??±
const recognition = new SpeechRecognition();

// trueλ©? ?? ? ?°?? ?Όλ‘? ?Έ??? falseλ©? ? ?? λ§? κΈ°λ‘?¨
recognition.interimResults = true;
// κ°μ΄ ??Όλ©? HTML? <html lang="en">? μ°Έκ³ ?©??€. ko-KR, en-US
recognition.lang = "ko-KR";
// true means continuous, and false means not continuous (single result each time.)
// trueλ©? ??± ?Έ??΄ ? ??κ³? κ³μ ?©??€.
recognition.continuous = true;
// ?«?κ°? ???λ‘? λ°μ???λ‘? ? κ³?, ?¬λ©? λ¬Έμ₯? ? ?©?? ?°?Ό ?λ§μ?? ?¨?΄λ‘? ???μ²΄ν©??€.
// maxAlternativesκ°? ?¬λ©? ?΄?? ?¨?΄? λ¬Έμ₯? ? ?©?κ²? ??? ?? ?©??€.
recognition.maxAlternatives = 10000;

let p = document.createElement("p");
p.classList.add("para");

let words = document.querySelector(".words");
words.appendChild(p);

let speechToText = "";
recognition.addEventListener("result", (e) => {
  let interimTranscript = "";
  for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
    let transcript = e.results[i][0].transcript;
	
	
	let j = 0;
	for (j = transcript.length - 1; j >= 0; j--) {
		if (transcript[j] == ' ') {
			break;
		}
	}
	let one_word = transcript.slice(j+1, transcript.length);
	console.log(one_word);
	if (one_word == "?¬?") {
		audio.play();
	}
	else if (one_word == "? μ§?") {
		audio.pause();
	}
	else if (one_word == "?€?") {
		audio.load();
	}
	
	
    if (e.results[i].isFinal) {
      speechToText += transcript;
    } else {
      interimTranscript += transcript;
    }
  }
  document.querySelector(".para").innerHTML = speechToText + interimTranscript;
});

// ??±?Έ??΄ ??λ©? ???Όλ‘? ?¬???©??€.
// recognition.addEventListener("end", recognition.start);

// ??± ?Έ? ??
recognition.start();