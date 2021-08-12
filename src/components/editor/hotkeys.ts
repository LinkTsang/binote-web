// Copyright (c) 2021 Bin Tsang
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { isKeyHotkey } from 'is-hotkey'

type KeyBinding = [
  commandName: string,
  command: string,
  hotkey: string | readonly string[],
  fn: (event: KeyboardEvent) => boolean
];

// helper function
const h = (commandName: string, command: string, hotkey: string | readonly string[]): KeyBinding => {
  return [commandName, command, hotkey, isKeyHotkey(hotkey)]
}

const keybindings: KeyBinding[] = [
  h('bold', 'bold', 'mod+b'),
  h('italic', 'italic', 'mod+i'),
  h('underline', 'underline', 'mod+u'),
  h('strikethrough', 'strikethrough', 'mod+shift+X'),
  h('highlight', 'highlight', 'opt+h'),
  h('code', 'code', 'mod+`'),
  h('header-one', 'header-one', 'mod+opt+1'),
  h('header-two', 'header-two', 'mod+opt+2'),
  h('header-three', 'header-three', 'mod+opt+3'),
  h('header-four', 'header-four', 'mod+opt+4'),
  h('header-five', 'header-five', 'mod+opt+5'),
  h('header-six', 'header-six', 'mod+opt+6'),
  h('ordered-list', 'ordered-list', 'mod+shift+&'),
  h('unordered-list', 'unordered-list', 'mod+shift+*'),
  h('blockquote', 'blockquote', 'mod+shift+>'),
  h('code-block', 'code-block', 'mod+shift+C')
]

export function mapHotkeyToCommand(event: KeyboardEvent): string | null {
  for (const [, command, , fn] of keybindings) {
    if (fn(event)) {
      return command;
    }
  }
  return null;
}
