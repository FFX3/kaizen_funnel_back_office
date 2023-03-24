import { useRouter } from "next/navigation"
import Editor from "../../../src/editor/Editor"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSideProps(context) {
    const { params } = context
    const uri = `${API_URL}/steps/${params.id}/grapesjs`

    const content = await fetch(uri)
        .then(response => response.json())
        .catch(err => console.error(err));  

    context.res.setHeader('Cache-Control', 'no-store')

    console.log(content)

    return {props: {
        content: content ?? null,
        step_id: params.id
    }}

}

export default function Page({ content, step_id }) {
    const saveProjectData = (grapesjsProjectData: string) => {
        console.log(grapesjsProjectData)
        const payload = JSON.stringify({
            grapesjs: JSON.stringify(grapesjsProjectData)
        })
        const options = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: payload
        };

        fetch(`${API_URL}/steps/${step_id}/content`, options)
    }

    return <Editor
        content={content}
        saveContent={saveProjectData}
    />
}
