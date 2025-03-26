'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { setCookie } from 'nookies';
import { useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2Icon } from 'lucide-react';
import { useUserDataStore } from '../stores/use-data-store';
import { signIn } from '../services/auth.service';

export default function SignInForm() {
  const router = useRouter();
  const { setUserData } = useUserDataStore();

  const singInFormSchema = z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'Obrigatório ter 6 caracteres'),
  });
  type SingInFormSchema = z.infer<typeof singInFormSchema>;

  const [showPassword, setShowPassword] = useState(false);
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  async function handleLoginUserAccount(form: SingInFormSchema) {
    try {
      console.log('entrou');
      const response = await signIn(form);

      const { token, email, username } = response || {};

      if (!token) {
        throw new Error('Token não encontrado na resposta da API');
      }

      const user = { token, email, username };

      setCookie(undefined, 'picspace.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setUserData({ username, token });

      router.push('/gallery/');
    } catch (error: any) {
      console.error('Erro durante o login:', error);
      const status = error?.response?.status;

      if (status === 401) {
        toast.error('Email ou senha incorretos.');
      } else if (status === 500) {
        toast.error('Erro interno no servidor.');
      } else {
        toast.error(
          error.message || 'Ocorreu um erro inesperado. Tente novamente.',
        );
      }
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SingInFormSchema>({
    resolver: zodResolver(singInFormSchema),
  });
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-[#64ffda] mb-6">
        Bem-vindo(a)
      </h2>
      <form
        onSubmit={handleSubmit(handleLoginUserAccount)}
        className="flex flex-col gap-6"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">E-mail</label>
          <Input
            type="text"
            placeholder="Digite o seu e-mail de acesso"
            errorMessage={errors.email?.message}
            className="bg-[#1a2b4a] border-[#233554]  placeholder:text-gray-400 focus:border-[#64ffda] focus:ring-[#64ffda]"
            inputClassName=" placeholder:text-gray-400"
            {...register('email')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Senha</label>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite sua senha"
            errorMessage={errors.password?.message}
            className="bg-[#1a2b4a] border-[#233554]  placeholder:text-gray-400 focus:border-[#64ffda] focus:ring-[#64ffda]"
            inputClassName=" placeholder:text-gray-400"
            {...register('password')}
            preppend={
              !showPassword ? (
                <Eye
                  className="w-4 text-gray-400 cursor-pointer hover:text-[#64ffda] transition-colors"
                  onClick={handleShowPassword}
                />
              ) : (
                <EyeOff
                  className="w-4 text-gray-400 cursor-pointer hover:text-[#64ffda] transition-colors"
                  onClick={handleShowPassword}
                />
              )
            }
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className={`h-12 text-xl font-medium bg-[#64ffda] text-[#0a192f] hover:bg-[#52e0c4] transition-all duration-300 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <p className="text-base font-bold">Entrar aqui</p>
          )}
        </Button>
      </form>
    </div>
  );
}
