import type grapesjs from 'grapesjs';
import { Component } from 'react';

export default (editor: grapesjs.Editor, config) => {
    var pfx = editor.getConfig().stylePrefix;
    var modal = editor.Modal;
    var cmdm = editor.Commands;
    var codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
    var pnm = editor.Panels;
    var container = document.createElement('div');
    var btnEdit = document.createElement('button');

    codeViewer.set({
        codeName: 'htmlmixed',
        readOnly: 0,
        theme: 'hopscotch',
        autoBeautify: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineWrapping: true,
        styleActiveLine: true,
        smartIndent: true,
        indentWithTabs: true
    });

    btnEdit.innerHTML = 'Edit';
    btnEdit.className = pfx + 'btn-prim ' + pfx + 'btn-import';
    btnEdit.onclick = function() {
        var code = codeViewer.editor.getValue();
        editor.DomComponents.getWrapper().set('content', '');
        editor.setComponents(code.trim());
        modal.close();
    };

    cmdm.add('html-edit', {
        run: function(editor, sender) {
            sender && sender.set('active', 0);
            var viewer = codeViewer.editor;
            modal.setTitle('Edit code');
            if (!viewer) {
                var txtarea = document.createElement('textarea');
                container.appendChild(txtarea);
                container.appendChild(btnEdit);
                codeViewer.init(txtarea);
                viewer = codeViewer.editor;
            }
            var InnerHtml = editor.getHtml();
            var Css = editor.getCss();
            modal.setContent('');
            modal.setContent(container);
            codeViewer.setContent(InnerHtml + "<style>" + Css + '</style>');
            modal.open();
            viewer.refresh();
        }
    });

    pnm.addButton('options',
        [
            {
                id: 'edit',
                className: 'fa fa-edit',
                command: 'html-edit',
                attributes: {
                    title: 'Edit'
                }
            }
        ]
    );
}