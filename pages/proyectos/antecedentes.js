export default function Home() {
  return (
    <div className="relative   py-16 bg-white max-w-7xl mx-auto">
      <div className="relative px-4 sm:px-6 lg:px-8 ">
        <div className="  text-lg ">
          <h1>
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
          <h2 className="text-gray-700 font-semibold prose mt-4">
            Ejemplo de fotos del catálogo
          </h2>
          <div className="flex md:flex-row  space-x-0 md:space-x-5 my-4 flex-col">
            <img src="/toninas/1.jpg" className="w-52 h-52  mt-2 " />
            <img src="/toninas/2.jpg" className="w-52 h-52 mt-2" />
            <img src="/toninas/3.jpg" className="w-52 h-52 mt-2" />
          </div>
          <p className="mt-8 text-base leading-8 text-gray-500">
            A partir del 2017, el Proyecto Toninas comenzó a monitorear
            acústicamente a los grupos de toninas de Uruguay, con el objetivo de
            construir un catálogo de silbidos. En ese marco, se determinó que
            las toninas utilizan una diversidad de contornos, emitiendo
            mayoritariamente silbidos multiloop, constantes y ascendentes. El
            rango de frecuencia de emisión se ubicó entre 4 y 11 kHz, y la
            mayoría de los silbidos tuvo una frecuencia mínima entre 2,1 y 5,1
            kHz, una frecuencia máxima menor a 12 kHz, y una duración menor a
            600 ms (Menchaca 2018).
            <div className="prose my-4">
              <h3>🎧 Escucha un silbido</h3>
              <audio controls className="my-4">
                <source src="/silbido.mp3" type="audio/mp3" />
              </audio>
            </div>
            Además, en un estudio comparativo de silbidos, en conjunto con
            colegas de Brasil, se determinó que las toninas del sur de Brasil y
            Uruguay emiten sonidos que son más similares entre sí que los que
            emiten las toninas que ocurren en Río de Janeiro, lo que podría
            explicarse por divergencia génetica o varianza ambiental (LIma et
            al. 2020).
          </p>
        </div>
      </div>
    </div>
  );
}
