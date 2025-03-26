'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from 'sonner';
import { setCookie } from 'nookies';
import { useRouter } from 'next/navigation';
import { useUserDataStore } from '../stores/use-data-store';
import { singUp } from '../services/auth.service';

export default function SingUpForm() {
  const router = useRouter();
  const { setUserData } = useUserDataStore();
  const [showPassword, setShowPassword] = useState(false);
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  const singUpFormSchema = z.object({
    userName: z.string().min(3, 'Obrigatório ter 3 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'Obrigatório ter 6 caracteres'),
  });

  type SingUpFormSchema = z.infer<typeof singUpFormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SingUpFormSchema>({
    resolver: zodResolver(singUpFormSchema),
  });

  async function handleSingUp(form: SingUpFormSchema) {
    try {
      const response = await singUp(form);
      toast.success('Cadastro realizado com sucesso');
      const { accessToken, name, email, username } = response;

      const user = {
        accessToken,
        name,
        email,
        username,
      };

      setCookie(undefined, 'picspace.token', accessToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setUserData({ username: name, token: accessToken });
      router.push('/gallery/');
    } catch (error: any) {
      if (error.status === 409) {
        console.log('entrou');
        toast.error('Email já existe');
      } else {
        toast.error('Erro ao cadastrar');
      }
    }
  }
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-[#64ffda] mb-6">
        Criar Conta
      </h2>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(handleSingUp)}
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Nome do usuário
          </label>
          <Input
            type="text"
            placeholder="Digite seu nome"
            errorMessage={errors.userName?.message}
            className="bg-[#1a2b4a] border-[#233554] placeholder:text-gray-400 focus:border-[#64ffda] focus:ring-[#64ffda]"
            inputClassName=" placeholder:text-gray-400"
            {...register('userName')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">E-mail</label>
          <Input
            type="text"
            placeholder="Digite o seu e-mail"
            errorMessage={errors.email?.message}
            className="bg-[#1a2b4a] border-[#233554] placeholder:text-gray-400 focus:border-[#64ffda] focus:ring-[#64ffda]"
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
            className="bg-[#1a2b4a] border-[#233554] placeholder:text-gray-400 focus:border-[#64ffda] focus:ring-[#64ffda]"
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
            <p className="text-base font-bold">Cadastrar</p>
          )}
        </Button>
      </form>
    </div>
  );
}
