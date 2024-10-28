export interface Meal {
  userId: string;
  mealId: string;
  name: string;
  calories: number;
  protein: number;
  date: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateMealInput {
  name: string;
  calories: number;
  protein: number;
  date: string;
}
