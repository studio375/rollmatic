import { gsap, SplitText } from "@/lib/gsap";

export function paragraphAnimation(target = '.par-animation'){
    if(!target) return;
    if(typeof target == "string")
        target = document.querySelectorAll(target);
    const split = SplitText.create(target, {
        type: "lines", 
        linesClass: "single-line",
        reduceWhiteSpace: false,
        tag: 'span',
    });
    var tml = gsap.timeline({
        scrollTrigger: {
            trigger: target,
            start: 'top 70%',
            end: `+=${target.offsetHeight}px`,
            scrub:true,
        }
    });
    tml.to(split.lines, {opacity: 1, duration: 0.3, stagger: 0.2, ease: 'none'});
    return tml;
}

export function titleAnimation(target = '.title-animation'){
    if(!target) return;
    if(typeof target == "string")
        target = document.querySelectorAll(target);
    const split = SplitText.create(target, {
        type: "chars, words", 
        charsClass: "single-char",
    });
    var tml = gsap.timeline({
        scrollTrigger: {
            trigger: target,
            start: 'top 85%',
            end: `+=200px`,
            scrub:true,
        }
    });
    tml.to(split.chars, {opacity: 1, y:0, duration: 1, stagger: 0.2, ease: 'none'});
    return tml; 
}

export function fadeAnimation(target = '.fade-animation'){
    var tml = null;
    if(typeof target == "string"){
        gsap.utils.toArray(target).forEach(elem => {
            var tml = gsap.timeline({
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 70%',
                    end: `+=200px`,
                    scrub:true,
                }
            });
            tml.to(elem, {opacity: 1, duration: 1, ease: 'none'});
        })
    }else{
        var tml = gsap.timeline({
            scrollTrigger: {
                trigger: target,
                start: 'top 70%',
                end: `+=200px`,
                scrub:true,
            }
        });
        tml.to(target, {opacity: 1, duration: 1, ease: 'none'});
    }
    return tml; 
}

// export function titleAnimation(target=null){
//     if(target){
//         const split = SplitText.create(target, {
//             type: "chars, words", 
//             charsClass: "single-char",
//         });
//         var tml = gsap.timeline({
//             scrollTrigger: {
//                 trigger: target,
//                 start: 'top 70%',
//                 end: `+=200px`,
//                 scrub:true,
//             }
//         });
//         tml.to(split.chars, {opacity: 1, x:0, y:0, z:0, rotateX: 0, rotateY:0, duration: 1, stagger: 0.2});
//         return tml;
//     }else{
//         gsap.utils.toArray('.title-animation:not()')
//     }
    
// }