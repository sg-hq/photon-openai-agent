import type { MessageContent } from "photon";

export function buildMessage(messages: MessageContent[]) {
    let result: string = ""
    
    for (const message of messages) {
        switch (message.type) {
            case "plain_text": result += `${message.content}\n`;
            
        }
    }
    return result.trim();
}