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
        post_word(word);
    } else $(".messages").text(`Word "${word}" already played.`)
}

function startGame() {
    $('.new-game').hide();
    $('.add-word').show();
    time = 60;
    score = 0;
    words = new Set();
}

function endGame(){
    $(".add-word").hide();
    $('.messages').text(`Your Score: ${score}`);
    $('.new-game').show();

    post_score(score);
}

const timer = setInterval(function() {
    time -= 1;
    
    $('.timer').text(time + 's');
    if (time < 0) {
        $('.timer').text('TIME UP!!!')
        clearInterval(1);
        endGame();
    }
}, 1000);

async function post_word(word) {
    $('.messages').text('');

    let response = await axios.post("/check-word", {word});

    $('.messages').text(response.data.result);
    if (response.data.result === 'ok') {
        score += word.length;

        $('ul').append(`<li>${word}</li>`);
    }
}

$form.on('submit', handleSubmit);

$('.new-game').on('click', startGame)

async function post_score(score) {
    
    let response = await axios.post('/update-score', {score}); 
    // console.log('done', response)

}

// class BoggleGame {
//     constructor(boardId, time = 60) {
//         this.time = time;
//         this.showTimer();
//         this.timer = setInterval(this.tick.bind(this), 1000);
//         this.score = 0;
//         this.words = new Set();
//         this.board = $("#" + boardId)

//         $(".add-word", this.board).on('submit', this.handleSubmit.bind(this));
//     }

//     handleSubmit(evt) {
//         evt.preventDefault();
//         button = evt.target;
//         let word = $('.word').val()
        
//         this.post_word(word);
//     }
//     startGame() {
//         $('.new-game').hide();
//         $('.add-word').show();
//         this.time = 60;
//         this.score = 0;
//     }
    
//     endGame(){
//         $(".add-word").hide();
//         $('.messages').text(`Your Score: ${score}`);
//         $('.new-game').show();
    
//         this.post_score(score);
//     }
    
//     timer = setInterval(function() {
//         this.time -= 1;
        
//         $('.timer').text(this.time + 's');
//         if (this.time < 0) {
//             $('.timer').text('TIME UP!!!')
//             this.endGame();
//         }
//     }, 1000);
    
//     async post_word(word) {
//         $('.messages').text('');
    
//         let response = await axios.post("/check-word", {word});
    
//         $('.messages').text(response.data.result);
//         if (response.data.result === 'ok') {
//             score += word.length;
    
//             $('ul').append(`<li>${word}</li>`);
//         }
//     }
    
//     //////////////////how to use event listeners in a class?
//     // $form.on('submit', handleSubmit);
    
//     // $('.new-game').on('click', startGame)
    
//     async post_score(score) {
        
//         let response = await axios.post('/update-score', {score}); 
//         // console.log('done', response) //////////////////should this function do more?
//     }
// }