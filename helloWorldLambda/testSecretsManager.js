//you need to create VPC Endpoint to link your VPC/subnet to the Secrets Manager
//https://aws.amazon.com/blogs/security/how-to-connect-to-aws-secrets-manager-service-within-a-virtual-private-cloud/


'use strict';

const _getPrivateKeyValue = async function(secret_key) {
    const AWS = require('aws-sdk');
    const client = new AWS.SecretsManager({
      region: process.env.AWS_REGION
    });
    return new Promise((resolve, reject) => {
      client.getSecretValue({SecretId: secret_key}, function(err, data) {
        if(err) {
          reject(err);
        }
        else {
          if ('SecretString' in data) {
            resolve(JSON.parse(data.SecretString));
          }
          else {
            let buff = new Buffer(data.SecretBinary, 'base64');
            resolve(JSON.parse(buff.toString('ascii')));
          }
        }
      });
    });
  };
  

module.exports.testSecretsManager = async (event, context, callback) => {
    const private_key_value = await _getPrivateKeyValue("hello/secret");
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'testSecretsManager executed successfully!',
            private_key_value: private_key_value,
        }),
    }

};
