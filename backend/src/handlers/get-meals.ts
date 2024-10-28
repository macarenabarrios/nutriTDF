import { APIGatewayProxyHandler } from "aws-lambda";
import { MealService } from "../services/meal-service";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    // TODO: Replace with real authentication
    const userId = event.requestContext.authorizer?.claims?.sub || "test-user";

    const mealService = new MealService();
    const meals = await mealService.getMealsByUserId(userId);

    return {
      statusCode: 200,
      body: JSON.stringify(meals),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.error("Error getting meals:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not retrieve meals" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
