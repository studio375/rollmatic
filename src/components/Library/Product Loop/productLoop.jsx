"use client"
import CustomButton from "@/components/Library/Custom Button/customButton";
import { useState } from "react";
import ProductCard from "../Product Card/productCard";
import ProntaConsegnaCard from "../Product Card/prontaConsegnaCard";

export default function ProductLoop({catFilters, products, prontaConsegna = false}){
    const [activeCat, setActiveCat] = useState(null);
    return <>
        {
        (catFilters && catFilters.length > 0) && <section className="relative mt-5 big-boxed flex justify-center gap-2 big-boxed flex items-center w-full">
            <CustomButton onClick={() => {setActiveCat(null)}} className={`${!activeCat && 'active'} [&:not(.active)]:!text-[var(--color-foreground)] [&:not(.active)]:!border-[var(--color-foreground)]`} Tag={'div'}>Tutte</CustomButton>
            {
                catFilters.map(elem => {
                    return <CustomButton onClick={() => {setActiveCat(elem.id)}} className={`${activeCat == elem.id && 'active'} [&:not(.active)]:!text-[var(--color-foreground)] [&:not(.active)]:!border-[var(--color-foreground)]`} key={elem.id} Tag={'div'}>{elem.name}</CustomButton>
                })
            }
        </section>
        }
        <section className={`mt-10 flex flex-wrap items-start ${prontaConsegna?'px-13':'big-boxed'} gap-x-15 gap-y-8`}>
            {
                products.map(elem => {
                    if(activeCat && activeCat !== elem.category_info[0].term_id) return;
                    var prodObject = {
                        ID: elem.id,
                        thumbnail_data: elem.thumbnail_data,
                        cat: elem.category_info[0],
                        slug: elem.slug,
                        title: elem.title.rendered
                    };
                    var props = {
                        className:"!w-[calc((100%-300px)/3)]",
                        prodObject:prodObject
                    }
                    return (prontaConsegna)?<ProntaConsegnaCard {...props} key={elem.id} />:<ProductCard key={elem.id} {...props} />
                })
            }
        </section>
    </>
}