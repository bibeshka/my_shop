module.exports = function paginatedResults(model, req) {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if (!page || !limit) {
    return model;
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  results.next = {
    page: page + 1,
    limit: limit,
  };

  results.previous = {
    page: page - 1,
    limit: limit,
  };

  results.results = model.slice(startIndex, endIndex);

  return results.results;
};
