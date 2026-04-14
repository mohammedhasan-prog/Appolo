const validate = (schema) => (req, res, next) => {
  try {
    const parsedData = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    // Override with parsed (and typecast) data
    req.body = parsedData.body;
    req.query = parsedData.query;
    req.params = parsedData.params;
    next();
  } catch (error) {
    if (error.name === 'ZodError') {
      const issues = error.issues || [];
      const messages = issues.map((issue) => `${issue.path.join('.')} - ${issue.message}`);
      return res.status(400).json({ status: 'error', message: 'Validation failed', errors: messages });
    }
    next(error);
  }
};

module.exports = validate;
