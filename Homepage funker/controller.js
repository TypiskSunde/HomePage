var words = [
    'hjem','get','academy','eple','sommer','solen','vinter','hei','hallo',
    'båt','dyr','boks','Norge','norge','basket','fotball','ball','bokstav',
    'lys','sitron','melodi','mus','munn','film','musikk','mario','nese',
    'appelsin','oksygen','tegne','tegning','verktøy','sverige','Sverige',
    'tv','universet','vampyr','video','gaming','spill','by','fylke','land',
    'vindu','vinduet','vann','vannflaske','vind','ord','youtube','hode',
    'ferie','helg','italia','kjøkken','hus','headsett','trygghet','nøkkel',
    'nøkkelkompetanse','team','programmering','koding','montør','elefant'
    ];

    var hangman = [
        {from: [70, 38], to: [72, 46]},
        {from: [70, 38], to: [68, 46]},
        {from: [70, 45], to: [72, 55]},
        {from: [70, 45], to: [68, 55]},
        {from: [70, 35], to: [70, 45]},

        {circle: [70, 30], radius: 2},

        {from: [70, 5], to: [70, 25]},

        {from: [30, 5], to: [70, 5]},

        {from: [30, 95], to: [30, 5]},

        {from: [1, 95], to: [99, 95]}
        
        ];

        // Get stats

        var stats = {streak : 0, scores: []};

        if (typeof(storage) !== "undefined") {
            if (localStorage.hangman !== undefined) {
                stats = JSON.parse(localStorage.hangman);

                setScore();
            }
        }

        var word, currentWord, guessesLeft, guessed;
generateWord();
function generateWord() {
  currentWord = [], guessesLeft = 10, guessed = [];
  document.querySelector('.guessesLeft').querySelector('span').innerHTML = guessesLeft;
  document.querySelector('.guessed').querySelector('span').innerHTML = '';
  document.querySelector('input').style.display = null;
  document.querySelector('button').style.display = 'none';
  document.querySelector('.hangman').innerHTML = '';
  word = words[Math.floor(Math.random() * words.length)];
  console.log(word);
  let html = '';
  for (let i = 0; i < word.length; i++) {
    if (word[i] == ' ') {
      currentWord[i] = word[i];
      html += '<span class="hidden" style="border:none;"></span>';
    } else html += '<span class="hidden"></span>';
  }
  document.querySelector('.word').innerHTML = html;
}

// check input
document.querySelector('input').addEventListener('change', function() {
  if (this.value !== "" && this.value !== " ") {
    if (this.value.length > 1) {
      if (this.value.length !== word.length) alert('Gjetningen din er ikke like lang som ordet!');
      else if (this.value == word) {
        for (let i = 0; i < word.length; i++) {
          document.querySelector('.word').querySelectorAll('span')[i].innerHTML = word[i];
        }
        finish();
      }
      else {
        drawHangman();
        drawHangman();
        fadeColor('#ff2929');
      }
    } else if (this.value.match(/^[A-Za-z]+$/)) {
      let alreadyGuessed = false;
      for (let i = 0; i < guessed.length; i++) {
        if (guessed[i] === this.value.toLowerCase()) {
          alreadyGuessed = true;
          break;
        }
      }
      if (!alreadyGuessed) {
        guessed.push(this.value.toLowerCase());
        let wordHasLetter = false;
        for (let i = 0; i < word.length; i++) {
          if (word[i] === this.value.toLowerCase()) {
            wordHasLetter = true;
            document.querySelector('.word').querySelectorAll('span')[i].innerHTML = word[i];
            currentWord[i] = word[i];
          }
        }
        if (!wordHasLetter) {
          fadeColor('#ff2929');
          drawHangman();
          let guessedElem = document.querySelector('.guessed').querySelector('span');
          if (guessedElem.innerHTML == '') guessedElem.innerHTML = this.value.toUpperCase();
          else guessedElem.innerHTML += ', ' + this.value.toUpperCase();
        } else fadeColor('#35c435');
      } else alert('Du har allerede gjettet denne bokstaven!');
      if (currentWord.join('') === word) finish();
    } else alert('Please guess letters only');
    this.value = '';
    if (guessesLeft <= 0) {
      guessesLeft = 0;
      for (let i = 0; i < word.length; i++) {
        if (document.querySelector('.word').querySelectorAll('span')[i].innerHTML == '') {
          document.querySelector('.word').querySelectorAll('span')[i].style.color = 'red';
          document.querySelector('.word').querySelectorAll('span')[i].innerHTML = word[i];
        }
      }
      // fadeColor('#ff2929');
      alert('Du tapte!');
      document.querySelector('input').style.display = 'none';
      document.querySelector('button').style.display = null;
      stats.streak = 0;
      stats.scores.push(0);
      setScore();
    }
    document.querySelector('.guessesLeft').querySelector('span').innerHTML = guessesLeft;
  }
});
        function fadeColor(color) {
            document.body.style.background = color;
            setTimeout(function() {
                document.body.style.background = null;
            }, 200);
        }

        function finish() {
            var wrongGuesses = (10 - guessesLeft);

            // var rightGuesses = guessed.length - wrongGuesses;

            var rightGuesses = word.length;
            let score = Math.floor((rightGuesses / (wrongGuesses + rightGuesses)) * 100) || 100;

            alert('Gratulerer! Score: ' + score + '%');

            stats.streak++;

            stats.scores.push(score);

            setScore();

            fadeColor('lightblue');

            document.querySelector('input').style.display = 'none';
            document.querySelector('button').style.display = null;
        }

        // Spill igjen

        document.querySelector('button').addEventListener('click', generateWord);

        function setScore() {
            let score = '-';

            for ( let i = 0; i < stats.scores.length; i++) {
                if (score == '-') score = 0;
                score += stats.scores[i];
            }
            
            if (score !== '-') score = Math.floor(score / stats.scores.length) + '%';

            document.querySelector('.streak').innerHTML = stats.streak;
            document.querySelector('.score').innerHTML = score;

            localStorage.hangman = JSON.stringify(stats);
        }

        function drawHangman() {
            guessesLeft--;

            let part = hangman[guessesLeft];

            let hangmanLines = document.querySelector('.hangman').querySelectorAll('svg');

            for (let i = 0; i < hangmanLines.length; i++) {
                hangmanLines[i].children[0].classList.remove('draw');
            }

            let svg;

            if (part.circle == undefined) {
                svg = '<svg><line class="draw" x1="' + part.from[0] + '%" y1="' + part.from[1] + '%" x2="' + part.to[0] + '%" y2="' + part.to[1] + '%"/></svg>';

            } else  {
                svg = '<svg><circle class="draw" cx="' + part.circle[0] + '%" cy="' + part.circle[1] + '%" r="' + part.radius + '%"/></svg>';
            }

            document.querySelector('.hangman').innerHTML += svg;
        }


