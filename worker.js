const { parentPort, workerData } = require('worker_threads');

console.log("🟡 Worker started at:", new Date().toLocaleTimeString());

// Simulate heavy computation
let result = 0;
for (let i = 0; i < workerData.iterations; i++) {
  result += i;
}

console.log("🟢 Worker finished at:", new Date().toLocaleTimeString());

// Send result back to main thread
parentPort.postMessage(result);