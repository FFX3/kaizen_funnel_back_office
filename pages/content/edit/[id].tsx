import { useRouter } from "next/navigation"
import Editor from "../../../src/editor/Editor"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSideProps(context) {
    const { params } = context
    const uri = `${API_URL}/steps/${params.id}/grapesjs`

    const content = await fetch(uri)
        .then(response => response.json())
        .catch(err => console.error(err));  


    return {props: {
        content: content ?? null
    }}
}

export default function Page({ content }) {
    return <Editor
        content={content}
    />
}
