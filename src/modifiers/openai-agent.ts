import { assistant, run, user } from "@openai/agents";
import { aware, type History, hook, reply } from "photon";
import type { AgentBuilder } from "../core";
import { buildMessage } from "../utils/build-message";

let historyTempStore = new Map<string, History>();

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
                    (history as History).push({
                        role: "assistant",
                        messages: [{ type: "plain_text", content: result.finalOutput }],
                    });
                    historyTempStore.set(context.user.id, history);
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
    
    hook(async () => {
        return aware(context => {
            const history = historyTempStore.get(context.user.id);
            if (history) {
                historyTempStore.delete(context.user.id);
                return {history};
            }
            return {
                history: [],
            }
        })
    }, {
        type: "modifyHistoryAfter",
    })
}
