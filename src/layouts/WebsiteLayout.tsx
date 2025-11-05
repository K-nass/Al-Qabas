import { Outlet } from "react-router-dom";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function WebsiteLayout() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors">
      <header className="p-4 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Al-Qabas</h1>
          <ThemeToggle />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
