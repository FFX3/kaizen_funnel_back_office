import type grapesjs from 'grapesjs';
import { BlockList } from 'net';

export default (editor: grapesjs.Editor, config) => {
    const content = `
        <div class="calendly-wrapper">
        <div class="calendly-inline-widget" data-url="https://calendly.com/justin_mcintyre/30min" style="min-width:320px;height:750px;"></div>
        <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>
        </div>
    `
    editor.BlockManager.add('Calendly-Form', {
        label: 'canlendly form',
        content,
        category: 'Basic',
    })

    editor.on('component:add', (component) => {
        if(component.attributes.type === 'calendly-form'){
            console.log('executing scripts')
            var script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
        }
    })

    editor.DomComponents.addType('calendly-form', {
        isComponent: (el) => {
            if(!el.classList) return false
            return el.classList.contains('calendly-wrapper')
        },

        model: {
            defaults: {
                tagName: 'Calendly',
                components: content,
            }
        },
    })
}