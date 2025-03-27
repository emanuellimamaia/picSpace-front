import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ModalProps } from '@/lib/interface';
import { addPictureService } from '../services/gallery.service';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Loader2Icon } from 'lucide-react';
import { mutate } from 'swr';

export function ModalAddPicture({ open, onClose }: ModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function onAddPicture() {
    startTransition(async () => {
      if (!selectedFile) return;
      try {
        await addPictureService(selectedFile);
        toast.success('Foto adicionada com sucesso');
        onClose();
        mutate('/gallery');
        setSelectedFile(null);
        setPreviewUrl(null);
      } catch (error) {
        toast.error('Erro ao adicionar foto');
        console.log(error);
      }
    });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#64ffda]">Adicionar Foto</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="bg-[#1a2b4a] border-[#233554] "
          />
          {previewUrl && (
            <div className="relative w-full h-48 mt-4 rounded-lg overflow-hidden bg-[#112240]">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogDescription>
        <DialogFooter className="w-full">
          <Button
            className="w-full bg-[#64ffda] text-[#0a192f] hover:bg-[#52e0c4]"
            type="button"
            onClick={onAddPicture}
            disabled={!selectedFile || isPending}
          >
            {isPending ? (
              <Loader2Icon className="w-5 h-5 animate-spin" />
            ) : (
              'Adicionar'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
