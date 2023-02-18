import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const s3Client = new AWS.SharedIniFileCredentials({
  profile: process.env.AWS_PROFILE
});

AWS.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log('Access key:', s3Client);
  }
});

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: process.env.AWS_REGION,
  params: { Bucket: process.env.AWS_MEDIA_BUCKET }
});

export function getGetSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_MEDIA_BUCKET,
    Key: key,
    Expires: signedUrlExpireSeconds
  });
}

export function getPutSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl('putObject', {
    Bucket: process.env.AWS_MEDIA_BUCKET,
    Key: key,
    Expires: signedUrlExpireSeconds
  });
}
