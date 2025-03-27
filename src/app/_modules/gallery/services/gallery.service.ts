import { api } from "@/lib/axios";


interface tags {
  id: string;
  name: string;
}
interface Gallery {
  id: string;
  imageUrl: string;
  tags: tags[];
}

export async function getGallery(search?: string) {
  const response = await api.get<Gallery[]>("/pictures", {
    params: {
      tag: search,
    },
  });
  return response;
}

export async function addPictureService(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post("/upload-picture/picture", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}
export async function deletePictureService(id: string) {
  const response = await api.delete(`/delete-picture/${id}`);
  return response;
}
