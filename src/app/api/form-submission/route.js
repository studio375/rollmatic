import { NextResponse } from "next/server";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const form_id = searchParams.get('form_id');
    const form_data = searchParams.get('form_data');
    try {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + btoa("studio375:" + process.env.APPLICATION_PASSWORD),
            },
            body: form_data
        };
        const res = await fetch(`${process.env.GRAVITY_ENDPOINT}/forms/${form_id}/submissions`, options);

        const response = await res.json();
        
        return NextResponse.json({
            data: response,
            message: "submission sent",
        });

    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}