/* This example requires Tailwind CSS v2.0+ */
export default function Home() {
  return (
    <div className="relative ">
      <div className="relative min-h-[40rem]">
        <div className="absolute inset-0">
          <img className="h-full w-full object-cover" src="/dol1.jpg" alt="" />
          <div
            className="absolute inset-0  mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Yaqu Pacha Uruguay
          </h1>
          <h1 className="mt-14 max-w-2xl text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-8 xl:text-3xl">
            <span className="block bg-gradient-to-r from-white to-cyan-200 bg-clip-text pb-3 text-transparent sm:pb-5">
              Si cuidamos las toninas cuidamos la costa, si cuidamos la costa
              cuidamos las toninas
            </span>
          </h1>
        </div>
        {/* <img
          className="absolute bottom-10 right-32 w-96 object-cover"
          src="/logo.png"
          alt=""
        /> */}
      </div>
      <div className="relative flex flex-col items-center justify-center w-full">
        {/* <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="/gomon.jpeg"
            alt=""
          />
          <div
            className="absolute inset-0  mix-blend-multiply"
            aria-hidden="true"
          />
        </div> */}
        <div className="relative w-full max-w-7xl pt-24 px-4 sm:py-12 sm:px-6 lg:px-8 bg-white">
          <h1 className="text-3xl font-bold tracking-tight text-cyan-600 sm:text-3xl lg:text-4xl">
            Qué es Yaqu Pacha Uruguay?
          </h1>
          <div className="flex justify-between">
            <p className=" max-w-3xl  text-xl text-slate-400   p-4 rounded-2xl shadow-xl relative ">
              Yaqu Pacha Uruguay es una filial de la Organización para la
              Conservación de Mamíferos Acuáticos en América del Sur - Yaqu
              Pacha e.V. en Alemania. La organización tiene como objetivos
              investigar y conservar las especies de mamíferos acuáticos en
              América del Sur, en particular aquellas amenazadas, así como
              difundir y concientizar a las personas sobre la importancia de
              estudiar y conservar a estas especies y sus ambientes.
            </p>
            <div className="flex justify-around flex-1">
              <img src="logo_sinf.png" className="w-56 h-56  " alt="" />
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-7xl sm:py-12 px-4  sm:px-6 lg:px-8 bg-white">
          <h1 className="text-3xl font-bold tracking-tight text-teal-600 sm:text-3xl lg:text-4xl">
            Cuál es el objetivo?
          </h1>
          <p className=" max-w-3xl text-xl text-slate-400  p-4 rounded-2xl shadow-xl ">
            Esta filial fue creada en 2013 incorporando al Proyecto Toninas que
            se venía desarrollando desde 2002 en Uruguay. Los dos objetivos
            principales de este proyecto son estudiar a la tonina *Tursiops
            truncatus gephyreus*, una subespecie del delfín nariz de botella
            *Tursiops truncatus* que ocurre únicamente en la zona costera del
            sur de Brasil, Uruguay y Argentina, y promover la educación
            ambiental costera, la conciencia sobre los efectos del cambio
            climático y a la tonina como especie centinela de la costa.
          </p>
        </div>
        <div className="relative  pb-12 px-4  sm:px-6 lg:px-8 bg-cyan-800 w-full">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src="/gomon.jpeg"
              alt=""
            />
            <div
              className="absolute inset-0 bg-cyan-600 mix-blend-multiply"
              aria-hidden="true"
            />
          </div>
          <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Conoce más en nuestras redes sociales
            </h1>
            <div className=" max-w-3xl flex space-x-10 mt-8 ">
              <a
                href="https://www.instagram.com/proyecto.toninas/"
                className=""
              >
                <img src="/iglogo.png" alt="" className="w-20 h-20" />
              </a>
              <a href="https://es-la.facebook.com/yaqupachauy/">
                <img src="/fblogo.png" alt="" className="w-20 h-20" />
              </a>
              <a href="">
                <img src="/twlogo.png" alt="" className="w-20 h-20" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
