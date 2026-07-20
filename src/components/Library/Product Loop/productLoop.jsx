"use client"
import CustomButton from "@/components/Library/Custom Button/customButton";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../Product Card/productCard";
import ProntaConsegnaCard from "../Product Card/prontaConsegnaCard";
import BigText from "../Big Text/bigText";
import Image from "next/image";

export default function ProductLoop({catFilters, products, prontaConsegna = false}){
    const [activeCat, setActiveCat] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false);
    var activeProducts = products;
    if(activeCat){
        activeProducts = activeProducts.filter(elem => {
            var active = false;
            elem?.category_info?.forEach(element => {
                if(element.term_id === activeCat.id)
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
    const filterCommonClass = `py-1 px-2 [&_span]:text-[var(--color-primary)] cursor-pointer [&:not(:last-child)]:border-b-[1px] [&:not(:last-child)]:border-b-[var(--color-primary)] [&:hover,&.current]:bg-[var(--color-primary)] [&:hover_span,&.current_span]:text-white [&,&_span]:transition-all [&,&_span]:duration-500 [&,&_span]:ease`;
    
    useEffect(() => {
        document.querySelector('body').addEventListener('click', function(e){
            var target = e.target;
            if(!target.classList.contains('filters-handle') && !target.closest('.filters-handle')){
                setFilterOpen(false);
            }
        })
    }, []);
    
    const handleClickFilterOption = (val)=>{
        setActiveCat(val);
        setFilterOpen(false);
    }


    return <>
        <section className="relative mt-5 boxed flex items-center gap-2 z-10">
            <BigText Tag="span" className="font-semibold text-[var(--color-primary)] h3">Categorie macchinari</BigText>
            <div className="relative inline-flex min-w-40">
                <div className="py-1 px-2 bg-[var(--color-primary)] min-w-full [&_span]:text-white cursor-pointer filters-handle flex items-center justify-between gap-2 rounded-[5px]" onClick={() => setFilterOpen(!filterOpen)}><span>{activeCat?activeCat.name:'Tutte'}</span><Image className={`ml-auto transition-all duration-300 ease ${filterOpen && 'rotate-[-180deg]'}`} src={'/expand-more.svg'} width={25} height={25} alt="expand more" /></div>
                
                {
                    (catFilters && catFilters.length > 0) && <div className={`filters-handle ${filterOpen? 'inline-flex' : 'hidden'} flex-col items-left bg-white border-[var(--color-primary)] border-[1px] absolute top-[calc(100%-2px)] rounded-b-[5px] right-0 w-full`}>
                        {
                            activeCat && <div onClick={() => {handleClickFilterOption(null)}} className={`${!activeCat && 'current'} ${filterCommonClass}`}><span>Tutte</span></div>
                        }
                        {
                            catFilters.map(elem => {
                                return <div key={elem.id} onClick={() => {handleClickFilterOption({name: elem.name, id: elem.id})}} className={`${(activeCat && activeCat.id == elem.id) && 'current'} ${filterCommonClass}`}><span>{elem.name}</span></div>
                            })
                        }
                    </div>
                }
            </div>
        </section>
        {
            (activeProducts && activeProducts.length) ? <section className={`mt-10 flex flex-wrap items-start gap-x-0 gap-y-2`}>
                {
                    activeProducts.map((elem, index) => {
                        if(elem == null) return (prontaConsegna)?<ProntaConsegnaCard prodObject={null} key={index} />:<ProductCard key={index} prodObject={null} />
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