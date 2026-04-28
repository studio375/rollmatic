import { useForm } from 'react-hook-form';
import CustomButton from '../Custom Button/customButton';
import style from './gravityForm.module.scss';
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
    return <div {...props} className={`${style.formWrapper} form-wrapper ${props.className || ''}`}>
        <form ref={formRef} action="" method='post' noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className={style.formFields}>
                {printFields}
            </div>
            <div className={style.formSubmit}>
                <CustomButton Tag='button'>{formObject.button.text}</CustomButton>
            </div>
        </form>
    </div>;
}