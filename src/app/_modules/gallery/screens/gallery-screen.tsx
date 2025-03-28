'use client';
import CardPicture from '../components/card-picture';
import { getGallery } from '../services/gallery.service';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import { ModalAddPicture } from '../components/modalAddPicture';
import { ModalDeletePicture } from '../components/modalDeletePicture';
import { useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';
import LoadingSpinner from '@/components/loading-spinner';

export default function GalleryScreen() {
  const [modalAddPicture, setModalAddPicture] = useState(false);
  const [modalDeletePicture, setModalDeletePicture] = useState<{
    visible: boolean;
    imageId: string;
  }>({
    visible: false,
    imageId: '',
  });

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const debouncedSearch = useDebounce(searchQuery, 500);

  const fetchPictures = async () => {
    const response = await getGallery(debouncedSearch);
    return response;
  };

  const {
    data: pictures,
    error,
    isLoading,
  } = useSWR(
    debouncedSearch ? `/gallery?search=${debouncedSearch}` : '/gallery',
    fetchPictures,
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">
          Erro ao carregar Fotos: {error.message}
        </p>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-[#0a192f] p-4 sm:p-8">
      <div className="max-w-[1220px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#64ffda]">
            Sua Galeria
          </h1>
          <Button
            onClick={() => setModalAddPicture(true)}
            className="bg-[#64ffda] text-[#0a192f] hover:bg-[#52e0c4] transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Foto
          </Button>
        </div>
        {pictures?.data.length === 0 && (
          <div className="w-full mt-[20%] flex flex-col gap-4 items-center">
            <p className="text-center text-gray-500 text-2xl">
              Nenhuma foto encontrada
            </p>
            <Button
              className="bg-[#64ffda] text-[#0a192f] hover:bg-[#52e0c4] transition-all duration-300 flex items-center gap-2 w-52"
              onClick={() => setModalAddPicture(true)}
            >
              Adicionar Foto
            </Button>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pictures?.data.map((picture) => (
            <div key={picture.id} className="relative group">
              <CardPicture
                imageUrl={picture.imageUrl}
                tags={picture.tags.map((tag) => tag.name)}
              />
              <Button
                onClick={() =>
                  setModalDeletePicture({
                    visible: true,
                    imageId: picture.id,
                  })
                }
                className="absolute top-2 right-2 bg-[#112240] text-[#64ffda] hover:bg-[#1a2b4a] md:opacity-0   md:group-hover:opacity-100 transition-opacity duration-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <ModalAddPicture
        open={modalAddPicture}
        onClose={() => setModalAddPicture(false)}
      />
      <ModalDeletePicture
        open={modalDeletePicture.visible}
        onClose={() => setModalDeletePicture({ visible: false, imageId: '' })}
        imageId={modalDeletePicture.imageId}
      />
    </div>
  );
}
