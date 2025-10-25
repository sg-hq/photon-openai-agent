import type { Agent } from "@openai/agents";
import type { Context } from "photon";

export type AgentBuilder = (context: Omit<Context, "agentConfig" | "app">) => Agent;

export function defineAgent(builder: AgentBuilder) {
    return builder
}