import api from './api.service';

export const askQuestionService = (reqBody, opts = {}) => {
  return api.get('/chadgpt/ask', reqBody, opts);
};

export const addUpdateQuestionService = (reqBody, opts = {}) => {
  return api.post('/chadgpt/question/add', reqBody, opts);
};

export const deleteQuestionService = (reqBody, opts = {}) => {
  return api.post('/chadgpt/question/delete', reqBody, opts);
};
