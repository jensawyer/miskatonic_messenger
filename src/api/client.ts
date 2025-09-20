import type { ChatRequest } from '../types'

const baseURL: string | undefined = import.meta.env.VITE_API_BASE_URL

export async function sendChat(
    payload: ChatRequest,
    opts: { signal?: AbortSignal } = {}
): Promise<string> {
    const url = baseURL ? `${baseURL}/api/chat` : '/api/chat'
    if (import.meta.env.DEV) {
        // Redact message content in logs
        const msgCount = Array.isArray(payload?.messages) ? payload.messages.length : 0
        console.log('→ FE calling', url, `(messages: ${msgCount})`)
    }

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        signal: opts.signal,
    })
    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`${res.status} ${res.statusText}: ${text}`)
    }

    // Tolerant parse: accept {message:{...}} or top-level {role,content} or raw string
    const data: unknown = await res.json()
    let content: string | undefined

    if (data && typeof data === 'object') {
        const obj = data as Record<string, any>
        content =
            obj?.message?.content ??
            obj?.content // top-level { role, content }
    } else if (typeof data === 'string') {
        content = data
    }

    if (typeof content !== 'string') {
        console.warn('Unexpected response shape:', data)
        throw new Error('Unexpected response shape from /api/chat')
    }
    return content
}
