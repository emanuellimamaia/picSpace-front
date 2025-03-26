import { Navbar } from '@/app/_modules/home/components/navbar';
import { Suspense } from 'react';

export default function (props: { children: React.ReactNode }) {
  return (
    <main className="flex flex-row">
      <Suspense>
        <div className="flex flex-col w-full max-h-screen ">
          <div className="">
            <Navbar />
          </div>
          <div className="overflow-auto ">{props.children}</div>
        </div>
      </Suspense>
    </main>
  );
}
