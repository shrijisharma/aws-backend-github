const AWS = require("aws-sdk");

AWS.config.update({ region: "ap-southeast-2" });//closer to the target audience n ki vo region jhan development hogi

const s3 = new AWS.S3();
const S3_BUCKET = "mudagal-test-90-650435900878-ap-southeast-2-an";

module.exports = { s3, S3_BUCKET };
//usercreate,policy add to s3,bucket creation,pakageinstall npm-i-aws-sdk