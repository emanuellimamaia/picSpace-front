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

export async function getGallery() {
  const response = await api.get<Gallery[]>("/pictures");
  return response;
}

