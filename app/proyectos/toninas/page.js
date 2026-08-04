import Image from "next/image";
import Gallery from "../../../components/imagegallery";
import { Section, PageHeader } from "../../../components/ui";

export const metadata = {
  title: "Toninas, centinelas de la costa",
  description:
    "El proyecto que estudia a las toninas en La Paloma, Cabo Polonio y Cerro Verde desde 2002, y trabaja en educación ambiental con las comunidades de la costa de Rocha.",
};

export default function Home() {
  return (
    <Section fondo="claro">
      <div className="flex justify-center">
        <Image
          src="/logo-toninas.png"
          alt="Proyecto Toninas: Centinelas de la Costa"
          width={600}
          height={494}
          className="w-48 h-auto sm:w-56"
        />
      </div>
      <PageHeader title="Toninas Centinelas de la costa" className="mt-6" />

      <p className="mt-8 text-base leading-8 text-texto">
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
        <Image
          className="w-full h-auto rounded-lg"
          src="/pic1.png"
          alt="Actividades del proyecto Toninas Centinelas de la costa"
          width={957}
          height={225}
        />
      </figure>

      <h2 className="mt-8 block text-center text-3xl font-semibold tracking-tight text-mar-800 sm:text-3xl">
        Galería de fotos
      </h2>
      <div className="max-w-5xl w-full mx-auto">
        <Gallery />
      </div>
    </Section>
  );
}
