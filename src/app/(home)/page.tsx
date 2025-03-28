'use client';
import Image from 'next/image';
import Link from 'next/link';
import HomeImage from '../../../public/home-gallery.png';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a192f] text-white flex flex-col items-center justify-center p-8 sm:p-20">
      <motion.header
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-6xl font-bold text-[#64ffda]">
          PicSpace
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 mt-4">
          Sua galeria inteligente com IA
        </p>
      </motion.header>

      <motion.div
        className="relative w-full max-w-3xl h-64 sm:h-96 rounded-lg overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Image
          src={HomeImage}
          alt="Galeria Inteligente"
          layout="fill"
          objectFit="cover"
          className="opacity-80 hover:opacity-100 transition-opacity duration-300"
        />
      </motion.div>

      <motion.section
        className="mt-12 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#64ffda]">
          Organização e Eficiência
        </h2>
        <p className="text-gray-400 mt-4">
          Nossa IA identifica automaticamente as imagens e adiciona tags
          inteligentes, tornando a busca e organização mais rápidas e
          eficientes.
        </p>
      </motion.section>

      <motion.footer
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/sign-in"
          className="px-6 py-3 bg-[#64ffda] text-[#0a192f] font-semibold rounded-lg shadow-md 
                     hover:bg-[#52e0c4] transition-all duration-300"
        >
          Experimente Agora
        </Link>
      </motion.footer>
    </div>
  );
}
