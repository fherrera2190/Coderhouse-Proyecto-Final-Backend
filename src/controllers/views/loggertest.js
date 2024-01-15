module.exports = (req, res) => {
  req.logger.fatal("testing fatal log");
  req.logger.error("testing error log");
  req.logger.warning("testing warning log");
  req.logger.info("testing info log");
  req.logger.http("testing http log");
  req.logger.debug("testing debug log");
  res.send("Logger");
};
