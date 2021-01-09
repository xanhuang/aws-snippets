//'use strict';
const Redis = require('ioredis');

module.exports.testRedis = async event => {

  const redis = new Redis(6379, 'redishello.ofka0k.0001.apse1.cache.amazonaws.com');
  
  redis.set('dummyKey', 'test123');
  
  const result = await redis.get('dummyKey');

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'ElastiCache testing completed',
        result, result,
        input: event,
      },
      null,
      2
    ),
  };

  
  

  

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
