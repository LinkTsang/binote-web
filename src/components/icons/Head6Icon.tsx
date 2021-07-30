// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import IconProps from './IconProps';
import Icon from '@ant-design/icons';

const Head6Svg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    style={{ position: 'relative' }}
  >
    <g fillRule="evenodd">
      <path d="M5.53 10.98h6.96V5.34c0-.19.16-.34.35-.34h.82c.2 0 .36.15.36.34v13.3c0 .2-.16.35-.36.35h-.82a.35.35 0 01-.35-.34v-6.17H5.53v6.17c0 .18-.16.34-.36.34h-.82a.35.35 0 01-.35-.34V5.35c0-.2.16-.35.35-.35h.82c.2 0 .36.15.36.34v5.64z"></path>
      <path
        d="M18.1 9.8c1.61 0 2.54.83 2.75 2.47l.02.17h-1.41l-.13-.12c-.14-.72-.55-1.07-1.23-1.07-.48 0-.85.25-1.14.77-.25.44-.4.98-.42 1.64.19-.24.41-.42.67-.55.32-.17.69-.25 1.12-.25.8 0 1.46.28 1.94.85.49.57.73 1.3.73 2.18 0 .9-.28 1.64-.84 2.23-.56.58-1.25.88-2.06.88-1 0-1.79-.4-2.32-1.2a5.55 5.55 0 01-.78-3.16c0-1.44.28-2.6.83-3.48.55-.9 1.32-1.36 2.28-1.36zm-.05 4.5c-.45 0-.78.14-1.02.43-.24.28-.37.68-.37 1.2 0 .5.13.9.4 1.18.25.29.58.43 1 .43.41 0 .74-.15 1-.46.26-.3.4-.7.4-1.2 0-.48-.13-.86-.37-1.15a1.3 1.3 0 00-1.04-.43z"
        fillRule="nonzero"
      ></path>
    </g>
  </svg>
);

const Head6Icon = (props: IconProps) => (
  <Icon component={Head6Svg} {...props} />
);

export default Head6Icon;
