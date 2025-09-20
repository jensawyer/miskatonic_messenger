export type Role = 'user' | 'assistant' | 'system'

export interface Message {
    id: string
    role: Role
    content: string
    ts: number
}

export interface ChatRequest {
    messages: Array<Pick<Message, 'role' | 'content'>>
}

export interface ChatResponse {
    message: Pick<Message, 'role' | 'content'>
}
