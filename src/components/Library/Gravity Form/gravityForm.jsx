"use client"
import { useForm } from 'react-hook-form';
import CustomButton from '../Custom Button/customButton';
import SingleField from './singleField';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendGTMEvent } from '@next/third-parties/google';
import Script from 'next/script';
import { useLocale } from 'next-intl';
import { getTracking } from '@/helpers/tracking/tracking';
import { fadeAnimation } from '@/helpers/animations';

export default function GravityForm({formObject, ...props}){
    const router = useRouter();
    const {register, handleSubmit, watch, formState: { errors }} = useForm();
    const formRef = useRef(null);
    const [disableButton, setDisableButton] = useState(false);
    const submitRef = useRef(null);
    const [turnstileToken, setTurnstileToken] = useState("");
    const turnstileRef = useRef(null);
    const widgetIdRef = useRef(null);
    const locale = useLocale();

    useEffect(() => {
        var tml = fadeAnimation(submitRef.current, true);
        return () => {
            if(tml)
                tml.scrollTrigger?.kill();
                tml.kill();
        }
    }, []);

    var fields = formObject.fields;
    var printFields = fields.map(field => {
        return <SingleField key={field.id} fieldObject={field} register={register} errors={errors} />
    })

    async function onSubmit(data){
        setDisableButton(true);
        data = {
          ...data, 
          ...getTracking(),
          "cf-turnstile-response": turnstileToken
        };
        console.log(data);
        var _data = JSON.stringify(data).replace('true', '"1"');
        var submission = await fetch(`/api/form-submission?form_id=${formObject.id}&form_data=${_data}&lang=${locale}`);
        const response = await submission.json();
        if(response.data.is_valid){
          sendGTMEvent({ event: 'form_submit_success', form_name: 'contatti' })
          router.push(`${locale!=='it'?`/${locale}`:''}/grazie`);
        }else{
            window.turnstile?.reset(widgetIdRef.current);
            setTurnstileToken("");
            setDisableButton(false);
            console.log(response)
        }
    }

    useEffect(() => {
        let cancelled = false;
    
        const renderWidget = () => {
          if (cancelled || !turnstileRef.current || !window.turnstile) return;
          widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
            callback: (token) => setTurnstileToken(token),
          });
        };
    
        if (window.turnstile) {
          renderWidget();
        } else {
          window.addEventListener("turnstile-loaded", renderWidget);
        }
    
        return () => {
          cancelled = true;
          window.removeEventListener("turnstile-loaded", renderWidget);
          if (widgetIdRef.current && window.turnstile) {
            window.turnstile.remove(widgetIdRef.current);
            widgetIdRef.current = null;
          }
        };
    }, []);
    return <div {...props} className={`formWrapper form-wrapper relative w-full ${props.className || ''}`}>
        <form className='w-full flex flex-col items-start' ref={formRef} action="" method='post' noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className={`formFields grid items-start justify-start gap-[20px] grid-cols-[repeat(12,1fr)] w-full`}>
                {printFields}
            </div>
            <div ref={turnstileRef} />
            <div ref={submitRef} className={`formSubmit mt-1 relative rounded-[50px] overflow-hidden flex items-center justify-start gap-2 fade-effect`}>
                {disableButton && <div className='absolute left-0 top-0 w-full h-full bg-[#ecbcbcc4] z-10 flex justify-center items-center'>
                  <div className='loader'></div>
                </div>}
                <CustomButton Tag='button' className={`no-animation ${disableButton && 'pointer-events-none'}`}>{formObject.button.text}</CustomButton>
            </div>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                strategy="lazyOnload"
                onLoad={() => window.dispatchEvent(new Event("turnstile-loaded"))}
            />
        </form>
    </div>;
}