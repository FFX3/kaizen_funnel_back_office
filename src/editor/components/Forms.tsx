import type grapesjs from 'grapesjs';
import { Component } from 'react';

export default (editor: grapesjs.Editor, config) => {
    editor.BlockManager.add('form-newsletter', {
        label: 'form-newsletter',
        content: {
            tagName: 'form',
            attributes: {
                method: 'POST',
                id:  'email-form',
                action: '/api/email/subscribe', //we can get the action from the user settings
            },
            components: [
                {
                    tagName: 'input',
                    attributes: {
                        type: 'text',
                        name: 'firstName',
                        placeholder: 'First Name'
                    },
                },
                {
                    tagName: 'input',
                    attributes: {
                        type: 'email',
                        name: 'email',
                        placeholder: 'Email'
                    },
                },
                {
                    tagName: 'button',
                    attributes: {
                        for: 'email-form',
                        type: 'submit'
                    },
                    components: 'Sign Up'
                }
            ]
        },
        category: 'Basic',
    })

    editor.DomComponents.addType('input-extended', {
        isComponent: (el) => el.tagName === 'INPUT',

        model: {
            defaults: {
                tagName: 'input',
                draggable: 'form, form *',
                droppable: false,
                attributes: {
                    type: 'text',
                    name: 'default-name',
                    placeholder: 'Insert text here'
                },
                traits: [
                    'name',
                    'placeholder',
                    { type: 'checkbox', name: 'required' },

                ],
            }
        },
    })
}