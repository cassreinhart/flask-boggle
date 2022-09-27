const $form = $(".add-word");
const $timer = $(".timer");
let time;
let score;
let words;

startGame();

function handleSubmit(evt) {
    evt.preventDefault();
    button = evt.target;
    let word = $('.word').val()
    
    $('.word').val('');

    if (!words.has(word)){
        words.add(word);
        postWord(word);
    } else $(".messages").text(`Word "${word}" already played.`)
}

function startGame() {
    $('.new-game').hide();
    $('.add-word').show();
    time = 60;
    score = 0;
    words = new Set();
    startTimer();
}

function endGame(){
    $(".add-word").hide();
    $('.messages').text(`Your Score: ${score}`);
    $('.new-game').show();

    postScore(score);
}

function startTimer(){
    setInterval(function() {
    time -= 1;
    
    $('.timer').text(time + 's');
    if (time === 0) {
        $('.timer').text('TIME UP!!!')
        clearInterval(1);
        endGame();
    }
}, 1000);} //wrap in a function

async function postWord(word) {
    $('.messages').text('');

    let response = await axios.post("/check-word", {word});
    console.log()
    $('.messages').text(response.data.result);
    if (response.data.result === 'ok') {
        score += word.length;

        $('ul').append(`<li>${word}</li>`);
    }
}

$form.on('submit', handleSubmit);

$('.new-game').on('click', startGame)

async function postScore(score) {
    
    let response = await axios.post('/update-score', {score}); 
    // console.log('done', response)

}

class BoggleGame {
    constructor(time = 60) {
        this.time = time;
        this.startTimer();
        this.timer = setInterval(this.tick.bind(this), 1000); //start interval once instantiated
        this.score = 0;
        this.words = new Set();

        $form.on('submit', this.handleSubmit);

        $('.new-game').on('click', startGame);
        // $(".add-word", this.board).on('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(evt) {
        evt.preventDefault();
        button = evt.target;
        let word = $('.word').val()
        
        this.postWord(word);
    }
    startGame() {
        $('.new-game').hide();
        $('.add-word').show();
        this.time = 60;
        this.score = 0;
    }
    
    endGame(){
        $(".add-word").hide();
        $('.messages').text(`Your Score: ${score}`);
        $('.new-game').show();
    
        this.postScore(score);
    }
    
    startTimer(){
        setInterval(function() {
        this.time -= 1;
        
        $('.timer').text(this.time + 's');
        if (this.time <= 0) {
            $('.timer').text('TIME UP!!!')
            clearInterval(1);
            this.endGame();
        }
    }, 1000);}
    
    async post_word(word) {
        $('.messages').text('');
    
        let response = await axios.post("/check-word", {word});
    
        $('.messages').text(response.data.result);
        if (response.data.result === 'ok') {
            score += word.length;
    
            $('ul').append(`<li>${word}</li>`);
        }
    }
    
    //////////////////how to use event listeners in a class?
    // $form.on('submit', handleSubmit);
    
    // $('.new-game').on('click', startGame)
    
    async postScore(score) {
        
        let response = await axios.post('/update-score', {score}); 
        // console.log('done', response) //////////////////should this function do more?
    }
}