const app = require('./src/app');
const connectDB = require('./src/config/db');
const { PORT } = process.env;

connectDB();
app.listen(PORT || 5000, () => {
  console.log(`Server running on port ${PORT || 5000}`);
});