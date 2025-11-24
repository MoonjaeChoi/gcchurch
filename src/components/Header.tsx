import Link from 'next/link';
import { getDepartments } from '@/lib/data';

export default function Header() {
  const departments = getDepartments();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            과천교회
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              홈
            </Link>
            {departments.map(dept => (
              <Link
                key={dept.id}
                href={`/departments/${dept.id}`}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {dept.name}
              </Link>
            ))}
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              블로그
            </Link>
            <Link href="/calendar" className="text-sm font-medium hover:text-primary transition-colors">
              일정
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
