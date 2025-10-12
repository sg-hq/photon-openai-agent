import { run } from "@openai/agents";
import type { App, ModifierReturn, SomeExtension, SomeUniqueModifier, WithoutKey } from "photon";
import type { AgentBuilder } from "../core";
import { buildMessage } from "../utils/build-message";

type InPhoton = WithoutKey<"openaiAgent">;
type OutPhoton = { openaiAgent: true };

export function openaiAgentModifier(builder: AgentBuilder): SomeUniqueModifier<InPhoton, OutPhoton> {
    return {
        unique: true,
        main(app) {
            return app.everyMessage(
                async (context) => {
                    const agent = builder(context);
                    const result = await run(agent, buildMessage(context.messages));
                    await context.send(result.finalOutput ?? "");
                },
                {
                    mode: "break",
                },
            ) as any;
        },
    };
}

export type OpenAIAgentRegistry<A extends App<any, any, any, any>> = (
    builder: AgentBuilder,
) => ModifierReturn<typeof openaiAgentModifier, A>;
