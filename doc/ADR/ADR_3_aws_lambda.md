# ADR 3: Adoption of AWS Lambda and API Gateway for Backend Services

**Created By:** Xavier

**Date:** 2024-05-20

**Decision Maker:** Jett, Bernie

**Stakeholders:** Team 10

**Status:** Accepted

## Context:
We tried to host the application backend on EC2 instances, which has led to several challenges, including dependency errors, difficulties in scaling, and increased maintenance efforts. Managing EC2 instances requires considerable operational overhead, including server provisioning, configuration, and monitoring. To address these issues, we need a more efficient and manageable solution that can streamline our backend operations.


## Decision:
We have decided to migrate our backend services to AWS Lambda and API Gateway. AWS Lambda offers a serverless computing model that eliminates the need for server management, while API Gateway provides a robust interface for creating and managing APIs. This combination will simplify our backend architecture, reduce operational overhead, and improve scalability.

## Consequences:
- Reduced Operational Overhead: AWS Lambda's serverless model removes the need for server management tasks such as provisioning, patching, and monitoring. This allows our team to focus on writing code and developing features.
- Scalability: Lambda functions automatically scale with the number of incoming requests, ensuring that our application can handle varying loads without manual intervention.
- Simplified Deployment: Deploying backend services with Lambda and API Gateway is straightforward and reduces the risk of dependency errors and configuration issues.

Overall, transitioning to AWS Lambda and API Gateway for our backend services aligns with our goal of reducing operational complexity, improving scalability, and enhancing cost efficiency. This decision will enable our team to deliver a more reliable and maintainable backend infrastructure.