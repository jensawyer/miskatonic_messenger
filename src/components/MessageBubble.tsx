import { useState } from 'react'
import type { Message } from '../types'

export default function MessageBubble({ msg }: { msg: Message }) {
    const isUser = msg.role === 'user'
    const [copied, setCopied] = useState(false)

    const base = 'max-w-[80%] rounded-2xl px-4 py-3 shadow border'
    const userCls = 'bg-emerald-500/10 border-emerald-400/30 text-emerald-100'
    const botCls  = 'bg-slate-800/70 border-slate-600/40 text-slate-100'
    const time = new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    async function copy() {
        try {
            await navigator.clipboard.writeText(msg.content)
            setCopied(true)
            setTimeout(() => setCopied(false), 1200)
        } catch {}
    }

    return (
        <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
            <div className={`${base} ${isUser ? userCls : botCls} relative`}>
                {!isUser && (
                    <button
                        onClick={copy}
                        className="absolute -top-2 -right-2 rounded-md border border-slate-700/60 bg-slate-900/80 px-2 py-1 text-[10px] hover:bg-slate-800"
                        title="Copy message"
                        aria-label="Copy assistant message"
                    >
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                )}

                <div className={isUser ? '' : 'prose prose-invert max-w-none prose-p:my-2 prose-pre:my-2'}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>

                <div className="mt-1 text-[10px] text-slate-400 text-right">{time}</div>
            </div>
        </div>
    )
}
