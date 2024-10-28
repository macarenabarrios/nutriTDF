#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CalorieTrackerStack } from "../lib/calorie-tracker-stack";

const app = new cdk.App();
new CalorieTrackerStack(app, "CalorieTrackerStack", {
  env: {
    account: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
  },
});
