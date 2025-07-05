const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const db = require("./config/db");
const cors = require('cors')

//configure dotenv to use .env file
dotenv.config();

//rest object
const app = express();

const usersRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRouter');
const categoryRoute = require('./routes/categoryRoute');

//midlleware
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

//routs
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/categories", categoryRoute);

// app.get("/test", (req, res) => {
//   res.status(200).send("Hello, World!");
//   console.log("Hello, World!");
// });

const PORT = process.env.PORT || 3051;

//conditionally listen
db.query("SELECT 1")
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })

  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1);
  });
