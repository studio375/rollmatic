import { Link } from "@/i18n/navigation";

export default function CustomButton({Tag=Link, children, ...props}){
    return <Tag {...props} className={`${props.className || ''} btn relative inline-flex border-[2px] border-[var(--color-primary)] rounded-[50px] px-[16px] uppercase cursor-pointer text-[var(--color-primary)] text-[20px]/[30px] bg-transparent [&.light]:border-[var(--background)] [&.light]:!text-[var(--background)] overflow-hidden [&:hover]:!text-[var(--background)] transition-all duration-300 [&:hover_*]:!text-[var(--background)] [&_*]:transition-all [&_*]:duration-300 z-1`} >
        <div className="absolute left-0 top-0 h-full w-0 bg-[var(--color-primary)] [.btn:hover_&]:w-full transition-all duration-300 -z-1"></div>
        {children}
    </Tag>
}