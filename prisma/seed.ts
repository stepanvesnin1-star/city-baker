import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Хлеб", slug: "bread" },
  { name: "Слойка", slug: "pastry" },
  { name: "Десерты", slug: "desserts" },
  { name: "Кофе", slug: "coffee" },
  { name: "Сезон", slug: "season" },
];

const products = [
  {
    name: "Багет классический",
    slug: "baguette",
    category: "Хлеб",
    description: "Хрустящая корка, мягкий мякиш.",
    price: 140,
  },
  {
    name: "Круассан с маслом",
    slug: "croissant",
    category: "Слойка",
    description: "Воздушная слойка на сливочном масле.",
    price: 220,
  },
  {
    name: "Капучино",
    slug: "coffee",
    category: "Кофе",
    description: "Эспрессо и молочная пена.",
    price: 220,
  },
  {
    name: "Маффин шоколадный",
    slug: "muffin",
    category: "Десерты",
    description: "Десерт с шоколадной крошкой.",
    price: 160,
  },
  {
    name: "Ржаной хлеб",
    slug: "rye",
    category: "Хлеб",
    description: "Хлеб на закваске.",
    price: 320,
  },
  {
    name: "Тарт лимонный",
    slug: "tart",
    category: "Десерты",
    description: "Лимонный крем и песочная основа.",
    price: 280,
  },
  {
    name: "Синнабон",
    slug: "cinnamon",
    category: "Слойка",
    description: "Булочка с корицей и нежной глазурью.",
    price: 240,
  },
  {
    name: "Слойка с ягодами",
    slug: "berry",
    category: "Сезон",
    description: "Слоёное тесто с ягодной начинкой.",
    price: 260,
  },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        slug: category.slug,
      },
      update: {
        name: category.name,
      },
      create: category,
    });
  }

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        slug: product.slug,
      },
      update: {
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
      },
      create: {
        name: product.name,
        slug: product.slug,
        category: product.category,
        description: product.description,
        price: product.price,
        image: null,
      },
    });
  }

  console.log("Seed completed");
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });