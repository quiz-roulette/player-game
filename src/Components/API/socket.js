import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_SOCKET_IO_URL);

function subscribeToResult(cb) {
  socket.on('update quiz user result', result => cb(null, result));
}

function subscribeToOnlineUser(cb) {
  socket.on('user at waiting page', result => cb(null, result));
}

function emitOnlineUser(user) {
  socket.emit('user at waiting page', user);
}

function emitUserRank(userid, rank, quizId) {
  socket.emit('quiz user rank', { QuizUserId: userid, Rank: rank, QuizId: quizId });
}
// ======== (Start) Controlled Quiz Events ==========
function emitUserQuestionAnswered(userid, questionid, choiceid, score) {
  socket.emit('question answered', { QuizUserId: userid, QuestionId: questionid, ChoiceId: choiceid, Score: score })
}

function subscribeToQuizStarted(cb) {
  socket.on('quiz started', result => cb(null, result))
}

function subscribeToNewQuestion(cb) {
  socket.on('new question', result => cb(null, result))
}

function subscribeToStopCurrentQuestion(cb) {
  socket.on('stop question', result => cb(null, result))
}

function subscribeToQuizStopped(cb) {
  socket.on('stop quiz', result => cb(null, result))
}
// ======== (End) Controlled Quiz Events ==========

export { subscribeToOnlineUser, subscribeToResult, emitOnlineUser, emitUserRank };