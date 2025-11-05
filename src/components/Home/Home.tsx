export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Al-Qabas</h1>
      <p className="text-[var(--text-secondary)] mb-6">
        This is a sample page to demonstrate the dark and light theme toggle functionality.
      </p>
      <div className="bg-[var(--bg-secondary)] p-6 rounded-lg border border-[var(--border)]">
        <h2 className="text-xl font-semibold mb-2">Sample Content</h2>
        <p className="text-[var(--text-secondary)]">
          This content area uses the theme variables to adapt to light and dark modes.
        </p>
      </div>
    </div>
  )
}
