interface TestimonialCardProps {
    name: string;
    image: string;
    opinion: string;
  }
  
  export function TestimonialCard({ name, image, opinion }: TestimonialCardProps) {
    return (
      <div className="bg-white shadow-md rounded-2xl p-6 text-center flex flex-col items-center">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mb-4"
        />
        <h4 className="font-semibold text-lg mb-2">{name}</h4>
        <p className="text-gray-600 text-sm">{opinion}</p>
      </div>
    );
  }
  