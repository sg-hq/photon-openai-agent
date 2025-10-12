import type { Agent } from "@openai/agents";
import type { Context, defaultExtensions } from "photon";

export type AgentBuilder = (context: Context<typeof defaultExtensions>) => Agent;

export function defineAgent(builder: AgentBuilder) {
    return builder
}