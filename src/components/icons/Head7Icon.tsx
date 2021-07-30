// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import IconProps from './IconProps';
import Icon from '@ant-design/icons';

const Head7Svg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    style={{ position: 'relative' }}
  >
    <g fill-rule="evenodd">
      <path d="M5.53 10.98h6.96V5.34c0-.19.16-.34.35-.34h.82c.2 0 .36.15.36.34v13.3c0 .2-.16.35-.36.35h-.82a.35.35 0 01-.35-.34v-6.17H5.53v6.17c0 .18-.16.34-.36.34h-.82a.35.35 0 01-.35-.34V5.35c0-.2.16-.35.35-.35h.82c.2 0 .36.15.36.34v5.64z"></path>
      <path
        d="M15.5 11.3v-1c0-.17.13-.3.3-.3h4.89c.16 0 .3.13.3.3v1.05l-2.91 7.46a.3.3 0 01-.28.19h-1.14a.3.3 0 01-.28-.41l2.86-7H15.8a.3.3 0 01-.3-.3z"
        fill-rule="nonzero"
      ></path>
    </g>
  </svg>
);

const Head7Icon = (props: IconProps) => (
  <Icon component={Head7Svg} {...props} />
);

export default Head7Icon;
