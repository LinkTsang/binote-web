// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import IconProps from './IconProps';
import Icon from '@ant-design/icons';

const Head9Svg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    style={{ position: 'relative' }}
  >
    <g fill-rule="nonzero">
      <path d="M5.53 10.98h6.96V5.34c0-.19.16-.34.35-.34h.82c.2 0 .36.15.36.34v13.3c0 .2-.16.35-.36.35h-.82a.35.35 0 01-.35-.34v-6.17H5.53v6.17c0 .18-.16.34-.36.34h-.82a.35.35 0 01-.35-.34V5.35c0-.2.16-.35.35-.35h.82c.2 0 .36.15.36.34v5.64zM17.9 10c1.01 0 1.79.39 2.32 1.16.52.76.78 1.79.78 3.1 0 1.38-.28 2.53-.82 3.4A2.6 2.6 0 0117.9 19c-1.6 0-2.52-.8-2.74-2.34 0-.03-.04-.24.2-.24h1.06c.19 0 .22.06.25.16.18.61.6 1 1.24 1 .45 0 .83-.25 1.12-.75.26-.44.4-.97.43-1.6-.2.22-.42.4-.67.53-.33.16-.7.25-1.11.25-.81 0-1.48-.3-1.96-.86a3.04 3.04 0 01-.72-2.1 3 3 0 01.83-2.18 2.75 2.75 0 012.08-.87zm.05 1.43c-.42 0-.75.15-1.01.45-.26.29-.38.67-.38 1.16 0 .5.12.86.38 1.14.24.28.57.42 1.01.42.43 0 .76-.14 1.01-.42.25-.3.37-.69.37-1.18 0-.5-.13-.88-.39-1.16a1.3 1.3 0 00-.99-.4z"></path>
    </g>
  </svg>
);

const Head9Icon = (props: IconProps) => (
  <Icon component={Head9Svg} {...props} />
);

export default Head9Icon;
