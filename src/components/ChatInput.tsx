import type { FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

export default function ChatInput({
                                      onSend,
                                      disabled,
                                  }: { onSend: (text: string) => void; disabled?: boolean }) {
    const [text, setText] = useState('')
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        ref.current?.focus()
    }, [])

    const submit = (e: FormEvent) => {
        e.preventDefault()
        const t = text.trim()
        if (!t) return
        onSend(t)
        setText('')
    }

    return (
        <form onSubmit={submit} className="flex gap-2">
            <input
                ref={ref}
                aria-label="Message"
                className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Ask the Eldritch Oracle…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={disabled}
            />
            <button
                type="submit"
                className="rounded-xl px-5 py-3 bg-emerald-500/90 hover:bg-emerald-400 text-slate-900 font-semibold disabled:opacity-50"
                disabled={disabled}
                aria-label="Send message"
            >
                Send
            </button>
        </form>
    )
}
