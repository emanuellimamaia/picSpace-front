import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ModalProps } from '@/lib/interface';
import { deletePictureService } from '../services/gallery.service';
import { toast } from 'sonner';
import { mutate } from 'swr';
import { useTransition } from 'react';
import { Loader2Icon } from 'lucide-react';

interface ModalDeletePictureProps extends ModalProps {
  imageId: string;
}

export function ModalDeletePicture({
  open,
  onClose,
  imageId,
}: ModalDeletePictureProps) {
  const [isPending, startTransition] = useTransition();
  async function onDeletePicture(id: string) {
    startTransition(async () => {
      try {
        await deletePictureService(id);
        toast.success('Foto excluída com sucesso');
        mutate('/gallery');
        onClose();
      } catch (error) {
        toast.error('Erro ao excluir foto');
        console.log(error);
      }
    });
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#233554]">Excluir foto</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p>Tem certeza que deseja excluir a foto?</p>
        </DialogDescription>
        <div className="w-full flex gap-4 justify-between">
          <Button
            className="flex-1 bg-red-500 text-white font-bold hover:bg-[#52e0c4]"
            onClick={() => onDeletePicture(imageId)}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2Icon className="w-5 h-5 animate-spin" />
            ) : (
              'Excluir'
            )}
          </Button>
          <Button
            className="flex-1 bg-[#233554] text-white font-bold hover:bg-[#1a2b4a]"
            disabled={isPending}
            onClick={onClose}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
