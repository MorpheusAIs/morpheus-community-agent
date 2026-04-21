import { createOpenAI } from '@ai-sdk/openai';

export const morpheus = createOpenAI({
  baseURL: 'https://api.mor.org/api/v1',
  apiKey: process.env.MORPHEUS_API_KEY,
});

export const config = {
  communityName: process.env.COMMUNITY_NAME || "Your Community",
  model: process.env.AI_MODEL || "glm-5",
  slackWorkspaceUrl: process.env.SLACK_WORKSPACE_URL || "",
  savoirApiUrl: process.env.SAVOIR_API_URL || "",
  savoirApiKey: process.env.SAVOIR_API_KEY || "",
  searchDomains: process.env.SEARCH_DOMAINS
    ? process.env.SEARCH_DOMAINS.split(",").map((d) => d.trim())
    : [],
  communityLeadSlackId: process.env.COMMUNITY_LEAD_SLACK_ID || "",
};
