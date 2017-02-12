/* eslint no-console: "off" */

const app = require('./app');

const port = process.env.PORT || 4000;

// Start server
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
