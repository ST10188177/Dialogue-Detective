// === BACKGROUND SLIDESHOW ===
const slides = document.querySelectorAll(".background-slideshow .slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

// Set background images
slides[0].style.backgroundImage = "url('assets/different.jpg')";
slides[1].style.backgroundImage = "url('assets/lightbulb.jpg')";
slides[2].style.backgroundImage = "url('assets/micro.jpg')";
slides[3].style.backgroundImage = "url('assets/newsroom.jpg')";

// Auto-rotate slides
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 3500);

showSlide(currentSlide);

// === MINI-GAME LOGIC ===
const startBtn = document.getElementById("start-btn");
const nameForm = document.getElementById("name-form");
const quiz = document.getElementById("quiz");
const detectiveNameInput = document.getElementById("detective-name");
const questionText = document.getElementById("question-text");
const choicesDiv = document.getElementById("choices");
const feedback = document.getElementById("game-feedback");
const hint = document.getElementById("hint-message");
const progressBar = document.getElementById("progress-bar");
const restartBtn = document.getElementById("restart-btn");
const finalResult = document.getElementById("final-result");
const scoreMessage = document.getElementById("score-message");

let currentQuestion = 0;
let score = 0;
let detectiveName = "";

const quizQuestions = [
  {
    text: "Clue #1: Where is the brand voice most likely hidden?",
    choices: [
      { text: "Growth Logs", correct: true },
      { text: "Brand Identity Folder", correct: false },
    ],
    hint: "Think: where does strategic development get recorded?",
  },
  {
    text: "Clue #2: Which trait defines a strong brand voice?",
    choices: [
      { text: "Consistency", correct: true },
      { text: "Confusion", correct: false },
    ],
    hint: "Would a detective prefer a clue that changes often or stays consistent?",
  },
  {
    text: "Clue #3: Where would feedback from users be most valuable?",
    choices: [
      { text: "Support Chat Logs", correct: true },
      { text: "Archived Designs", correct: false },
    ],
    hint: "Where are real voices of users usually found?",
  },
];

function showQuizQuestion() {
  const q = quizQuestions[currentQuestion];
  questionText.textContent = q.text;
  choicesDiv.innerHTML = "";
  feedback.textContent = "";
  hint.textContent = "";

  q.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.classList.add("case-btn");
    btn.addEventListener("click", () => handleAnswer(choice.correct));
    choicesDiv.appendChild(btn);
  });

  progressBar.value = (currentQuestion / quizQuestions.length) * 100;
}

function handleAnswer(isCorrect) {
  if (isCorrect) {
    score++;
    feedback.innerHTML = `✅ Well done, Detective ${detectiveName}!`;
    feedback.style.color = "var(--burgundy)";
  } else {
    feedback.innerHTML = `❌ Not quite, try again Detective.`;
    feedback.style.color = "var(--red)";
    hint.textContent = quizQuestions[currentQuestion].hint;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      showQuizQuestion();
    } else {
      showFinalScore();
    }
  }, 1500);
}

function showFinalScore() {
  quiz.style.display = "none";
  finalResult.style.display = "block";
  progressBar.value = 100;
  scoreMessage.textContent = `🎯 Detective ${detectiveName}, you solved ${score} out of ${quizQuestions.length} clues.`;
}

function restartGame() {
  currentQuestion = 0;
  score = 0;
  finalResult.style.display = "none";
  quiz.style.display = "block";
  showQuizQuestion();
}

startBtn.addEventListener("click", () => {
  const name = detectiveNameInput.value.trim();
  if (!name) {
    alert("Please enter your name, Detective!");
    return;
  }
  detectiveName = name;
  nameForm.style.display = "none";
  quiz.style.display = "block";
  showQuizQuestion();
});

restartBtn.addEventListener("click", restartGame);

// === CARDS SLIDER ===
const grid = document.querySelector(".grid");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let scrollAmount = 0;
const scrollStep = 320;

function scrollLeft() {
  scrollAmount = Math.max(scrollAmount - scrollStep, 0);
  grid.style.transform = `translateX(-${scrollAmount}px)`;
}

function scrollRight() {
  const maxScroll = grid.scrollWidth - grid.clientWidth;
  scrollAmount = Math.min(scrollAmount + scrollStep, maxScroll);
  grid.style.transform = `translateX(-${scrollAmount}px)`;
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", scrollLeft);
  nextBtn.addEventListener("click", scrollRight);
}

