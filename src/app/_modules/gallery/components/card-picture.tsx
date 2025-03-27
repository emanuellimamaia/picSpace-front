import Image from 'next/image';

interface CardPictureProps {
  imageUrl: string;
  tags: string[];
}

export default function CardPicture({ tags, imageUrl }: CardPictureProps) {
  return (
    <div className="w-full">
      <div className="bg-[#112240] min-h-60 rounded-lg shadow-lg relative overflow-hidden">
        <Image
          className="rounded-lg w-full h-full min-h-60: object-cover"
          src={imageUrl}
          alt="picture"
          width={232}
          height={232}
        />
      </div>
      <div className="mt-4">
        <p className="text-sm font-bold text-[#64ffda] mb-2">Tags:</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm font-medium bg-[#1a2b4a] text-[#64ffda] px-3 py-1 rounded-full border border-[#233554]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
