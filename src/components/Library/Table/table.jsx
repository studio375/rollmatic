"use client"
import { useTranslations } from "next-intl";

export default function Table({repeater, ...props}){
    var t = useTranslations('strings');
    return <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body border-b rounded-base border-default">
            <tr>
                {
                    Object.keys(repeater[0]).map((key, index) => <th scope="col" className="px-3 py-2 font-medium max-s:min-w-18" key={index}>{t(key)}</th>)
                }
            </tr>
        </thead>
        <tbody>
            {
                repeater.map((elem, index) => {
                    return <tr key={index} className="border-b border-default">
                        {Object.values(elem).map((e, i) => <td key={i} className="px-3 py-1">{e}</td>)}
                    </tr>
                })
            }
        </tbody>
    </table>;
}