const { welcome, goodbye, tell } = require("../utils/fortune-teller");

function ask(question) {
  return tell(question).then((response) => [
    `Your question was: ${question}`,
    `Your fortune is: ${response}`,
  ]);
}

// Function: getFortune
// Parameters: question (string)
// Returns: Promise that resolves to a string or an error message
// TODO: Implement the getFortune function by utilizing the ask function to get the fortune for the question.
// Hint: Call the ask function with the question and extract the fortune from the response array.
function getFortune(question) {
  return ask(question)
  .catch((error) => {
    const message = "There was an error: "
    return `${message}${error}`;
  });
}

// Function: fullSession
// Parameters: question (string)
// Returns: Promise that resolves to an array of strings or an error message
// TODO: Create a full session by combining the welcome, getFortune, and goodbye functions.
// Hint: Use promise chaining to call the functions in the correct order and concatenate the results.
function alternateFullSession(question) {
  if (!question) {
    return welcome().then((welcomeMessage) =>
    goodbye().then((goodbyeMessage)=> [
      welcomeMessage, "There was an error: A question is required...", goodbyeMessage
    ]
  ));
  }
  return welcome().then((welcomeMessage) =>
      getFortune(question).then((fortune) =>
      goodbye().then((goodbyeMessage) => [
          welcomeMessage, `Your question was: ${question}`, `Your fortune is: ${fortune}`, goodbyeMessage
        ]
        )));
}
  // Call the welcome function.
  // Chain the getFortune function to get the fortune for the question.
  // Chain the goodbye function and concatenate the results with the session.
  // Return a promise that resolves to the final session array or an error message.

function fullSession(question) {
    let session = [];
      
    return welcome()
      .then((welcomeMessage) => {
        session.push(welcomeMessage); 
        return getFortune(question);  
      })
      .then((fortuneResponse) => {
        session = session.concat(fortuneResponse);
        return goodbye();
      })
      .then((goodbyeMessage) => {
        session.push(goodbyeMessage);
        return session;
      })
}

module.exports = { getFortune, fullSession };
