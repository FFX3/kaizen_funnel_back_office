"use client"

import 'grapesjs-preset-webpage';
import { GrapesjsReact } from 'grapesjs-react';
import webpageDefaultPlugin from 'grapesjs-preset-webpage';
import exportToStorage from './plugins/export-to-storage'
import InnerHtml from 'dangerously-set-html-content'
import { useEffect, useState } from 'react';
import CalendlyFormPlugin from './components/CalendlyForm';
import List from './components/List';
import Column1 from './components/Columns';
import Forms from './components/Forms';
import EditableCode from './components/EditableCode';

export default function Editor({ content, saveContent }) {

    const [editor, setEditor] = useState(null)

    const css = `<link href="https://unpkg.com/grapesjs@0.20.3/dist/css/grapes.min.css" rel="stylesheet"/>`

    const uri = '/api/save-content'

    const pushContent = async (editor) => {
        const payload = JSON.stringify({
            id: contentId,
            grapesjsContent: await editor.getProjectData(),
            content: {
                html: editor.getHtml(),
                css: editor.getCss()
            },
        })
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: payload
        };

        fetch(uri, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));  
    }

    useEffect(()=>{
        if(content && editor){
            editor.loadProjectData(content)
        } else {

        }
    },[editor, content])

    const handleSaveButtonClick = async () => {
        saveContent(await editor.getProjectData())
    }
    

    return <div>
    <InnerHtml html={css} />
    <button onClick={handleSaveButtonClick}>save</button>
    <GrapesjsReact
        id='grapesjs-react'
        plugins={[
            editor => webpageDefaultPlugin(editor, {
                blocks: ['link-block', 'quote', 'text-basic'],
                block: (blockId) => {
                    return {
                        label: 'Heading 1',
                        content: '<h1>Heading 1</h1>',
                        category: 'Basic',
                        attributes: {
                            title: 'Insert h1 block'
                        }
                    }
                }
            }),
            editor => exportToStorage(editor, {
                pushContent
            }),
            // editor => grapesjsTailwind(editor, {}),
            editor => CalendlyFormPlugin(editor, {}),
            editor => List(editor, {}),
            editor => Column1(editor, {}),
            editor => Forms(editor, {}),
            editor => EditableCode(editor, {})
        ]}
        canvas = {{
            styles: ['https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap']
        }}
        allowScripts={true}
        onInit={async(editor)=>{
            setEditor(editor)
            editor.on('load', ()=>{
                let styleManager = editor.StyleManager;
                console.log(styleManager)
                let typographySector = styleManager.getSector('typography');
                let fontProperty = styleManager.getProperty('typography', 'font-family');
                let list = fontProperty.attributes.options;
                list.push(
                    { value: 'Barlow Semi Condensed', name: 'Barlow Semi Condensed' },
                );
                styleManager.render();

                
                editor.BlockManager.add('h1', {
                    label: 'Heading 1',
                    content: '<h1>Heading 1</h1>',
                    category: 'Basic',
                    attributes: {
                        title: 'Insert h1 block'
                    }
                })

                editor.BlockManager.add('h2', {
                    label: 'Heading 2',
                    content: '<h2>Heading 2</h2>',
                    category: 'Basic',
                    attributes: {
                        title: 'Insert h2 block'
                    }
                })
            })
        }}
        domComponents={{
            processor: (obj) => {
                if (obj.$$typeof) {
                    console.log(obj)
                    const compDef = {
                        type: 'default',
                        components: obj.props.children,
                        reactProps: obj.props
                    }
                    return compDef
                }
            }
        }}
    />
    </div>
};
