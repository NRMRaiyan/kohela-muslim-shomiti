"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Divide } from "lucide-react";
import NewsCard, { NewsCardData } from "./NewsCard";
import { ne } from "drizzle-orm";

const AUTO_SCROLL_MS = 4000;

export default function NewsCarousel({ items }: { items: NewsCardData[]}){
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    //const cardsPerView = 1;
    //const pageCount = items.length;

    const scrollToIndex = useCallback((index: number) => {
        const track = trackRef.current;
        if(!track) return;

        const card = track.children[index] as HTMLElement | undefined;
        if(!card) return;
        track.scrollTo({ left: card.offsetLeft, behavior: "smooth"});
    }, []);

    //Auto-advance
    useEffect(() => {
        if(paused || items.length <= 1) return;
        const id = setInterval(() => {
            setActiveIndex((prev) => {
                const next = (prev + 1) % items.length;
                scrollToIndex(next);
                return next;
            });
        }, AUTO_SCROLL_MS);
        return () => clearInterval(id);
    }, [paused, items.length, scrollToIndex]);

    //Keep activation in sync if the user scroll/swips manually
    useEffect(() => {
        const track = trackRef.current;
        if(!track) return;
        let ticking = false;
        const onScroll = () => {
            if(ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const cards = Array.from(track.children) as HTMLElement[];
                const trackCenter = track.scrollLeft + track.clientWidth / 2;
                let closset = 0;
                let clossetDist = Infinity;
                cards.forEach((card, i) => {
                    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                    const dist = Math.abs(cardCenter - trackCenter);
                    if(dist < clossetDist){
                        clossetDist = dist;
                        closset = i;
                    }
                }),
                setActiveIndex(closset);
                ticking = false;
            });
        };
        track.addEventListener("scroll", onScroll, { passive: true});
        return () => track.removeEventListener("scroll", onScroll);
    }, []);

    function goTo(index: number){
        const clamped = (index + items.length) % items.length;
        setActiveIndex(clamped);
        scrollToIndex(clamped);
    }

    if(items.length === 0) return null;

    return(
        <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
        >

            <div
                ref = {trackRef}
                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none]
                [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >

                {items.map((n) => (
                    <div
                        key={n.slug}
                        className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] 1g:w- [calc(33.33%-16px)]"
                    >
                        <NewsCard item={n} />
                    </div>
                ))}
            </div>

            {items.length > 1 && (
                <>
                <button
                    onClick={() => goTo(activeIndex - 1)}
                    aria-label = "Previous"
                    className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-[var(--color-sage-line)]
                    items-center justify-center text-[var(--color-forest)] hover:bg-[var(--color-paper-warm)] z-10"
                >
            )}
    )
}