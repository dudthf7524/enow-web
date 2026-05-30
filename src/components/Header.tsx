import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white">
      <div className="px-20 py-10 flex items-center justify-between">
        <Link to="/today" className="text-black text-xs">
          TODAY
        </Link>
        <Link to="/" className="text-2xl font-bold text-black">
          ENOW
        </Link>
        <Link to="/login" className="text-black text-xs">
          로그인
        </Link>
      </div>
    </header>
  );
}
