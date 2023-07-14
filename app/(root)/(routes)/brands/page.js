import prismadb from "@/lib/prismadb";

export default async function Brands() {
  const brands = await prismadb.brand.findMany();
  console.log(brands);
  return <div>{brands && brands.map((brand) => <p>{brand.name}</p>)}</div>;
}
