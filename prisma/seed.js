const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const brands = [
  {
    name: "Amazon",
    description:
      "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.",
  },
  {
    name: "AirBnB",
    description:
      "Airbnb, Inc. is an American San Francisco-based company operating an online marketplace for short-term homestays and experiences. ",
  },
  {
    name: "Zalando",
    description:
      "Zalando SE is a publicly traded German online retailer of shoes, fashion and beauty active across Europe.",
  },
];

const load = async () => {
  try {
    // await prisma.brand.deleteMany();
    // console.log("Deleted records in brand table");

    await prisma.brand.createMany({
      data: brands,
    });
    console.log("Added brand data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
