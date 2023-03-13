import type grapesjs from 'grapesjs';

type Editor = grapesjs.Editor;

export type PluginOptions = {
   pushContent?: Function
};

const plugin: grapesjs.Plugin<PluginOptions> = (editor: Editor, opts = {}) => {
  const pfx = editor.getConfig('stylePrefix');

  const config: PluginOptions = {
    ...opts,
  };
  // Add command

  editor.onReady(() => {
      // @ts-ignore
      let buttonOptions: grapesjs.ButtonOptions = {
        id: 'save-online',
        className: `${pfx}btn-prim`,
        command: (editor)=>{
          console.log('in command')
          config.pushContent(editor)
        },
        attributes: { title: 'Save'},
        active: true,
        label: 'save',
      }

      // let button = editor.Panels.addButton('options', buttonOptions)
  })
};

export default plugin;
