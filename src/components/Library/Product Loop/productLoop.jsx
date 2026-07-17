"use client"
import CustomButton from "@/components/Library/Custom Button/customButton";
import { useState } from "react";
import ProductCard from "../Product Card/productCard";
import ProntaConsegnaCard from "../Product Card/prontaConsegnaCard";

export default function ProductLoop({catFilters, products, prontaConsegna = false}){
    const [activeCat, setActiveCat] = useState(null);
    var activeProducts = products;
    if(activeCat){
        activeProducts = activeProducts.filter(elem => {
            var active = false;
            elem?.category_info?.forEach(element => {
                if(element.term_id === activeCat)
                    active = true;
            });
            return active;
        });
    }
    if(activeProducts.length%3!==0){
        for (let index = 0; index < products.length%3; index++) {
            activeProducts.push(null);
        }
    }
    
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
        {
            (activeProducts && activeProducts.length) ? <section className={`mt-10 flex flex-wrap items-start gap-x-0 gap-y-2`}>
                {
                    activeProducts.map((elem, index) => {
                        if(elem == null) return (prontaConsegna)?<ProntaConsegnaCard prodObject={null} key={index} />:<ProductCard key={index} prodObject={null} />
                        //console.log(elem);
                        var prodObject = {
                            ID: elem.id,
                            thumbnail_data: elem.thumbnail_data,
                            cat: elem.category_info[1] ? elem.category_info[1] : elem.category_info[0],
                            slug: elem.slug,
                            title: elem.title.rendered
                        };
                        var props = {
                            //className:"!w-[calc((100%-300px)/3)]",
                            prodObject:prodObject
                        }
                        return (prontaConsegna)?<ProntaConsegnaCard {...props} key={elem.id} />:<ProductCard key={elem.id} {...props} />
                    })
                }
            </section> : <span></span>
        }
    </>
}