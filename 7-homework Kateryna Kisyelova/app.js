"use strict";

const QUESTIONNAIRE = [
  { question: "Сколько будет 2+2?", answer: "4" },
  { question: "Солнце встает на востоке?", answer: true },
  { question: "Сколько будет 5 / 0?", answer: "Infinity" },
  { question: "Какого цвета небо?", answer: "голубого" },
  {
    question:
      "Какой правильный ответ на «Главный вопрос жизни, вселенной и всего такого»?",
    answer: "42",
  },
];

const userAnswers = questionUser(QUESTIONNAIRE);
const totalScore = calculateTotalMark(QUESTIONNAIRE, userAnswers);
showTotalMark(totalScore);

function questionUser(questionnaire) {
  return questionnaire.map((item) => callQuestion(item));
}

function callQuestion(item) {
  return typeof item.answer === "boolean"
    ? confirm(item.question)
    : prompt(item.question);
}

function calculateTotalMark(questionnaire, answers) {
  return answers.reduce(
    (acc, answer, index) =>
      answer === questionnaire[index].answer ? (acc += 10) : acc,
    0
  );
}

function showTotalMark(score) {
  alert(`Your score is ${score}`);
}
