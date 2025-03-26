import { api } from "@/lib/axios";


interface SingInFormSchema {
  email: string;
  password: string;
}
interface SingUpFormSchema {
  username: string;
  email: string;
  password: string;
}
export async function signIn(form: SingInFormSchema) {
  const response = await api.post("/auth/login", form);
  return response.data;
}
export async function singUp(form: SingUpFormSchema) {
  const response = await api.post("/create-user", form);
  return response.data;
}
