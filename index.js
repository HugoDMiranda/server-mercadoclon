const express = require("express");
const cors = require("cors");

//settings
const app = express();
app.set("port", process.env.PORT || 3001);
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://mercado-clon.vercel.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

//routes
app.use("/api", require("./api/index"));

// starting the server
app.listen(app.get("port"), () => {
  console.log(`App listening on port ${app.get("port")}`);
});
