import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

export const morpheus = createOpenAICompatible({
  name: 'morpheus',
  baseURL: 'https://api.mor.org/api/v1',
  apiKey: process.env.MORPHEUS_API_KEY,
});

export const MODELS = [
  { id: "glm-5", description: "Default flagship model" },
  { id: "kimi-k2.5", description: "Long-context reasoning model" },
  { id: "MiniMax-M2.5", description: "Multimodal reasoning model" },
  { id: "glm-4.7-flash", description: "Fast reasoning model with 200K context" },
  { id: "Gemma-4-26b-a4b", description: "Efficient reasoning and vision model with 256K context" },
] as const;

export type ModelId = (typeof MODELS)[number]["id"];

export const config = {
  communityName: process.env.COMMUNITY_NAME || "Your Community",
  model: (process.env.AI_MODEL || "glm-5") as ModelId,
  slackWorkspaceUrl: process.env.SLACK_WORKSPACE_URL || "",
  savoirApiUrl: process.env.SAVOIR_API_URL || "",
  savoirApiKey: process.env.SAVOIR_API_KEY || "",
  searchDomains: process.env.SEARCH_DOMAINS
    ? process.env.SEARCH_DOMAINS.split(",").map((d) => d.trim())
    : [],
  communityLeadSlackId: process.env.COMMUNITY_LEAD_SLACK_ID || "",
};
