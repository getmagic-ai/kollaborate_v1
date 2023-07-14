import BrandCard from "@/components/BrandCard";
import prismadb from "@/lib/prismadb";

export default async function Brands() {
  const brands = await prismadb.brand.findMany({
    include: {
      saved: true,
    },
  });

  return (
    <div>{brands && brands.map((brand) => <BrandCard brand={brand} />)}</div>
  );
}
