export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white py-16">
      <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full">
        <div
          className="relative mx-auto h-full max-w-prose text-lg"
          aria-hidden="true"
        >
          <svg
            className="absolute top-12 left-full translate-x-32 transform"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
            />
          </svg>
          <svg
            className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute bottom-12 left-full translate-x-32 transform"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
            />
          </svg>
        </div>
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-lg">
          <h1>
            <span className="block text-center text-lg font-semibold text-cyan-600">
              Especies
            </span>
            <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Tonina, Tursiops truncatus gephyreus
            </span>
          </h1>
          <p className="mt-8 text-base leading-8 text-gray-500">
            La tonina Tursiops truncatus gephyreus ocurre únicamente en la costa
            del sur de Brasil, Uruguay y Argentina. Este animal habita
            principalmente en zonas localizadas y restringidas de la zona
            costera, lo que lo hace muy vulnerable a las crecientes presiones de
            las actividades humanas, como la captura incidental en las
            pesquerías, la contaminación, la disminución de presas por
            sobrepesca y otros factores conocidos. La variabilidad genética de
            la subespecie es baja tanto en los marcadores nucleares como en los
            de ADNmt, y la suma de las estimaciones de abundancia disponibles
            sugiere un tamaño máximo total de la población de 600 individuos
            (Vermeulen et al. 2019).
          </p>
          <p className="mt-8 text-base leading-8 text-gray-500">
            En Uruguay, los estudios sistemáticos de la ecología y el
            comportamiento de la tonina comenzaron en 2002 en La Coronilla-Cerro
            Verde y Cabo Polonio, áreas que integran el Sistema Nacional de
            Áreas Protegidas (SNAP), a través del Proyecto Toninas. Desde
            entonces, se vienen realizando estudios de abundancia, uso de
            hábitat, patrones de residencia, estructura genética poblacional,
            ecología trófica, estructura social y comunicación acústica. La
            información generada ha sido un aporte para la creación de áreas
            protegidas, la incorporación de la tonina a la lista de especies
            prioritarias para la conservación del SNAP, su valoración como
            objeto focal de conservación en el área protegida Cerro Verde e
            Islas de La Coronilla, como línea de base para la evaluación de
            impactos ambientales y la conservación del ambiente costero. En
            particular, los resultados de las investigaciones contribuyeron al
            reconocimiento de la tonina como subespecie y para su evaluación por
            la UICN en la categoría Vulnerable (Vermeulen et al. 2019).
          </p>

          <h2 className="mt-8">
            Qué sabemos de la ecología y el comportamiento de las toninas en
            Uruguay?
          </h2>
          <p className="mt-8 text-base leading-8 text-gray-500">
            La última estimación de abundancia de toninas es de apenas 70
            individuos, lo que indica que se trata de una población muy reducida
            (Laporta et al. 2016) y cuya distribución ocurre fundamentalmente
            dentro de los 500m de la costa, con mayor frecuencia de ocurrencia
            entre La Paloma y La Coronilla-Cerro Verde ( Depto. de Rocha). Por
            otro lado, tienen un sistema social con dinámica de fisión-fusión,
            compuesto por compañeros casuales y compañeros estables, donde la
            mayoría de las asociaciones son débiles y no aleatorias (Menchaca et
            al. 2019), aunque algunos animales mantienen vínculos más estables,
            asociándose para realizar determinados comportamientos (Menchaca
            2018). Para mantener estos vínculos las toninas utilizan una
            diversidad de contornos, emitiendo mayoritariamente silbidos
            multiloop, constantes y ascendentes. El rango de frecuencia de
            emisión se ubicó entre 4 y 11 kHz, y la mayoría de los silbidos tuvo
            una frecuencia mínima entre 2,1 y 5,1 kHz, una frecuencia máxima
            menor a 12 kHz, y una duración menor a 600 ms (Menchaca 2018).
          </p>
        </div>
      </div>
    </div>
  );
}
