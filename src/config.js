const config = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "desafio-lawgile-upload",
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://e1dcx7q6j0.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_uQpLZH7Te",
      APP_CLIENT_ID: "3q8m8q1vd7ammomam3a2211799",
      IDENTITY_POOL_ID: "us-east-1:3795c4d2-f7df-46da-9558-7752a0455324",
    },
  };
  
  export default config;