// // const {
// //   env: { DATADOG_API_KEY, VERSION, ENVIRONMENT },
// // } = require('process');
// const { run } = require('jest');
// const { DD_API_KEY } = require('./const');

// async function createMetricReporter({ service }) {
//   const dogapi = require('dogapi');
//   const defaultTags = ['env:prod' , 'releaseVersion:1', `service:${service}`];
//   const metrics = await run();

//   dogapi.initialize({
//     api_key: DD_API_KEY,
//   });

//   return {
//     gauge: (metric, points, tags = []) => {
//       metrics.push({
//         metric,
//         points,
//         tags: [...tags, ...defaultTags],
//         type: 'gauge',
//       });
//     },
//     send: () => {
//       const sendPromise = new Promise((resolve) => {
//         dogapi.metric.send_all(metrics, (error, result) => {
//           if (error) {
//             console.log(`Unable to send metrics to Datadog`, error);
//           } else {
//             console.log(`Successfully sent metrics to Datadog`, result);
//           }

//           resolve(!error);
//         });
//       });

//       return sendPromise;
//     },
//   };
// }

// createMetricReporter('lighthouse');

const  { client, v2 } = require('@datadog/datadog-api-client');
const { DD_API_KEY, DD_APP_KEY } = require('./const');
const configurationOpts = {
  authMethods: {
    apiKeyAuth: DD_API_KEY,
    appKeyAuth: DD_APP_KEY
  },
};

const configuration = client.createConfiguration(configurationOpts);

const apiInstance = new v2.MetricsApi(configuration);


// const params = {
//   body: {
//     data: {
//       type: "manage_tags",
//       id: "TestPSIMetric",
//       attributes: {
//         tags: ["psi", "performance"],
//         metricType: "gauge",
//       },
//     },
//   },
//   metricName: "TestPSIMetricToSubmitScore",
// };

const params= {
  body: {
    series: [
      {
        metric: "lighthouse.psi.1",
        type: 0,
        points: [
          {
            timestamp: Math.round(new Date().getTime() / 1000),
            value: 0.7,
          },
        ],
        resources: [
          {
            name: "18F",
            type: "host",
          },
        ],
      },
    ],
  },
};
// apiInstance
//   .createTagConfiguration(params)
//   .then((data) => {
//     console.log(
//       "API called successfully. Returned data: " + JSON.stringify(data)
//     );
//   })
//   .catch((error) => console.error(error));




apiInstance
  .submitMetrics(params)
  .then((data) => {
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
  })
  .catch((error) => console.error(error));