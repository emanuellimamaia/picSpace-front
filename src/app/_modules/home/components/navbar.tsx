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
import { usePathname, useRouter } from 'next/navigation';
import { useUserDataStore } from '../../auth/stores/use-data-store';

export function Navbar() {
  const { userData: user } = useUserDataStore();
  const router = useRouter();
  const pathname = usePathname();

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
    <div className="flex flex-row justify-between items-center p-4 bg-[#112240]">
      <div className="flex flex-row items-center gap-4">
        <HamburgerMenuIcon className="w-6 h-6 text-white cursor-pointer" />
        <Input
          className=" h-6 w-40 text-white "
          preppend={<SearchIcon className="w-4 h-4 text-gray-400" />}
          placeholder="Pesquisar"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 bg-white border border-gray-300 p-1 rounded-lg shadow-sm cursor-pointer items-center">
          <div className="border p-1 rounded-full  w-fit">
            <User />
          </div>
          <h3 className="font-semibold">{user.username}</h3>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem onClick={() => handleSignOut()}>
            <LogOutIcon />
            <a>Sair</a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
