import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ModalProps } from '@/lib/interface';

export function ModalAddPicture({ open, onClose }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Foto</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Input type="file" />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
