"use client"
import { useStore } from '@/store/useStore.js';
import style from './gravityForm.module.scss';
import parse from 'html-react-parser';
export default function SingleField({fieldObject, register, errors}){
    var type = fieldObject.type;
    const {currentPageTitle} = useStore();
    var printInput = <input name={`input_${fieldObject.id}`} type={type} placeholder={fieldObject.placeholder} {...register(fieldObject.label, {required: fieldObject.isRequired})} />

    if(type === 'consent'){
        printInput = <label><input name={`input_${fieldObject.id}`} type={'checkbox'} placeholder={fieldObject.placeholder} {...register(fieldObject.label, {required: fieldObject.isRequired})} /><span>{fieldObject.checkboxLabel}</span></label>
    }

    if(type === 'select'){
        printInput = <select name={`input_${fieldObject.id}`} {...register(fieldObject.label, {required: fieldObject.isRequired})}>
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
        printInput = <textarea name={`input_${fieldObject.id}`} placeholder={fieldObject.placeholder} {...register(fieldObject.label, {required: fieldObject.isRequired})}></textarea>
    }

    if(type == 'html'){
        printInput = <div>{parse(fieldObject.content.replace('{embed_post:post_title}', currentPageTitle))}</div>
    }

    var styleObject = {
        gridColumn: `span ${fieldObject.layoutGridColumnSpan}`
    }

    return <div className={`${style.singleField} type-${type} ${fieldObject.labelPlacement}`} style={styleObject}>
        <div className={`${style.labelContainer}`}>{fieldObject.label}</div>
        <div className={`${style.inputContainer}`}>
            {printInput}
            {errors?.[fieldObject.label]?.type === "required" && <p>This field is required</p>}
        </div>
    </div>
}