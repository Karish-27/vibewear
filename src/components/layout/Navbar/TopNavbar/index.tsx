"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { useState } from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import { useAppDispatch } from "@/lib/hooks/redux";
import { setSearchQuery } from "@/lib/features/products/productsSlice";
import { useRouter } from "next/navigation";

const data: NavMenu = [
  {
    id: 1,
    label: "Shop",
    type: "MenuList",
    children: [
      {
        id: 11,
        label: "Men's clothes",
        url: "/shop#men-clothes",
        description: "In attractive and spectacular colors and designs",
      },
      {
        id: 12,
        label: "Women's clothes",
        url: "/shop#women-clothes",
        description: "Ladies, your style and tastes are important to us",
      },
      {
        id: 13,
        label: "Kids clothes",
        url: "/shop#kids-clothes",
        description: "For all ages, with happy and beautiful colors",
      },
      {
        id: 14,
        label: "Bags and Shoes",
        url: "/shop#bag-shoes",
        description: "Suitable for men, women and all tastes and styles",
      },
    ],
  },
  {
    id: 2,
    type: "MenuItem",
    label: "On Sale",
    url: "/shop#on-sale",
    children: [],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "New Arrivals",
    url: "/shop#new-arrivals",
    children: [],
  },
  {
    id: 4,
    type: "MenuItem",
    label: "Brands",
    url: "/shop#brands",
    children: [],
  },
];

const TopNavbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchInput));
    setShowMobileSearch(false);
    router.push("/search");
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    dispatch(setSearchQuery(value));
    router.push("/search");
  };

  const handleMobileSearchClick = () => {
    if (searchInput.trim()) {
      dispatch(setSearchQuery(searchInput));
      router.push("/search");
    } else {
      setShowMobileSearch(true);
    }
  };

  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10",
            ])}
          >
            VibeWear
          </Link>
        </div>
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10">
          <InputGroup.Text>
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
              className="min-w-5 min-h-5"
            />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e);
              }
            }}
            placeholder="Search for products..."
            className="bg-transparent placeholder:text-black/40"
          />
        </InputGroup>
        <div className="flex items-center">
          <button
            onClick={handleMobileSearchClick}
            className="block md:hidden mr-[14px] p-1"
          >
            <Image
              priority
              src="/icons/search-black.svg"
              height={100}
              width={100}
              alt="search"
              className="max-w-[22px] max-h-[22px]"
            />
          </button>
          <CartBtn />
          <Link href="/#signin" className="p-1">
            <Image
              priority
              src="/icons/user.svg"
              height={100}
              width={100}
              alt="user"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
        </div>
      </div>
      
      {/* Mobile Search Dialog */}
      {showMobileSearch && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-black/10 p-4 shadow-lg z-30">
          <form onSubmit={handleSearch} className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-3">
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
              className="min-w-5 min-h-5 mr-3"
            />
            <input
              type="search"
              name="search"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search for products..."
              className="flex-1 bg-transparent outline-none placeholder:text-black/40"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowMobileSearch(false)}
              className="ml-2 text-black/60"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default TopNavbar;
