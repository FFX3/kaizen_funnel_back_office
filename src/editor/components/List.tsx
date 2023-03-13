import type grapesjs from 'grapesjs';
import { BlockList } from 'net';
import { initScriptLoader } from 'next/script';
import { text } from 'node:stream/consumers';

export default (editor: grapesjs.Editor, config) => {
    editor.BlockManager.add('list', {
        label: 'list',
        content: {
            tagName: 'ul',
            components: [{
                    tagName: 'li',
                    type: 'text',
                    components: 'list item'
            }]
        },
        category: 'Basic',
    })

    editor.DomComponents.addType('unordered-list', {
        isComponent: (el) => el.tagName === 'ul',

        model: {
            defaults: {
                tagName: 'ul',
                components: {
                    tagName: 'ul',
                    components: [{
                        tagName: 'li',
                        components: 'list item'
                    }],
                }
            }
        },
    })
}