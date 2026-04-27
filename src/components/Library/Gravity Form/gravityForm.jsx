import { useForm } from 'react-hook-form';
import CustomButton from '../Custom Button/customButton';
import style from './gravityForm.module.scss';
import SingleField from './singleField';
export default function GravityForm({formObject, ...props}){
    const {register, handleSubmit, watch, formState: { errors }} = useForm();
    const onSubmit = (data) => console.log(data);
    var fields = formObject.fields;
    var printFields = fields.map(field => {
        return <SingleField key={field.id} fieldObject={field} register={register} errors={errors} />
    })
    return <div {...props} className={`${style.formWrapper} form-wrapper ${props.className || ''}`}>
        <form action="" method='post' onSubmit={handleSubmit(onSubmit)}>
            <div className={style.formFields}>
                {printFields}
            </div>
            <div className={style.formSubmit}>
                <CustomButton Tag='button'>{formObject.button.text}</CustomButton>
            </div>
        </form>
        
    </div>;
}