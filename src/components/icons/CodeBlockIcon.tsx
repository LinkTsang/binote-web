// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import IconProps from './IconProps';
import Icon from '@ant-design/icons';

const CodeBlockSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    style={{ position: 'relative' }}
  >
    <path
      d="M8.52 5h.84c.19 0 .34.15.34.33v.55c0 .19-.15.33-.34.33h-.57c-.58 0-.86.32-.86.98v2.94c0 .93-.45 1.56-1.33 1.87.88.36 1.33.97 1.33 1.87v2.96c0 .63.28.96.86.96h.57c.19 0 .34.14.34.33v.55c0 .18-.15.33-.34.33h-.84a2 2 0 01-1.58-.64c-.34-.4-.5-.93-.5-1.6v-2.81c0-.44-.1-.75-.28-.95-.18-.2-.48-.31-.9-.36a.3.3 0 01-.26-.3v-.67c0-.16.12-.29.28-.31.4-.05.7-.18.88-.36.18-.21.27-.53.27-.95v-2.8c0-.68.17-1.22.51-1.6.37-.44.9-.65 1.58-.65zm6.12 0h.84c.68 0 1.2.21 1.58.64.34.4.5.93.5 1.6v2.81c0 .42.1.75.3.96.16.17.45.3.86.35.16.02.28.16.28.32v.63a.34.34 0 01-.3.33c-.4.06-.68.17-.86.36-.18.2-.27.51-.27.95v2.82c0 .66-.17 1.2-.51 1.59a2 2 0 01-1.58.64h-.84a.34.34 0 01-.34-.33v-.55c0-.19.15-.33.34-.33h.57c.57 0 .86-.33.86-.96v-2.96c0-.9.43-1.51 1.33-1.87a1.82 1.82 0 01-1.33-1.87V7.19c0-.66-.3-.98-.86-.98h-.57a.34.34 0 01-.34-.33v-.55c0-.18.15-.33.34-.33z"
      fillRule="nonzero"
    ></path>
  </svg>
);

const CodeBlockIcon = (props: IconProps) => (
  <Icon component={CodeBlockSvg} {...props} />
);

export default CodeBlockIcon;
