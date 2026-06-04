export default function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-[rgba(15,27,45,0.12)] border-t-gold"
          aria-label="Loading"
        />
        <p className="text-xs uppercase tracking-editorial text-muted">Loading…</p>
      </div>
    </div>
  );
}

