import { Navbar } from '@/app/_modules/gallery/components/navbar';
import { Suspense } from 'react';

export default function GalleryLayout(props: { children: React.ReactNode }) {
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
