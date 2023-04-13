const metrics = require('datadog-metrics');

const { DD_API_KEY, DD_APP_KEY } = require('./const');


metrics.init({ host: 'OM_MAC', prefix: 'ommac.',});

// function collectMemoryStats() {
//     var memUsage = process.memoryUsage();
//     metrics.gauge('memory.rss', memUsage.rss);
//     metrics.gauge('memory.heapTotal', memUsage.heapTotal);
//     metrics.gauge('memory.heapUsed', memUsage.heapUsed);
//     metrics.increment('memory.statsReported');
// }

// setInterval(collectMemoryStats, 5000);

var metricsLogger = new metrics.BufferedMetricsLogger({
    site: 'datadoghq.com',
    apiKey: DD_API_KEY,
    host: 'OM_MAC',
    prefix: 'ommac.',
    flushIntervalSeconds: 15,
    defaultTags: ['env:prod', 'region:us-east-1'],
    onError (error) {
        console.error('There was an error auto-flushing metrics:', error);
    }
});
metricsLogger.gauge('lighthouse.psi.1', 42);

function collectMemoryStats() {
    var memUsage = process.memoryUsage();
    metrics.gauge('memory.rss', memUsage.rss);
    metrics.gauge('memory.heapTotal', memUsage.heapTotal);
    metrics.gauge('memory.heapUsed', memUsage.heapUsed);
    metrics.increment('memory.statsReported');
}

setInterval(collectMemoryStats, 5000);