// require app
const app = require("./app");


// port
const PORT = process.env.PORT || 3000;

// listening the server
app.listen(PORT, (req, res) => {
  console.log(`server started at ${PORT}`.bgYellow.white);
});
