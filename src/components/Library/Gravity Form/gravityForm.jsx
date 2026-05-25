"use client"
import { useForm } from 'react-hook-form';
import CustomButton from '../Custom Button/customButton';
import SingleField from './singleField';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function GravityForm({formObject, ...props}){
    const router = useRouter();
    async function onSubmit(data){
        var _data = JSON.stringify(data).replace('true', '"1"');
        var submission = await fetch(`/api/form-submission?form_id=${1}&form_data=${_data}`);
        const response = await submission.json();
        if(response.data.is_valid){
            router.push('/grazie');
        }else{
            console.log(response)
        }
    }

    const {register, handleSubmit, watch, formState: { errors }} = useForm();
    const formRef = useRef(null);
    var fields = formObject.fields;
    var printFields = fields.map(field => {
        return <SingleField key={field.id} fieldObject={field} register={register} errors={errors} />
    })
    return <div {...props} className={`formWrapper form-wrapper relative w-full ${props.className || ''}`}>
        <form className='w-full flex flex-col items-start' ref={formRef} action="" method='post' noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className={`formFields grid items-start justify-start gap-[20px] grid-cols-[repeat(12,1fr)] w-full`}>
                {printFields}
            </div>
            <div className={`formSubmit mt-1`}>
                <CustomButton Tag='button'>{formObject.button.text}</CustomButton>
            </div>
        </form>
    </div>;
}