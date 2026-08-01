import Image from "next/image";

export const metadata = {
  title: "Proyecto Gephyreus",
  description:
    "Trabajo regional con Brasil y Argentina para conservar al delfín de Lahille (Tursiops truncatus gephyreus) en el Atlántico Sur occidental.",
};

export default function Home() {
  return (
    <div className="relative   py-16 bg-white max-w-7xl mx-auto">
      <div className="relative px-4 sm:px-6 lg:px-8 ">
        <div className="  text-lg ">
          <h1 className="mt-8 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Proyecto Gephyreus{" "}
          </h1>
          <p className="mt-8 text-base leading-8 text-gray-500">
            Desde 2018, formamos parte de un proyecto binacional en conjunto con
            investigadores brasileños, con el fin de estimar la abundancia de
            toninas del Atlántico Sudoccidental.
          </p>
          <div className=" flex space-x-3 items-center">
            {/* <figure className="my-4">
              <img
                className="w-full rounded-lg"
                src="/pic2.webp"
                alt=""

              />
            </figure> */}
            <figure className="my-4">
              <Image
                className="w-full h-auto rounded-lg"
                src="/pic3.jpg"
                alt="Actividades del Proyecto Gephyreus"
                width={819}
                height={1024}
              />
            </figure>
          </div>
          <div className="flex justify-center w-full">
            <iframe
              width="650"
              height="480"
              src={`https://www.youtube.com/embed/B57lG7eKorA`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title="Embedded youtube"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
