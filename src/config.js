const config = {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-1",
      BUCKET: "desafio-lawgile-upload",
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://tnbubr57qe.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_lZphYS1JS",
      APP_CLIENT_ID: "5l0imkjkbf9tn5ehc1m3ju95kd",
      IDENTITY_POOL_ID: "us-east-1:a783d9f6-3807-4717-b665-57a1089d1c48",
    },
  };
  
  export default config;