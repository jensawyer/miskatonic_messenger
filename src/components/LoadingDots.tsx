export default function LoadingDots() {
    return (
        <span className="inline-flex items-center gap-1 text-slate-400">
            <span className="loading-dot">•</span>
            <span className="loading-dot" style={{ animationDelay: '0.15s' }}>•</span>
            <span className="loading-dot" style={{ animationDelay: '0.3s' }}>•</span>
        </span>
    )
}
