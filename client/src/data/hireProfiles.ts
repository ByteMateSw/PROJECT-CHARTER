const genders = ["men", "women"];
const names = ["John", "Jane", "Bob", "Alice", "Charlie", "Emma"];
const professions = ["Plomero", "Programador", "Electricista"];
const location = [
  "Chubut, Argentina",
  "Buenos Aires, Argentina",
  "Santa Fe, Argentina",
];
const serviceDescriptions: any = {
  Plomero:
    "Como plomero con años de experiencia, ofrezco servicios de alta calidad para todas sus necesidades de plomería. Desde reparaciones menores hasta instalaciones completas, estoy aquí para ayudarle.",
  Programador:
    "Como programador, ofrezco soluciones de software personalizadas para ayudar a su negocio a crecer. Ya sea que necesite una aplicación móvil, un sitio web o un sistema de backend, puedo proporcionar la solución que necesita.",
  Electricista:
    "Como electricista, ofrezco una amplia gama de servicios para mantener su hogar o negocio funcionando sin problemas. Desde la instalación de nuevos sistemas eléctricos hasta la reparación de problemas existentes, estoy aquí para ayudarle.",
};

export const profiles = Array(16)
  .fill(null)
  .map((_, index) => {
    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    const randomNumber = Math.floor(Math.random() * 100);
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomProfession =
      professions[Math.floor(Math.random() * professions.length)];
    const serviceDescription = serviceDescriptions[randomProfession];
    const randomLocation =
      location[Math.floor(Math.random() * location.length)];
    const randomImage = `https://randomuser.me/api/portraits/${randomGender}/${randomNumber}.jpg`;
    function getRandomNumber1() {
      return Math.floor(Math.random() * (1200 - 1000 + 1)) + 1000;
    }

    function getRandomNumber2() {
      return Math.floor(Math.random() * (1200 - 1000 + 1)) + 1000;
    }

    const randomImageBackground = `https://random.imagecdn.app/${getRandomNumber1()}/${getRandomNumber2()}`;
    return {
      id: index + 1,
      imageProfile: randomImage,
      name: randomName,
      profession: randomProfession,
      location: randomLocation,
      imageBackground: randomImageBackground,
      description: serviceDescription,
    };
  });
