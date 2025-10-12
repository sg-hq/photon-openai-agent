import type { SomeExtension } from "photon";
import { openaiAgentModifier } from "../modifiers";

export const openaiAgentExtension = {
    modifiers: {
        openaiAgent: openaiAgentModifier
    },
    actions: {},
} satisfies SomeExtension