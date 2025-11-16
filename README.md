# AWS Visitor Counter

A serverless website visitor counter built with AWS SAM (Serverless Application Model) using API Gateway, Lambda, and DynamoDB.

## Architecture

This project implements a simple yet scalable visitor counter using AWS serverless services:

- **API Gateway**: REST API endpoint to handle visitor count requests
- **Lambda**: Node.js function to increment and retrieve the visitor count
- **DynamoDB**: NoSQL database to store the visitor count

## Features

- Serverless architecture (no servers to manage)
- Automatic scaling
- Pay-per-use pricing model
- CORS enabled for cross-origin requests
- Simple React component for frontend integration

## Project Structure

```
.
├── Counter.yaml              # SAM template defining AWS resources
├── visitor-counter/
│   ├── index.js             # Lambda function handler
│   ├── VisitorCounter.js    # Sample React component
│   └── package.json         # Node.js dependencies
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## Prerequisites

- [AWS CLI](https://aws.amazon.com/cli/) installed and configured
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) installed
- [Node.js 18.x](https://nodejs.org/) or later
- An AWS account

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Pawly87/AWS_Visitor_Counter.git
cd AWS_Visitor_Counter
```

2. Install dependencies:
```bash
cd visitor-counter
npm install
cd ..
```

## Deployment

### Using SAM CLI

1. Build the application:
```bash
sam build
```

2. Deploy to AWS:
```bash
sam deploy --guided
```

Follow the prompts to configure:
- Stack name (e.g., `visitor-counter`)
- AWS Region (e.g., `us-east-1`)
- Confirm changes before deploy
- Allow SAM CLI IAM role creation
- Save arguments to configuration file

3. After deployment, note the API endpoint URL from the outputs.

### Manual Deployment

Alternatively, you can deploy via AWS CloudFormation console:
1. Package the SAM template
2. Upload to S3
3. Deploy via CloudFormation

## Usage

### Frontend Integration

Use the provided React component to display the visitor count on your website:

```javascript
import VisitorCounter from './VisitorCounter';

function App() {
  return (
    <div>
      <h1>My Portfolio</h1>
      <VisitorCounter />
    </div>
  );
}
```

**Important**: Update the API endpoint in `VisitorCounter.js`:
```javascript
const res = await fetch("YOUR_API_GATEWAY_URL", {
  method: "POST"
});
```

Replace `YOUR_API_GATEWAY_URL` with the API Gateway endpoint from the SAM deployment output.

### API Endpoint

The API accepts POST requests and returns the current visitor count:

**Request:**
```bash
curl -X POST https://your-api-id.execute-api.region.amazonaws.com/Prod/count
```

**Response:**
```json
{
  "count": 42
}
```

## Configuration

### CORS Settings

CORS is configured in `Counter.yaml` to allow all origins. For production, update to your specific domain:

```yaml
Api:
  Cors:
    AllowMethods: "'POST,OPTIONS'"
    AllowHeaders: "'*'"
    AllowOrigin: "'https://yourdomain.com'"
```

### DynamoDB Table

The counter uses a DynamoDB table with:
- Table name: `VisitorCounterTable`
- Partition key: `id` (String)
- On-demand billing mode

## Cost Estimation

This serverless solution is highly cost-effective:

- **API Gateway**: $3.50 per million requests
- **Lambda**: 1M free requests/month, then $0.20 per 1M requests
- **DynamoDB**: 25 GB storage free, on-demand pricing for reads/writes

For a typical portfolio site with moderate traffic, monthly costs should be under $1.

## Security

- API is public but only accepts POST requests
- DynamoDB table has least-privilege IAM permissions
- No authentication required (suitable for public counters)
- CORS configured to prevent unauthorized origins (update for production)

## Cleanup

To delete all AWS resources:

```bash
sam delete
```

Or delete the CloudFormation stack from the AWS Console.

## Troubleshooting

### CORS Errors
Ensure your frontend domain is allowed in the CORS configuration in `Counter.yaml`.

### Lambda Timeout
If you experience timeouts, increase the timeout in the `Globals` section of `Counter.yaml`.

### DynamoDB Permissions
Verify the Lambda function has proper IAM permissions to read/write to DynamoDB.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Paul Ferrol - [GitHub](https://github.com/Pawly87)

## Acknowledgments

- Built with AWS SAM
- Deployed on AWS serverless infrastructure
- Part of my cloud portfolio showcasing AWS skills