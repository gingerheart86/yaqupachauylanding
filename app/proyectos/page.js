export default function Home() {
  return (
    <div className="relative   py-16 bg-white max-w-7xl mx-auto">
      <div className="relative px-4 sm:px-6 lg:px-8 ">
        <div className="  text-lg ">
          <h1>
            <span className="block text-center text-lg font-semibold text-cyan-600">
              Proyecto Toninas
            </span>
            <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Antecedentes
            </span>
          </h1>
          <p className="mt-8 text-base leading-8 text-gray-500">
            En el año 2002, con el Proyecto Toninas se inició el primer estudio
            sistemático de varios aspectos de la ecología y el comportamiento de
            las toninas en la zona costera de La Coronilla y Cabo Polonio, que
            actualmente integran el Sistema Nacional de Áreas Protegidas (SNAP).
            Entre 2002 y 2007, los estudios apuntaron a conocer la frecuencia
            con que se observaban las toninas en aquellas playas, describir su
            comportamiento y poner a prueba la técnica de foto-identificación
            para lograr identificar a los individuos mediante fotografías de las
            marcas naturales de larga duración presentes en la aleta dorsal
            (Würsig y Würsig 1977). En ese mismo período se comenzaron a
            realizar estudios sobre la estructura social de los grupos, es
            decir, cómo están integrados (individuos adultos, juveniles, crías)
            y cómo se asocian los individuos foto-identificados entre sí (si hay
            alguna preferencia entre individuos).
          </p>
          <p className="mt-8 text-base leading-8 text-gray-500">
            🐬💙🌊 En general, más de la mitad de los individuos de la población
            de toninas presentan marcas de larga duración en el borde posterior
            de su aleta dorsal. Estas marcas pueden ser muescas, cortes,
            depresiones o cambios de color que alteran el perfil de su aleta. De
            esta manera, las investigadoras pueden identificar a cada una de las
            toninas de manera individual. El origen de las marcas puede ser
            debido a la interacción entre ellas durante la socialización o
            reproducción. También pueden ser producidas por cortes de hélices de
            barcos o por enmalles con redes de pesca.
          </p>

          <p className="mt-8 text-base leading-8 text-gray-500">
            📸En Uruguay se han identificado más de 45 toninas a través de
            fotografías de las marcas naturales de la aleta dorsal (Laporta
            2009, Laporta et al. 2016, Menchaca et al. 2019). Cada tonina tiene
            un nombre, su número correspondiente y están ordenadas en un 📖
            catálogo de foto-identificación, que sirve para registrar las
            toninas que se observaran en nuestras aguas y como referencia para
            comparar con otras zonas. Las fotos de las aletas brindan
            información muy valiosa sobre la abundancia y movimientos de los
            individuos en la población, el tiempo que permanece cada individuo
            en un área determinada, las preferencias de asociación, los
            intervalos de nacimiento de las crías, entre otros datos.
          </p>
          <p className="mt-8 text-base leading-8 text-gray-500">
            A partir del 2017, el Proyecto Toninas comenzó a monitorear
            acústicamente a los grupos de toninas de Uruguay, con el objetivo de
            construir un catálogo de silbidos. En ese marco, se determinó que
            las toninas utilizan una diversidad de contornos, emitiendo
            mayoritariamente silbidos multiloop, constantes y ascendentes. El
            rango de frecuencia de emisión se ubicó entre 4 y 11 kHz, y la
            mayoría de los silbidos tuvo una frecuencia mínima entre 2,1 y 5,1
            kHz, una frecuencia máxima menor a 12 kHz, y una duración menor a
            600 ms (Menchaca 2018). Además, en un estudio comparativo de
            silbidos, en conjunto con colegas de Brasil, se determinó que las
            toninas del sur de Brasil y Uruguay emiten sonidos que son más
            similares entre sí que los que emiten las toninas que ocurren en Río
            de Janeiro, lo que podría explicarse por divergencia génetica o
            varianza ambiental (LIma et al. 2020).
          </p>
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
            <div className="prose">
              <blockquote>
                <p>Escucha un silbido</p>
              </blockquote>
              <audio controls className="my-4">
                <source src="silbido.mp3" type="audio/mp3" />
              </audio>
            </div>
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
          <div className="mx-auto w-full">
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
          <div className="prose prose-lg text-base prose-cyan mx-auto mt-6 text-gray-500"></div>
        </div>
      </div>
    </div>
  );
}
