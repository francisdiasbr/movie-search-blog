import { Topbar } from '../Topbar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Topbar />
      <main className="pt-6">
        {children}
      </main>
    </div>
  );
} 