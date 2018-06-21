(function () {
	const myQuestions = [
		{
			question: "Great Whites and Hammerheads are what type of animals?",
			answers: {
				a: "Dogs",
				b: "Cats",
				c: "Sharks"
			},
			correctAnswer: "c"
		},
		{
			question: "What is the name of the pirate in Peter Pan?",
			answers: {
				a: "Captain Jake",
				b: "Captain Hook",
				c: "Captain Sparrow"
			},
			correctAnswer: "b"
		},
		{
			question: "How many rings make up the symbol of the Olympic Games?",
			answers: {
				a: "Four",
				b: "Six",
				c: "Five"
			},
			correctAnswer: "c"
		},
		{
			question: "According to the Dr. Seuss book, who stole Christmas?",
			answers: {
				a: "The Grinch",
				b: "Thing One",
				c: "Horton"
			},
			correctAnswer: "a"
		},
		{
			question: "Is the planet Jupiter larger or smaller than the Earth?",
			answers: {
				a: "Smaller",
				b: "Larger",
			},
			correctAnswer: "b"
		},
		{
			question: "In which continent is the country of Egypt found?",
			answers: {
				a: "South America",
				b: "Europe",
				c: "Africa"
			},
			correctAnswer: "c"
		},
		{
			question: "Scooby Doo and his friends travel around in which vehicle?",
			answers: {
				a: "The Mystery Machine",
				b: "The Ghost Mobile",
				c: "The Shaggy Van"
			},
			correctAnswer: "a"
		},
		{
			question: "Which is the fastest land animal?",
			answers: {
				a: "Panther",
				b: "Ostrich",
				c: "Cheetah"
			},
			correctAnswer: "c"
		},
	];

	function buildQuiz() {
		// we'll need a place to store the HTML output
		const output = [];

		// for each question...
		myQuestions.forEach((currentQuestion, questionNumber) => {
			// we'll want to store the list of answer choices
			const answers = [];

			// and for each available answer...
			for (letter in currentQuestion.answers) {
				// ...add an HTML radio button
				answers.push(
					`<label>
				   <input type="radio" name="question${questionNumber}" value="${letter}">
					${letter} :
					${currentQuestion.answers[letter]}
				 </label>`
				);
			}

			// add this question and its answers to the output
			output.push(
				`<div class="slide">
				 <div class="question"> ${currentQuestion.question} </div>
				 <div class="answers"> ${answers.join("")} </div>
			   </div>`
			);
		});

		// finally combine our output list into one string of HTML and put it on the page
		quizContainer.innerHTML = output.join("");
	}

	function showResults() {
		// gather answer containers from our quiz
		const answerContainers = quizContainer.querySelectorAll(".answers");

		// keep track of user's answers
		let numCorrect = 0;

		// for each question...
		myQuestions.forEach((currentQuestion, questionNumber) => {
			// find selected answer
			const answerContainer = answerContainers[questionNumber];
			const selector = `input[name=question${questionNumber}]:checked`;
			const userAnswer = (answerContainer.querySelector(selector) || {}).value;

			// if answer is correct
			if (userAnswer === currentQuestion.correctAnswer) {
				// add to the number of correct answers
				numCorrect++;

				// color the answers green
				answerContainers[questionNumber].style.color = "lightgreen";
			} else {
				// if answer is wrong or blank
				// color the answers red
				answerContainers[questionNumber].style.color = "red";
			}
		});

		// show number of correct answers out of total
		resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
	}

	function showSlide(n) {
		slides[currentSlide].classList.remove("active-slide");
		slides[n].classList.add("active-slide");
		currentSlide = n;

		if (currentSlide === 0) {
			previousButton.style.display = "none";
		} else {
			previousButton.style.display = "inline-block";
		}

		if (currentSlide === slides.length - 1) {
			nextButton.style.display = "none";
			submitButton.style.display = "inline-block";
		} else {
			nextButton.style.display = "inline-block";
			submitButton.style.display = "none";
		}
	}

	function showNextSlide() {
		showSlide(currentSlide + 1);
	}

	function showPreviousSlide() {
		showSlide(currentSlide - 1);
	}

	const quizContainer = document.getElementById("quiz");
	const resultsContainer = document.getElementById("results");
	const submitButton = document.getElementById("submit");

	// display quiz right away
	buildQuiz();

	const previousButton = document.getElementById("previous");
	const nextButton = document.getElementById("next");
	const slides = document.querySelectorAll(".slide");
	let currentSlide = 0;

	showSlide(0);

	// on submit, show results
	
	
	submitButton.addEventListener("click", showResults);
	previousButton.addEventListener("click", showPreviousSlide);
	nextButton.addEventListener("click", showNextSlide);


	//  Set our number counter to 60
	var number = 60;

	//  Variable that will hold our interval ID when we execute
	//  the "run" function
	var intervalId;
	

	$("#submit").on("click", stop);



	function reset(){
		showResults();
		buildQuiz();
		stop();
	}

	//  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
	function run() {
		clearInterval(intervalId);
		intervalId = setInterval(decrement, 1000);
	}

	//  The decrement function.
	function decrement() {
		number--; //  Decrease number by one.
		$("#show-number").html("<h2>" + number + "</h2>"); //  Show the number in the #show-number tag.
		//  Once number hits zero...
		if (number === 0) {
			stop();
			alert("Time Up!"); //  Alert the user that time is up.

			reset(); 	


		}
	}

	//  The stop function
	function stop() {
		//  Clears our intervalId
		//  We just pass the name of the interval to the clearInterval function.
		clearInterval(intervalId);
	};

	//  Execute the run function.
	run();

})();