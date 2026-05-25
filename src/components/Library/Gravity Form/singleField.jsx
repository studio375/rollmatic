"use client"
import { useStore } from '@/store/useStore.js';
import parse from 'html-react-parser';
export default function SingleField({fieldObject, register, errors}){
    var type = fieldObject.type;
    const {currentPageTitle} = useStore();
    var commonClasses = 'w-full rounded-[50px] bg-[#7D5B5B1A] border-none pl-[15px] text-[var(--color-foreground)] font-aspekta text-[16px] font-light h-[40px]';
    var placeholderClasses = 'placeholder:text-[var(--color-foreground)] placeholder:font-[var(--font-aspekta)] placeholder:text-[16px] placeholder:font-light focus:placeholder:opacity-0';
    
    if(type !== 'consent')
        var printInput = <input className={`${commonClasses} ${placeholderClasses}`} name={`input_${fieldObject.id}`} type={type} placeholder={fieldObject.placeholder} {...register(`input_${fieldObject.id}`, {required: fieldObject.isRequired})} />

    if(type === 'email'){
        var printInput = <input 
                            className={`${commonClasses} ${placeholderClasses}`}
                            name={`input_${fieldObject.id}`} 
                            type={type} placeholder={fieldObject.placeholder} 
                            {...register(`input_${fieldObject.id}`, {
                                required: fieldObject.isRequired,
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "L'indirizzo email non è valido"
                                }
                            })} 
                        />

    }

    if(type === 'consent'){
        var printInput = <label className='w-auto inline-flex items-center justify-start gap-[8px]'>
            <input type={'checkbox'} value="1" {...register(`input_${fieldObject.id}_1`, {required: fieldObject.isRequired})} /><span className='text-[10px]/[15px]'>{fieldObject.checkboxLabel}</span>
            <input type="hidden" value={fieldObject.checkboxLabel} {...register(`input_${fieldObject.id}_2`)} />
            <input type="hidden" value="1" {...register(`input_${fieldObject.id}_3`)} />
        </label>
    }

    if(type === 'select'){
        printInput = <select className={`${commonClasses} ${placeholderClasses}`} name={`input_${fieldObject.id}`} {...register(`input_${fieldObject.id}`, {required: fieldObject.isRequired})}>
            {
                fieldObject.placeholder && <option value="" disabled selected>{fieldObject.placeholder}</option>
            }
            {
                fieldObject.choices.map(opt => {
                    return <option key={opt.value} value={opt.value} selected={opt.isSelected} >{opt.text}</option>
                })  
            }
        </select>
    }

    if(type === 'textarea'){
        printInput = <textarea className={`${commonClasses} ${placeholderClasses} !rounded-[10px] min-block-[80px] max-w-[100%] min-w-[100%]`} name={`input_${fieldObject.id}`} placeholder={fieldObject.placeholder} {...register(`input_${fieldObject.id}`, {required: fieldObject.isRequired})}></textarea>
    }

    if(type == 'html'){
        var value = parse(fieldObject.content.replace('{embed_post:post_title}', currentPageTitle?currentPageTitle:' - '));
        printInput = <div>{value}</div>
    }

    var styleObject = {
        gridColumn: `span ${fieldObject.layoutGridColumnSpan}`
    }


    var field_errors =(type !== 'consent')?errors?.[`input_${fieldObject.id}`]:errors?.[`input_${fieldObject.id}_1`];

    return <div className={`singleField type-${type} ${fieldObject.labelPlacement} ${field_errors && 'notValid'} flex flex-col items-start relative w-full col-span-[12] [&.type-consent]:mt-[-15px]`} style={styleObject}>
        <div className={`labelContainer`}>{fieldObject.label}</div>
        <div className={`inputContainer w-full relative`}>
            {printInput}
            {field_errors && <span className={`errorLabel`}>
                    {(field_errors.type==="required")?'Questo campo è obbligatorio':field_errors.message}
                </span>
            }
        </div>
    </div>
}