

const startHtml= `<p>Test your Geography knowledge</p>
<button  class="btn btn_start">Start Quiz</button>`;
const quizInfo = {
q_number:0,
score:0
};               

const questionHtml = (id) => `<div class="col-12 quiz_info">
<span class="serial_no" id="q_num">
${quizInfo.q_number+1}/${STORE.questions.length} Questions
</span>
<span class="score">
<span id="score">  ${quizInfo.score}</span>/${STORE.questions.length} Score
</span>
</div>
<form class="js-form" data-id=${id}>
 <fieldset>
 <legend>
    ${STORE.questions[id].question}
 </legend>
    <div class="options row">
     
     </div>
    
 </fieldset>
 </form>`;            

function startQuiz()
{
quizInfo.q_number =0;
quizInfo.score=0;
$('.js-quiz-box').html(startHtml);
$('body').on('click','.btn_start',function(){
createQuestion();
})
}

function displayQuestion(){
$('body').on('click','.btn_next',function(){
createQuestion();
});
}


function createQuestion()
{ 

let option_list = "";
let id = quizInfo.q_number;
if(id < STORE.questions.length-1){
$('.js-quiz-box').html(questionHtml(id));
let options = STORE.questions[id].options;

options.forEach((option,index) => {
option_list = option_list +  `<div class="row">
         <input type="radio" required value=${STORE.questions[id].options[index]} name="options" id="options_${index}" tabindex="${index}" >
         <label for="options${index}">${STORE.questions[id].options[index]}</label>
         <div class="show_result row">
         <span id="result_${index}" class="hide"></span></div>
         </div>`;
});
option_list = option_list + `
        <button type="submit" class="btn btn_submit">Submit</button>
 
        <button class="btn btn_next hide">Next >>></button>
        `;

$('.js-quiz-box').find('.options').html(option_list);
}
else{
displayResults();
}

}



function submitAnswer(){
$(document).on('click','button[type="submit"]',function(event){
event.preventDefault();
let select_index = $('input[type="radio"]:checked','.js-form').attr('id').split('_')[1];
updateQuizInfo(select_index,quizInfo.q_number);

});
}


function updateQuizInfo(select_index,s_num){
$(`#result_*`).text('');
let right_ans = STORE.questions[s_num].correct;

if(STORE.questions[s_num].options[select_index]=== right_ans){
$(`#result_${select_index}`).toggleClass('hide').text("Good Job! you got it right").parent().addClass('correct');
(quizInfo.q_number > STORE.questions.length-1)?displayResults(): quizInfo.q_number += 1;
quizInfo.score += 1;
$('#score').text(quizInfo.score);
}
else{
$(`#result_${select_index}`).toggleClass('hide').text("Sorry! the correct answer is "+ right_ans).parent().addClass('incorrect');
(quizInfo.q_number > STORE.questions.length-1)?displayResults(): quizInfo.q_number += 1;
}
$("input[type='radio']").attr('disabled',true);

$('.btn_next').toggleClass('hide');
$('.btn_submit').toggleClass('hide');

}

function displayResults(){
console.log('restart');
$('.js-quiz-box').html(`<div class="col-12 score_board">

<p>Your score is ${quizInfo.score}/${STORE.questions.length}</p>
<button class="btn btn_restart" >Restart Quiz</button>
</div>`);
}

function restartQuiz(){
$('body').on('click','.btn_restart',function(){
quizInfo.q_number=0;
quizInfo.score=0;
createQuestion();
});
}






function loadApp(){
startQuiz();
displayQuestion();
submitAnswer();
restartQuiz();
}


$(loadApp());


