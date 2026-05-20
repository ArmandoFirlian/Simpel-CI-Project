require('dotenv').config();
const express = require("express");
const path = require("path");
const client = require("prom-client");

// Initialize Prometheus metrics collection
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Define custom Prometheus metrics
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"]
});
register.registerMetric(httpRequestsTotal);

const app = express();
const PORT = process.env.PORT || 3000;

// Structured Logging helper
const log = (level, message, meta = {}) => {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta
  }));
};

// Middleware for structured logging and metrics tracking
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    
    // Increment request count metric
    httpRequestsTotal.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: statusCode
    });

    // Output JSON Log
    log("info", "HTTP Request processed", {
      method: req.method,
      path: req.path,
      status_code: statusCode,
      duration_ms: duration
    });
  });
  next();
});

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Expose Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
  try {
    res.setHeader("Content-Type", register.contentType);
    res.send(await register.metrics());
  } catch (err) {
    log("error", "Error generating metrics", { error: err.message });
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  log("info", "Server started", { port: PORT, env: process.env.NODE_ENV || "development" });
});
