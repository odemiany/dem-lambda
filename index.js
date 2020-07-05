var aws = require('aws-sdk');
var sns = new aws.SNS();

const zlib = require('zlib');

exports.handler = async (event, context) => {
    const payload = Buffer.from(event.awslogs.data, 'base64');
    const parsed = JSON.parse(zlib.gunzipSync(payload).toString('utf8'));
    console.log('Decoded payload:', JSON.stringify(parsed));

    var params = {
        Message: JSON.stringify(parsed.logEvents[0].message), 
        Subject: "Test log errors",
        TopicArn: "arn:aws:sns:eu-central-1:151137436701:dem-sns-topic"
    };
    sns.publish(params, context.done);
    return `Successfully processed ${parsed.logEvents.length} log events.`;
};
