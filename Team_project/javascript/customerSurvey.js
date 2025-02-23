// Define an array of survey questions, Yevgeniy M
const questions = [
  {
    question: "Do you enjoy our site?",
    type: "radio",
    name: "survey-enjoySite",
    options: ["Yes", "No"]
  },
  {
    question: "What type of clay do you enjoy using?",
    type: "select",
    name: "survey-clayType",
    options: ["Stoneware", "Earthenware", "Porcelain", "Other"]
  },
  {
    question: "What part of the day works best for you?",
    type: "radio",
    name: "survey-partOfDay",
    options: ["Morning", "Afternoon", "Evening"]
  },
  {
    question: "What day of the week would you prefer?",
    type: "select",
    name: "survey-dayOfWeek",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    question: "How many people would you like to bring with you?",
    type: "radio",
    name: "survey-peopleCount",
    options: ["1", "2", "3"]
  },
  {
    question: "Would you like to have a subscription option?",
    type: "radio",
    name: "survey-subscription",
    options: ["Yes", "No"]
  },
  {
    question: "How likely are you to recommend us to others? (1 = least, 5 = most)",
    type: "radio",
    name: "survey-recommendation",
    options: ["1", "2", "3", "4", "5"]
  },
  {
    question: "How often do you attend pottery classes?",
    type: "select",
    name: "survey-attendance",
    options: ["Once a week", "Once a month", "Occasionally", "Never"]
  },
  {
    question: "What is your experience level in pottery?",
    type: "radio",
    name: "survey-experience",
    options: ["Beginner", "Intermediate", "Advanced"]
  },
  {
    question: "Would you like to receive exclusive updates and promotions?",
    type: "radio",
    name: "survey-updates",
    options: ["Yes", "No"]
  }
];

let currentQuestionIndex = 0;
const surveyAnswers = {};

// Renders the current survey question inside the survey container
function renderQuestion() {
  const container = document.getElementById('survey-container');
  container.innerHTML = "";

  // Create header for the survey box
  const header = document.createElement('h1');
  header.textContent = "Customer Survey";
  container.appendChild(header);

  const currentQuestion = questions[currentQuestionIndex];

  // Display the current question text
  const questionDiv = document.createElement('div');
  questionDiv.className = "survey-question-text";
  questionDiv.textContent = currentQuestion.question;
  container.appendChild(questionDiv);

  // Create container for the options
  const optionsDiv = document.createElement('div');
  optionsDiv.className = "survey-options";

  if (currentQuestion.type === "radio") {
    currentQuestion.options.forEach((option, idx) => {
      const label = document.createElement('label');
      const radio = document.createElement('input');
      radio.type = "radio";
      radio.name = currentQuestion.name;
      radio.value = option;
      radio.id = `${currentQuestion.name}-${idx}`;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(" " + option));
      optionsDiv.appendChild(label);
    });
  } else if (currentQuestion.type === "select") {
    const select = document.createElement('select');
    select.name = currentQuestion.name;
    select.id = currentQuestion.name;
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "--Select--";
    select.appendChild(defaultOption);
    currentQuestion.options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
    });
    optionsDiv.appendChild(select);
  }
  container.appendChild(optionsDiv);

  // Create navigation buttons container
  const navDiv = document.createElement('div');
  navDiv.className = "survey-nav-buttons";

  // Add a "Previous" button if not on the first question
  if (currentQuestionIndex > 0) {
    const prevButton = document.createElement('button');
    prevButton.textContent = "Previous";
    prevButton.addEventListener('click', () => {
      saveAnswer();
      currentQuestionIndex--;
      renderQuestion();
    });
    navDiv.appendChild(prevButton);
  }

  // Next or Submit button (changes label on the final question)
  const nextButton = document.createElement('button');
  nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
  nextButton.addEventListener('click', () => {
    if (saveAnswer()) {
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
      } else {
        console.log("Survey Answers:", surveyAnswers);
        // Redirect to a thank-you page after survey completion
        window.location.href = "Team_project/output.html";
      }
    }
  });
  navDiv.appendChild(nextButton);

  container.appendChild(navDiv);
}

// Saves the answer for the current question; returns true if an answer is selected
function saveAnswer() {
  const currentQuestion = questions[currentQuestionIndex];
  let answer;

  if (currentQuestion.type === "radio") {
    const radios = document.getElementsByName(currentQuestion.name);
    for (const radio of radios) {
      if (radio.checked) {
        answer = radio.value;
        break;
      }
    }
  } else if (currentQuestion.type === "select") {
    const select = document.getElementById(currentQuestion.name);
    answer = select.value;
  }

  if (!answer) {
    alert("Please select an answer before proceeding.");
    return false;
  }
  surveyAnswers[currentQuestion.name] = answer;
  return true;
}

// Start the survey once the document is loaded
document.addEventListener('DOMContentLoaded', renderQuestion);
// End Yevgeniy M
