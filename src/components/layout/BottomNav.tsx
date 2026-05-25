import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/',      label: 'TODAY' },
  { to: '/month', label: 'MONTH' },
  { to: '/year',  label: 'YEAR' },
];

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 flex">
        {TABS.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end
            className={({ isActive }) =>
              `flex-1 relative flex items-center justify-center py-3.5 transition-colors ${
                isActive ? 'text-black' : 'text-gray-300 hover:text-gray-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute top-0 inset-x-0 h-0.5 bg-black" />}
                <span className="text-[11px] font-medium tracking-[0.15em]">{tab.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
