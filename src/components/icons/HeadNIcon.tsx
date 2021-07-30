// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import IconProps from './IconProps';
import Icon from '@ant-design/icons';

const HeadNSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    style={{ position: 'relative' }}
  >
    <g fill-rule="evenodd">
      <path d="M5.53 10.98h6.96V5.34c0-.19.16-.34.35-.34h.82c.2 0 .36.15.36.34v13.3c0 .2-.16.35-.36.35h-.82a.35.35 0 01-.35-.34v-6.17H5.53v6.17c0 .18-.16.34-.36.34h-.82a.35.35 0 01-.35-.34V5.35c0-.2.16-.35.35-.35h.82c.2 0 .36.15.36.34v5.64zM15.87 12.09h.83c.17 0 .3.13.3.29v.44h.03c.47-.55.84-.82 1.6-.82.59 0 1.12.2 1.61.6.48.41.74 1.01.76 1.8v4.3a.3.3 0 01-.3.3h-.83a.3.3 0 01-.3-.3v-3.82c0-.48-.13-.85-.4-1.1-.25-.26-.59-.39-1-.39-.41 0-.5.13-.77.39-.27.25-.4.62-.4 1.1v3.83a.3.3 0 01-.3.29h-.83a.3.3 0 01-.3-.3v-6.32c0-.16.14-.3.3-.3z"></path>
    </g>
  </svg>
);

const HeadNIcon = (props: IconProps) => (
  <Icon component={HeadNSvg} {...props} />
);

export default HeadNIcon;
