import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        <Link to="/" className="text-sm font-bold tracking-[0.2em] text-black">
          ENOW
        </Link>
        <Link to="/login" className="text-xs font-medium text-black transition-colors tracking-wide">
          로그인
        </Link>
      </div>
    </header>
  );
}
