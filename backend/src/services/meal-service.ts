import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { Meal, CreateMealInput } from "../types/meal";

const dynamoDB = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.MEALS_TABLE || "";

export class MealService {
  async createMeal(userId: string, meal: CreateMealInput): Promise<Meal> {
    const timestamp = new Date().toISOString();
    const newMeal: Meal = {
      userId,
      mealId: uuidv4(),
      ...meal,
      createdAt: timestamp,
    };

    await dynamoDB
      .put({
        TableName: TABLE_NAME,
        Item: newMeal,
      })
      .promise();

    return newMeal;
  }

  async getMealsByUserId(userId: string): Promise<Meal[]> {
    const result = await dynamoDB
      .query({
        TableName: TABLE_NAME,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      })
      .promise();

    return result.Items as Meal[];
  }
}
