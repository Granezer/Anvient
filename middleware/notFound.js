const incorrectRoute = (req, res) => {
    return res.status(404).send("Invalid route not found!!!!");
  };
  
  module.exports = incorrectRoute