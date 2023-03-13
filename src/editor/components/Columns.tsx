import type grapesjs from 'grapesjs';

export default (editor: grapesjs.Editor, config) => {
    editor.BlockManager.add('1-column-section-block', {
        label: '1 Column',
        content: `<div style="display:flex;">
                <div style="margin:15px;padding:15px"><div>cell 1</div></div>
            </div>`,
        category: 'Basic',
    })

    editor.BlockManager.add('2-column-section-block', {
        label: '2 Column',
        content: `<div style="display:flex;">
                <div style="margin:15px;padding:15px"><div>cell 1</div></div>
                <div style="margin:15px;padding:15px"><div>cell 2</div></div>
            </div>`,
        category: 'Basic',
    })

    editor.BlockManager.add('3-column-section-block', {
        label: '3 Column',
        content: `<div style="display: flex">
                <div style="margin:15px;padding:15px"><div>cell 1</div></div>
                <div style="margin:15px;padding:15px"><div>cell 2</div></div>
                <div style="margin:15px;padding:15px"><div>cell 3</div></div>
            </div>`,
        category: 'Basic',
    })
}