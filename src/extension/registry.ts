import type { App, Context, ExtensionsOf, ModifierReturn, SomeExtension } from "photon";
import type { OpenAIAgentRegistry } from "../modifiers/openai-agent";

type Registry<A extends App<any, any, any, any>, E extends SomeExtension> = {
    openaiAgent: OpenAIAgentRegistry<A>;
};

type MethodsFromRegistry<A extends App<any, any, any, any>> = {
    [K in keyof Registry<A, ExtensionsOf<A>>]: ReturnType<Registry<A, ExtensionsOf<A>>[K]> extends never
        ? never
        : ReturnType<Registry<A, ExtensionsOf<A>>[K]> extends App<any, any, any, any>
          ? Registry<A, ExtensionsOf<A>>[K]
          : never;
};

declare module "photon" {
    interface App<Name extends string, Description extends string, Photon extends {}, Ext extends SomeExtension>
        extends MethodsFromRegistry<App<Name, Description, Photon, Ext>> {}
}

// biome-ignore lint: This empty export is necessary to treat this file as a module and apply the module augmentation.
export {};
