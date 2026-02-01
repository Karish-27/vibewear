"use client";

import { useAppSelector } from "@/lib/hooks/redux";
import { allProductsData } from "../page";
import ProductCard from "@/components/common/ProductCard";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function SearchPage() {
  const searchQuery = useAppSelector((state) => state.products.searchQuery);

  const filteredProducts = searchQuery.trim()
    ? allProductsData.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allProductsData;

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        
        <div className="flex items-center mb-6">
          <Link
            href="/"
            className="flex items-center text-black/60 hover:text-black transition-colors mr-4"
          >
            <AiOutlineArrowLeft className="mr-2" />
            Back
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="font-bold text-2xl md:text-[32px] mb-2">
            {searchQuery.trim() ? "Search Results" : "All Products"}
          </h1>
          {searchQuery.trim() && (
            <p className="text-black/60">
              {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-black/60">
              No products found matching "{searchQuery}"
            </p>
            <p className="text-black/40 mt-2">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
