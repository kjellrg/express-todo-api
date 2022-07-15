const app = require("./app");

// node listen port
var port = 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
