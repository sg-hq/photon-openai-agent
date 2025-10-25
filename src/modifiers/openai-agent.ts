import { assistant, run, user } from "@openai/agents";
import { aware, type History, hook, reply } from "photon";
import type { AgentBuilder } from "../core";
import { buildMessage } from "../utils/build-message";

export function useOpenAIAgent(builder: AgentBuilder) {
    hook(
        async ({ history }) => {
            const openAIHistory = (history as History).map((item) => {
                if (item.role === "assistant") {
                    return assistant(buildMessage(item.messages));
                } else {
                    return user(buildMessage(item.messages));
                }
            });

            await aware(async (context) => {
                const agent = builder(context);
                const result = await run(agent, openAIHistory);
                if (result.finalOutput) {
                    await reply(result.finalOutput);
                }
            });

            return {
                history: [],
            };
        },
        {
            type: "modifyHistoryBefore",
        },
    );
}
