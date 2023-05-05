import api from './api.service';

export const askQuestionService = (qst, algo, opts = {}) => {
  return api.get(`/chadgpt/ask/${algo}/${qst}`, opts);
};

export const addUpdateQuestionService = (reqBody, opts = {}) => {
  return api.post('/chadgpt/question/add', reqBody, opts);
};

export const deleteQuestionService = (reqBody, opts = {}) => {
  return api.post('/chadgpt/question/delete', reqBody, opts);
};
