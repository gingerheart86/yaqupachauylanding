import Gallery from "../../components/imagegallery.client";

export default function Home() {
  return (
    <div className="relative   py-16 bg-white max-w-7xl mx-auto">
      <div className="relative px-4 sm:px-6 lg:px-8 ">
        <div className="  text-lg ">
          <h2 className="mt-8 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Toninas Centinelas de la costa
          </h2>

          <p className="mt-8 text-base leading-8 text-gray-500">
            Financiado por ECOSSUR, durante 9 meses (2021-2022) realizamos
            diversas actividades que involucran el trabajo en monitoreo,
            educación ambiental y capacitación para la gestión costera, eje
            central de cara a la adaptación frente al CC y por lo tanto de la
            Convención Marco Naciones Unidas sobre el Cambio Climático (CMNUCC)
            y del Convenio sobre Diversidad Biológica (CDB)este proyecto.
            Compartimos información sobre el cambio climático en la zona
            costera, especialmente sobre su impacto en las toninas, especie
            carísmática y bandera de la costa uruguaya, cuya conservación podría
            verse afectada si no actuamos para reducir los impactos generados.
            Durante este proyecto, realizamos actividades educativas en el
            ámbito escolar (en colaboración con el grupo Costa+), intervenciones
            artísticas en la playa, material de difusión y talleres de
            capacitación para operadores turísticos de Maldonado y Rocha.
          </p>
          <figure className="my-4">
            <img className="w-full rounded-lg" src="/pic1.png" alt="" />
          </figure>

          <h2 className="mt-8 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-3xl">
            Galería de fotos
          </h2>
          <div className="max-w-5xl  w-full mx-auto">
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
}
