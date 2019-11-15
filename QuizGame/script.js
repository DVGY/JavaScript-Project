// CODING CHALLENGE
/*
--- Let's build a fun quiz game in the console! ---
1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)
2. Create a couple of questions using the constructor
3. Store them all inside an array
4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).
5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.
6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).
7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

/*--- Expert level-- -
8. After you display the result, display the next random question, so that the game never ends(Hint: write a function for this and call it right after displaying the result)
9. Be careful: after Task 8, the game literally never ends.So include the option to quit the game if the user writes 'exit' instead of the answer.In this case, DON'T call the function from task 8.
10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).
11. Display the score in the console.Use yet another method for this.
*/
//Note: You can also use function calling a function instead of using while loop

(function() {
  var answerList = [2, 1, 4, 3];
  var questionList = [
    "Q1. What is Capital of India \n1.Mumbai\n2.Delhi\n3.Kochi\n4.Kolkata",
    "Q2. In which state statue of unity located\n1.Gujrat\n2.Rajasthan\n3.Daman n Diu\n4.Maharashtra",
    "Q3. Which programming language is this\n1.c++\n2.Java\n3.JSON\n4.Javascript",
    "Q4. What is your name\n1.Sangram\n2.Kamal\n3.Gaurav\n4.Devender"
  ];
  var dispQuestion, sum;
  sum = 0;
  function Question(questionList, answerList, answer) {
    this.selectRandomQuestion = function() {
      dispQuestion = Math.floor(Math.random() * 4);
      console.log(questionList[dispQuestion]);
      return questionList[dispQuestion];
    };

    this.checkAnswer = function(answer) {
      if (answer == answerList[dispQuestion]) {
        console.log("Correct answer");
        sum += 1;
        console.log("Your score is " + sum);
      } else if (answer === "exit") {
        return false;
      } else {
        console.log("Wrong answer");
        sum -= 1;
        console.log("Your score is " + sum);
      }
    };
  }
  var input = new Question(questionList, answerList, answer);
  while (true) {
    input.selectRandomQuestion();
    var answer = prompt("Answer the following question");

    if (answer) {
      var exitQuiz = input.checkAnswer(answer);
      if (exitQuiz == false) {
        break;
      }
    }
  }
  // Function calling function itself.
  /* function nextQuestionCall() {
    var input = new Question(questionList, answerList, answer);

    input.selectRandomQuestion();
    var answer = prompt("Answer the following question");

    if (answer !== "exit") {
      input.checkAnswer(answer);
      nextQuestionCall();
    }
  }
  nextQuestionCall(); */
})();
