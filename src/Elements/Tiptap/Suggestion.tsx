import { LazyQueryExecFunction, OperationVariables, useQuery } from '@apollo/client'
import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import { queryUsersByName } from '../../lib/graphql/queries.js'

import MentionList from './MentionList.jsx'

export default {
  items: ({query, funcUsersByName} : {query : string, funcUsersByName: LazyQueryExecFunction<any, OperationVariables>}) => {
    
    return [
      'Lea Thompson',
      'Cyndi Lauper',
    ]
  },

  render: () => {
    let component : any
    let popup: any

    return {
      onStart: (props : any) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.getElementById("root")?.children[0] as HTMLElement,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props : any) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props : any) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}