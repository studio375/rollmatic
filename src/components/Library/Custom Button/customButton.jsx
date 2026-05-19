import Link from "next/link";

export default function CustomButton({Tag=Link, children, ...props}){
    return <Tag {...props} className={`${props.className || ''} inline-flex border-[2px] border-[var(--color-primary)] rounded-[50px] px-[16px] uppercase cursor-pointer !text-[var(--color-primary)] text-[20px]/[30px] bg-transparent [&.light]:border-white [&.light]:!text-white`} >{children}</Tag>
}