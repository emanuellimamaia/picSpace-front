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

export function Navbar() {
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
          <h3 className="font-semibold">Emaenuel</h3>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem>
            <LogOutIcon />
            <a>Sair</a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
