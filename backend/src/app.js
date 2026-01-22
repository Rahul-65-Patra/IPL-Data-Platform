const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/teams", require("./routes/teams"));
app.use("/players", require("./routes/players"));
app.use("/matches", require("./routes/matches"));
app.use("/batting", require("./routes/batting"));
app.use("/bowling", require("./routes/bowling"));
app.use("/standings", require("./routes/standings"));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
