import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="bg-white max-w-7xl mx-auto ">
      <div className=" py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg md:grid md:max-w-none md:grid-cols-2 md:gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
              Ponte en contacto
            </h2>
            <div className="mt-3">
              <p className="text-lg text-gray-500"></p>
            </div>
            <div className="mt-9">
              <div className="flex">
                <div className="flex-shrink-0">
                  <PhoneIcon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>+598 099 835 474</p>
                </div>
              </div>
              <div className="flex mt-6">
                <div className="flex-shrink-0">
                  <MapPinIcon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>
                    Orinoco s/n y San Luis, Punta del Diablo, Rocha, Uruguay
                  </p>
                </div>
              </div>
              <div className="mt-6 flex">
                <div className="flex-shrink-0">
                  <EnvelopeIcon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>yaqupachauy@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
