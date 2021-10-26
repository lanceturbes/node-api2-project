// Imports
const server = require("./api/server");

// Start server
const port = 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
