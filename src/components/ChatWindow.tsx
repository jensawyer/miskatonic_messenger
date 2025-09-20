import { useEffect, useRef, useState } from 'react'
import type { Message } from '../types'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'
import { sendChat } from '../api/client'
import LoadingDots from './LoadingDots'

let nextId = 1
function newId() {
    return `m_${nextId++}`
}

const STORAGE_KEY = 'eldritch-chat-v2' // avoid old saved messages

export default function ChatWindow() {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const abortRef = useRef<AbortController | null>(null)
    const bottomRef = useRef<HTMLDivElement | null>(null)

    // load persisted UI history once
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (raw) {
                const parsed = JSON.parse(raw)
                if (Array.isArray(parsed)) {
                    // basic shape check and cap length for safety
                    const restored = parsed
                        .filter((m) => m && typeof m === 'object' && typeof m.content === 'string')
                        .slice(-200)
                        .map((m: any) => ({
                            id: typeof m.id === 'string' && m.id ? m.id : newId(),
                            role: m.role ?? 'assistant',
                            content: String(m.content),
                            ts: typeof m.ts === 'number' ? m.ts : Date.now(),
                        }))
                    setMessages(restored)
                }
            }
        } catch {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // persist UI history (we never send it to backend)
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
        } catch {}
    }, [messages])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    async function handleSend(text: string) {
        if (loading) return
        setLoading(true)

        const userMsg: Message = { id: newId(), role: 'user', content: text, ts: Date.now() }
        setMessages((prev) => [...prev, userMsg])

        const ac = new AbortController()
        abortRef.current = ac
        try {
            // send exactly one user turn (matches your backend)
            const payload = { messages: [{ role: 'user' as const, content: text }] }
            const reply = await sendChat(payload, { signal: ac.signal })

            const botMsg: Message = { id: newId(), role: 'assistant', content: reply, ts: Date.now() }
            setMessages((prev) => [...prev, botMsg])
        } catch (err: any) {
            setMessages((prev) => [
                ...prev,
                {
                    id: newId(),
                    role: 'assistant',
                    content: `⛔️ ${err?.message || 'Something went wrong'}`,
                    ts: Date.now(),
                },
            ])
        } finally {
            setLoading(false)
            abortRef.current = null
        }
    }

    function cancel() {
        abortRef.current?.abort()
    }

    function clearChat() {
        setMessages([])
        try {
            localStorage.removeItem(STORAGE_KEY)
        } catch {}
    }

    return (
        <div className="flex flex-col h-dvh max-h-dvh">
            <header className="sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
                <div className="mx-auto w-full max-w-3xl p-4 grid grid-cols-[1fr_auto] gap-3 items-start">
                    {/* Left: title + note banner */}
                    <div>
                        <h1 className="text-[2rem] font-semibold tracking-wide text-slate-200 font-brand">Miskatonic Messenger</h1>
                        <p className="mt-2 text-[0.75rem] text-amber-200 bg-amber-900/20 border border-amber-800/40 rounded-md px-2 py-1">
                            Note: There is no context being passed as it is made to run with the Eldritch Oracle API
                            which by default has a very small context window. If we kept context, there would be no room
                            for RAG grounding.
                        </p>
                    </div>

                    {/* Right: status + actions */}
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 self-start">
                        <span>{import.meta.env.VITE_API_BASE_URL ? 'prod→' : 'dev→proxy /api'}</span>
                        <button
                            onClick={clearChat}
                            className="rounded-md border border-slate-700 px-2 py-1 hover:bg-slate-800"
                            title="Clear conversation"
                        >
                            Clear
                        </button>
                        {loading && (
                            <button
                                onClick={cancel}
                                className="rounded-md border border-slate-700 px-2 py-1 hover:bg-slate-800"
                                title="Cancel request"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-3xl px-4 py-4">
                    {messages.length === 0 && !loading && (
                        <div className="text-sm text-slate-400 italic px-1">Ask the Eldritch Oracle anything to begin.</div>
                    )}

                    {messages.map((m) => (
                        <MessageBubble key={m.id} msg={m} />
                    ))}

                    {loading && (
                        <div className="w-full my-2">
                            <div className="flex justify-start">
                                <div
                                    className="rounded-2xl border border-slate-600/40 bg-slate-800/70 px-4 py-3 shadow"
                                    role="status"
                                    aria-live="polite"
                                    aria-label="Assistant is typing"
                                >
                                    <LoadingDots />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>
            </main>

            <footer className="border-t border-slate-800">
                <div className="mx-auto w-full max-w-3xl px-4 py-4">
                    <ChatInput onSend={handleSend} disabled={loading} />
                    <p className="mt-2 text-[11px] text-slate-500">
                        Tip: set <code>VITE_API_BASE_URL</code> in <code>.env</code> for production, or use the dev proxy.
                    </p>
                </div>
            </footer>
        </div>
    )
}
