// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import IconProps from './IconProps';
import Icon from '@ant-design/icons';

const Head5Svg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    style={{ position: 'relative' }}
  >
    <g fillRule="evenodd">
      <path d="M5.53 10.98h6.96V5.34c0-.19.16-.34.35-.34h.82c.2 0 .36.15.36.34v13.3c0 .2-.16.35-.36.35h-.82a.35.35 0 01-.35-.34v-6.17H5.53v6.17c0 .18-.16.34-.36.34h-.82a.35.35 0 01-.35-.34V5.35c0-.2.16-.35.35-.35h.82c.2 0 .36.15.36.34v5.64z"></path>
      <path
        d="M17.61 12.99c.29-.13.6-.2.94-.2.72 0 1.32.3 1.77.85.45.57.68 1.33.68 2.28 0 .93-.3 1.69-.9 2.28-.55.53-1.2.8-1.95.8-.69 0-1.3-.23-1.78-.67a3.13 3.13 0 01-.92-1.94c0-.07.04-.22.23-.22h.96c.2 0 .3.16.31.23.07.36.2.69.38.85.2.17.48.26.83.26.38 0 .7-.14.97-.42.26-.28.4-.67.4-1.16 0-.53-.13-.96-.35-1.26-.21-.3-.52-.43-.95-.43-.3 0-.54.05-.73.17-.23.13-.4.32-.52.6L15.9 15a.3.3 0 01-.3-.33l.38-4.4a.3.3 0 01.3-.27h3.93c.16 0 .3.13.3.3v.94a.3.3 0 01-.3.3h-3l-.16 1.8c.17-.15.36-.27.55-.35z"
        fillRule="nonzero"
      ></path>
    </g>
  </svg>
);

const Head5Icon = (props: IconProps) => (
  <Icon component={Head5Svg} {...props} />
);

export default Head5Icon;