// === BRAND QUESTIONS ===
const brandQuestions = [
  "1. If your brand was a person, what would their signature outfit be?",
  "2. What three words would others use to describe your brand's personality?",
  "3. How would your brand introduce itself at a networking event?",
  "4. What kind of humor does your brand have? (Witty, sarcastic, playful, etc.)",
  "5. If your brand had a spirit animal, what would it be and why?",
  "6. What values would be in your brand's personal mission statement?",
  "7. How does your brand respond to criticism or negative feedback?",
  "8. What would your brand's favorite book/movie be and why?",
  "9. If your brand could have dinner with any historical figure, who would it choose?",
  "10. What would your brand's social media personality be like?",
  "11. How would your brand handle a crisis or unexpected challenge?",
  "12. What kind of music would be on your brand's playlist?",
  "13. If your brand wrote an autobiography, what would the title be?",
  "14. What would your brand's ideal weekend look like?",
  "15. How would your brand celebrate major successes or milestones?",
  "16. What causes or social issues would your brand passionately support?",
  "17. If your brand had a superpower, what would it be and why?",
  "18. What would your brand's morning routine look like?",
  "19. How would your brand comfort someone who's having a bad day?",
  "20. What legacy does your brand want to leave in 10 years?"
];

const questionBox = document.getElementById("question-box");
const nextQuestionBtn = document.getElementById("next-question-btn");
const restartQuestionsBtn = document.getElementById("restart-questions-btn");

let currentQuestionIndex = 0;

function showQuestion(index) {
  questionBox.textContent = brandQuestions[index];
  questionBox.classList.add("animate");
  setTimeout(() => questionBox.classList.remove("animate"), 1000);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= brandQuestions.length) {
    questionBox.innerHTML = "Brand Personality Complete!<br><br>You've explored 20 dimensions of your brand identity.";
    nextQuestionBtn.style.display = "none";
    restartQuestionsBtn.style.display = "inline-block";
  } else {
    showQuestion(currentQuestionIndex);
  }
}

function restartQuestions() {
  currentQuestionIndex = 0;
  showQuestion(currentQuestionIndex);
  nextQuestionBtn.style.display = "inline-block";
  restartQuestionsBtn.style.display = "none";
}

if (questionBox && nextQuestionBtn && restartQuestionsBtn) {
  showQuestion(currentQuestionIndex);
  nextQuestionBtn.addEventListener("click", nextQuestion);
  restartQuestionsBtn.addEventListener("click", restartQuestions);
}

// === EASTER EGG ===
const easterEgg = document.getElementById("easter-egg");
const secretPopup = document.getElementById("secret-popup");
const dykText = document.getElementById("dyk-text");

const dykFacts = [
  "The word 'dialogue' comes from the Greek 'dia' (through) and 'logos' (speech).",
  "Good design is like a detective — it uncovers problems before they become crimes.",
  "Every great brand starts with a question — not an answer.",
  "Journalists and detectives share a core skill: pattern recognition.",
  "In communication theory, 'noise' isn't sound — it's anything that disrupts clarity.",
  "Case #005 was inspired by a real 1990s branding controversy.",
  "Detective fiction influenced modern UX storytelling techniques.",
  "🧠 Fun fact: Eye-tracking tech helps uncover unconscious user behavior.",
  "Your brand's voice reveals more than your visuals ever could.",
  "🕵️ The 'Growth Logs' contain metadata most users skip — but you didn't 😉."
];

function showRandomDYK() {
  const randomIndex = Math.floor(Math.random() * dykFacts.length);
  dykText.textContent = dykFacts[randomIndex];
  secretPopup.style.display = "block";
}

if (easterEgg && secretPopup && dykText) {
  easterEgg.addEventListener("click", (e) => {
    e.stopPropagation();
    showRandomDYK();
  });

  // Hide popup when clicking outside
  document.addEventListener("click", (e) => {
    if (!secretPopup.contains(e.target) && e.target !== easterEgg) {
      secretPopup.style.display = "none";
    }
  });
}

// Set current date in footer
const dateElement = document.querySelector('.date');
if (dateElement) {
  const currentDate = new Date();
  const options = { month: 'long', year: 'numeric' };
  dateElement.textContent = currentDate.toLocaleDateString('en-US', options).toUpperCase();
}