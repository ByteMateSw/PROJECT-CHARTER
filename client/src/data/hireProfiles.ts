const genders: string[] = ["men", "women"];
const names: string[] = ["John", "Jane", "Bob", "Alice", "Charlie", "Emma"];
const professions: string[] = ["Plomero", "Programador", "Electricista"];
const locations: string[] = [
  "Chubut, Argentina",
  "Buenos Aires, Argentina",
  "Santa Fe, Argentina",
];
const serviceDescriptions: { [key: string]: string } = {
  Plomero:
    "Como plomero con años de experiencia, ofrezco servicios de alta calidad para todas sus necesidades de plomería. Desde reparaciones menores hasta instalaciones completas, estoy aquí para ayudarle.",
  Programador:
    "Como programador, ofrezco soluciones de software personalizadas para ayudar a su negocio a crecer. Ya sea que necesite una aplicación móvil, un sitio web o un sistema de backend, puedo proporcionar la solución que necesita.",
  Electricista:
    "Como electricista, ofrezco una amplia gama de servicios para mantener su hogar o negocio funcionando sin problemas. Desde la instalación de nuevos sistemas eléctricos hasta la reparación de problemas existentes, estoy aquí para ayudarle.",
};

interface Profile {
  id: number;
  imageProfile: string;
  name: string;
  professions: string[]; // Cambiado a un array de strings
  location: string;
  imageBackground: string;
  description: string;
  review: number;
}

export const profiles: Profile[] = Array(16)
  .fill(null)
  .map((_, index) => {
    const randomGender: string =
      genders[Math.floor(Math.random() * genders.length)];
    const randomNumber: number = Math.floor(Math.random() * 100);
    const randomName: string = names[Math.floor(Math.random() * names.length)];
    const randomProfessions: string[] = getRandomProfessions(professions); // Obtener empleos aleatorios
    const randomLocation: string =
      locations[Math.floor(Math.random() * locations.length)];
    const randomImage: string = `https://randomuser.me/api/portraits/${randomGender}/${randomNumber}.jpg`;

    function getRandomNumber1(): number {
      return Math.floor(Math.random() * (1200 - 1000 + 1)) + 1000;
    }

    function getRandomNumber2(): number {
      return Math.floor(Math.random() * (1200 - 1000 + 1)) + 1000;
    }

    const randomImageBackground: string = `https://random.imagecdn.app/${getRandomNumber1()}/${getRandomNumber2()}`;
    const randomScore: number = parseFloat((Math.random() * 4 + 1).toFixed(1));
    return {
      id: index + 1,
      imageProfile: randomImage,
      name: randomName,
      professions: randomProfessions,
      location: randomLocation,
      imageBackground: randomImageBackground,
      description: serviceDescriptions[randomProfessions[0]], // Usar la descripción del primer empleo
      review: randomScore,
    };
  });

function getRandomProfessions(professions: string[]): string[] {
  const numProfessions: number =
    Math.floor(Math.random() * professions.length) + 1; // Obtener un número aleatorio de empleos
  const randomProfessions: string[] = [];
  for (let i = 0; i < numProfessions; i++) {
    const randomProfession: string =
      professions[Math.floor(Math.random() * professions.length)];
    if (!randomProfessions.includes(randomProfession)) {
      randomProfessions.push(randomProfession);
    }
  }
  return randomProfessions;
}
