const AddEventViewsUseCase = require('../../../Applications/use_case/AddEventViewsUseCase');

module.exports = (container) => (req, res, next) => {
  const splitted = req.url.split('/');
  splitted.shift();
  const clientId = req.headers['x-client-id'];

  if (
    splitted.includes('events')
    && splitted.length > 1
    && !splitted.includes('home')
    && clientId
  ) {
    const addEventViews = container.getInstance(AddEventViewsUseCase.name);
    addEventViews.execute({
      eventId: splitted[splitted.length - 1],
      clientId,
    });
  }
  req.clientId = clientId;
  next();
};
