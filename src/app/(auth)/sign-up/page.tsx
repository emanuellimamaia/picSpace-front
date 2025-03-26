import SingUpForm from '@/app/_modules/auth/screens/sign-up-form';

export default function SignUp() {
  return (
    <div className="min-h-screen bg-[#0a192f]  flex flex-col items-center justify-center p-8 sm:p-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-[#64ffda]">
          PicSpace
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 mt-4">
          Sua galeria inteligente com IA
        </p>
      </header>

      <div className="w-full max-w-md bg-[#112240] p-8 rounded-lg shadow-lg">
        <SingUpForm />
      </div>
    </div>
  );
}
