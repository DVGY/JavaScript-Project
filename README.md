## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is simple Lorem ipsum dolor generator.
	
## Technologies
Project is created with:
* Lorem version: 12.3
* Ipsum version: 2.33
* Ament library version: 999
	
## Setup
To run this project, install it locally using npm:





# Table of contents
* [Project List](#project-list)
* [Technologies](#technologies)
* [Setup](#setup)



##Project List

**It contians projects from online JavaScript Course done from Udemy.**

*1. PigGame*

*2. QuizGame Console*

## PIG GAME DESCRIPTION 

#### Game Rules 

 The game has 2 players, playing in rounds
-  In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
-  BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
-  The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
-  The first player to reach 100 points on GLOBAL score wins the game

#### Game Challenges 

Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

## QUIZ GAME DESCRIPTION





#### Let's build a fun quiz game in the console and here are rules

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
8. After you display the result, display the next random question, so that the game never ends(Hint: write a function for this and call it right after displaying the result)
9. Be careful: after Task 8, the game literally never ends.So include the option to quit the game if the user writes 'exit' instead of the answer.In this case, DON'T call the function from task 8.
10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).
11. Display the score in the console.Use yet another method for this.
