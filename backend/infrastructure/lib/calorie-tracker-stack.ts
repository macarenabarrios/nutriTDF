import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from "path";

export class CalorieTrackerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table
    const mealTable = new dynamodb.Table(this, "MealTable", {
      partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "mealId", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Solo para desarrollo
      timeToLiveAttribute: "ttl", // Opcional: para datos que expiran
    });

    // Lambda Functions
    const createMealFunction = new nodejs.NodejsFunction(
      this,
      "CreateMealFunction",
      {
        entry: path.join(__dirname, "../../src/handlers/create-meal.ts"),
        handler: "handler",
        runtime: lambda.Runtime.NODEJS_18_X,
        environment: {
          MEALS_TABLE: mealTable.tableName,
        },
        bundling: {
          minify: true,
          sourceMap: true,
        },
      }
    );

    const getMealsFunction = new nodejs.NodejsFunction(
      this,
      "GetMealsFunction",
      {
        entry: path.join(__dirname, "../../src/handlers/get-meals.ts"),
        handler: "handler",
        runtime: lambda.Runtime.NODEJS_18_X,
        environment: {
          MEALS_TABLE: mealTable.tableName,
        },
      }
    );

    // Dar permisos a Lambda para acceder a DynamoDB
    mealTable.grantReadWriteData(createMealFunction);
    mealTable.grantReadData(getMealsFunction);

    // API Gateway
    const api = new apigateway.RestApi(this, "MealsApi", {
      restApiName: "Meals Service",
      description: "API for tracking meals and calories",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // API Endpoints
    const meals = api.root.addResource("meals");
    meals.addMethod(
      "POST",
      new apigateway.LambdaIntegration(createMealFunction)
    );
    meals.addMethod("GET", new apigateway.LambdaIntegration(getMealsFunction));

    // Outputs
    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
      description: "API Gateway URL",
    });
  }
}
