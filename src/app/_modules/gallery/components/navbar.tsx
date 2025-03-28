'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { LogOutIcon, Search, SearchIcon, User } from 'lucide-react';
import { destroyCookie } from 'nookies';
import { toast } from 'sonner';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useUserDataStore } from '../../auth/stores/use-data-store';
import { useDebounce } from '@/hooks/use-debounce';
import { useEffect, useState } from 'react';

export function Navbar() {
  const { userData: user } = useUserDataStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || '',
  );
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const cleanedSearch = debouncedSearch.replace(/\s+/g, '');
    if (cleanedSearch) {
      params.set('search', cleanedSearch);
    } else {
      params.delete('search');
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, pathname, router, searchParams]);

  function handleSignOut() {
    destroyCookie(undefined, 'fulog.token', {
      path: '/',
    });
    destroyCookie(undefined, 'role.user', {
      path: '/',
    });

    toast.info(`Você não está mais autenticado!`, {
      duration: 3000,
    });

    router.push('/');
    router.replace('/');
  }

  return (
    <div className="w-full bg-[#112240]">
      <div className="max-w-[1220px] mx-auto">
        <div className="flex flex-row justify-between items-center p-2 sm:p-4">
          <div className="flex flex-row items-center gap-2 sm:gap-4">
            <HamburgerMenuIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white cursor-not-allowed" />
            <div className="relative w-32 sm:w-40">
              <Input
                className="h-8 sm:h-10 w-full md:w-[20rem] bg-[#1a2b4a] border-[#233554] placeholder:text-gray-400 focus:border-[#64ffda] focus:ring-[#64ffda]"
                preppend={<SearchIcon className="w-4 h-4 text-gray-400" />}
                placeholder="Pesquisar pela tag"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-1 sm:gap-2 bg-white border border-gray-300 p-1 rounded-lg shadow-sm cursor-pointer items-center">
              <div className="border p-1 rounded-full w-fit">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base">
                {user.username}
              </h3>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-48">
              <DropdownMenuItem
                onClick={() => handleSignOut()}
                className="cursor-pointer"
              >
                <LogOutIcon className="w-4 h-4 mr-2" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
