"use client"
import { useStore } from '@/store/useStore.js';
import style from './gravityForm.module.scss';
import parse from 'html-react-parser';
export default function SingleField({fieldObject, register, errors}){
    var type = fieldObject.type;
    const {currentPageTitle} = useStore();
    
    
    if(type !== 'consent')
        var printInput = <input  name={`input_${fieldObject.id}`} type={type} placeholder={fieldObject.placeholder} {...register(`input_${fieldObject.id}`, {required: fieldObject.isRequired})} />

    if(type === 'email'){
        var printInput = <input 
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
        var printInput = <label>
            <input type={'checkbox'} value="1" {...register(`input_${fieldObject.id}_1`, {required: fieldObject.isRequired})} /><span>{fieldObject.checkboxLabel}</span>
            <input type="hidden" value={fieldObject.checkboxLabel} {...register(`input_${fieldObject.id}_2`)} />
            <input type="hidden" value="1" {...register(`input_${fieldObject.id}_3`)} />
        </label>
    }

    if(type === 'select'){
        printInput = <select name={`input_${fieldObject.id}`} {...register(`input_${fieldObject.id}`, {required: fieldObject.isRequired})}>
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
        printInput = <textarea name={`input_${fieldObject.id}`} placeholder={fieldObject.placeholder} {...register(`input_${fieldObject.id}`, {required: fieldObject.isRequired})}></textarea>
    }

    if(type == 'html'){
        printInput = <div>{parse(fieldObject.content.replace('{embed_post:post_title}', currentPageTitle))}</div>
    }

    var styleObject = {
        gridColumn: `span ${fieldObject.layoutGridColumnSpan}`
    }


    var field_errors =(type !== 'consent')?errors?.[`input_${fieldObject.id}`]:errors?.[`input_${fieldObject.id}_1`];

    return <div className={`${style.singleField} type-${type} ${fieldObject.labelPlacement} ${field_errors && style.notValid}`} style={styleObject}>
        <div className={`${style.labelContainer}`}>{fieldObject.label}</div>
        <div className={`${style.inputContainer}`}>
            {printInput}
            {field_errors && <span className={`${style.errorLabel}`}>
                    {(field_errors.type==="required")?'Questo campo è obbligatorio':field_errors.message}
                </span>
            }
        </div>
    </div>
}