import { fetchAPI } from "@/helpers/api/fetch-api";

export default async function GravityForm({form_id = 1}){
    var form = await fetchAPI('gf/v2/forms/1');
    console.log(form);
    return <div></div>;
}