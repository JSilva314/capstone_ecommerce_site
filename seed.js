const prisma = require("./src/server/client");

async function main() {
  try {
    // Seed users
    const users = await prisma.users.createMany({
      data: [
        {
          username: "Emily Johnson",
          email: "emily@example.com",
          password: "securepass",
          address: "199 Locktight Court",
          Phone: "9041181788",
          paymentMethod: "Visa",
          Admin: false,
        },
        {
          username: "Harry Potter",
          email: "Harry@example.com",
          password: "platform9&3/4",
          address: "2939 Porsche Place",
          Phone: "2039822232",
          paymentMethod: "Mastercard",
          Admin: false,
        },
        {
          username: "Ron Swonson",
          email: "Ronald@example.com",
          password: "america&bacon",
          address: "5900 Camaro Circle",
          Phone: "9732099889",
          paymentMethod: "Visa",
          Admin: true,
        },
        // Add more user objects as needed
      ],
    });
    console.log("Users seeded successfully:", users);

    // Seed cars
    const cars = await prisma.cars.createMany({
      data: [
        {
          make: "Honda",
          model: "Accord",
          newUsed: true,
          color: "White",
          year: 2020,
          bodyType: "sedan",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F65e81151f52e248c552b-fe74cd567ea2f1228f846834bd67571e.ssl.cf1.rackcdn.com%2Fldm-images%2F2020-Honda-Accord-LX-Platinum-White-Color.jpeg&f=1&nofb=1&ipt=2a8ee10ecce9de163f55374eb1749ecc19b4fd7fee61142cea68502741456153&ipo=images",
          price: 27599,
          vin: "1HGCD5568TA081518",
        },
        {
          make: "Cadillac",
          model: "Escalade",
          newUsed: true,
          color: "Black",
          year: 2011,
          bodyType: "suv",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.hgmsites.net%2Fhug%2F2011-cadillac-escalade-esv-awd-4-door-base-angular-front-exterior-view_100325618_h.jpg&f=1&nofb=1&ipt=772cb8ad6ec46f75fd2245af50fb76771e4c0a332ebd2f6df6e40393e5d6651f&ipo=images",
          price: 19989,
          vin: "1GYS4EEJ3BR279996",
        },
        {
          make: "Buick",
          model: "Enclave",
          newUsed: false,
          color: "Tan",
          year: 2009,
          bodyType: "suv",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fworldautosales.com%2Fwp-content%2Fuploads%2F2019%2F02%2F2009-buick-enclave-cxl46-1199x674.jpg&f=1&nofb=1&ipt=397f144cf43efd0ebcee6b2add881cd05bd8d7a87bf3eab9d37635c1c54bac7b&ipo=images",
          price: 13479,
          vin: "5GAER23D99J166970",
        },
        // Add more car objects as needed
      ],
    });
    console.log("Cars seeded successfully:", cars);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
