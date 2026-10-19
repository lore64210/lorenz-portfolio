import { redirect } from "next/navigation";

export default async function PreviewRedirect({ params }) {
    const { lang = "es" } = await params;
    redirect(`/${lang}`);
}
