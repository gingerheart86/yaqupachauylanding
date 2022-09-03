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
          <p className="mt-6 max-w-3xl text-lg text-white bg-cyan-900/90 p-4 rounded-2xl shadow-xl">
            un texto mas lindo
          </p>
        </div>
      </div>
      <div className="relative">
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
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-12 sm:px-6 lg:px-8 bg-cyan-800">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Qué es Yaque Pacha Uruguay?
          </h1>
          <p className=" max-w-3xl text-xl text-gray-200   p-4 rounded-2xl shadow-xl ">
            Yaqu Pacha Uruguay es una filial de la Organización para la
            Conservación de Mamíferos Acuáticos en América del Sur - Yaqu Pacha
            e.V. en Alemania. La organización tiene como objetivos investigar y
            conservar las especies de mamíferos acuáticos en América del Sur, en
            particular aquellas amenazadas, así como difundir y concientizar a
            las personas sobre la importancia de estudiar y conservar a estas
            especies y sus ambientes.
          </p>
        </div>
        <div className="relative mx-auto max-w-7xl py-12 px-4  sm:px-6 lg:px-8 bg-teal-800">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Cuál es el objetivo?
          </h1>
          <p className=" max-w-3xl text-xl text-gray-200  p-4 rounded-2xl shadow-xl ">
            Esta filial fue creada en 2013 incorporando al ***Proyecto
            Toninas*** que se venía desarrollando desde 2002 en Uruguay. Los dos
            objetivos principales de este proyecto son estudiar a la tonina
            *Tursiops truncatus gephyreus*, una subespecie del delfín nariz de
            botella *Tursiops truncatus* que ocurre únicamente en la zona
            costera del sur de Brasil, Uruguay y Argentina, y promover la
            educación ambiental costera, la conciencia sobre los efectos del
            cambio climático y a la tonina como especie centinela de la costa.
          </p>
        </div>
        <div className="relative  py-12 px-4  sm:px-6 lg:px-8 bg-cyan-800">
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
              Conoce mas en nuestras redes sociales
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-indigo-100">
              Mattis amet hendrerit dolor, quisque lorem pharetra. Pellentesque
              lacus nisi urna, arcu sociis eu. Orci vel lectus nisl eget eget ut
              consectetur. Sit justo viverra non adipisicing elit distinctio.
              ssss
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
