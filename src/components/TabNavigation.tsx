import Link from 'next/link';
import { useRouter } from 'next/router';

const TabNavigation = () => {
  const router = useRouter();

  return (
    <nav className="flex justify-center space-x-4 mb-8">
      <Link href="/" className={`px-3 py-2 rounded-md ${router.pathname === '/' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}>
        Life Matrix
      </Link>
      <Link href="/seasons" className={`px-3 py-2 rounded-md ${router.pathname === '/seasons' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}>
        Seasons
      </Link>
      <Link href="/settings" className={`px-3 py-2 rounded-md ${router.pathname === '/settings' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}>
        Settings
      </Link>
    </nav>
  );
};

export default TabNavigation;