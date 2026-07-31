export default function Home() {
  return (
    <div className="relative   py-16 bg-white max-w-7xl mx-auto">
      <div className="relative px-4 sm:px-6 lg:px-8 ">
        <div className="  text-lg ">
          <h2 className="mt-8 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Proyecto Gephyreus{" "}
          </h2>
          <p className="mt-8 text-base leading-8 text-gray-500">
            Desde 2018, formamos parte de un proyecto binacional en conjunto con
            investigadores brasileños, con el fin de estimar la abundancia de
            toninas del Atlántico Sudoccidental.
          </p>
          <div className=" flex space-x-3 items-center">
            {/* <figure className="my-4">
              <img
                className="w-full rounded-lg"
                src="pic2.webp"
                alt=""

              />
            </figure> */}
            <figure className="my-4">
              <img className="w-full rounded-lg   " src="pic3.jpg" alt="" />
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
              title="Embedded youtube"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
