import { APIGatewayProxyHandler } from "aws-lambda";
import { MealService } from "../services/meal-service";
import { CreateMealInput } from "../types/meal";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    // TODO: Replace with real authentication
    const userId = event.requestContext.authorizer?.claims?.sub || "test-user";

    const mealInput: CreateMealInput = JSON.parse(event.body || "{}");
    const mealService = new MealService();
    const meal = await mealService.createMeal(userId, mealInput);

    return {
      statusCode: 201,
      body: JSON.stringify(meal),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.error("Error creating meal:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not create meal" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
