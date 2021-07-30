// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import IconProps from './IconProps';
import Icon from '@ant-design/icons';

const QuoteSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    style={{ position: 'relative' }}
  >
    <path
      d="M5.13 15.56A8.74 8.74 0 015 13.72c0-2.5.6-4.5 1.55-5.8a4.72 4.72 0 014.55-1.88c.14.01.21.13.19.3l-.13.9c-.03.21-.18.22-.31.21-2.44-.2-4.1 1.48-4.32 5.22a2.91 2.91 0 014.37 2.47C10.9 16.72 9.6 18 8 18a2.89 2.89 0 01-2.87-2.44zm7.71 0a8.74 8.74 0 01-.13-1.84c0-2.5.6-4.5 1.55-5.8a4.72 4.72 0 014.55-1.88c.14.01.21.13.19.3l-.13.9c-.04.21-.18.22-.31.21-2.44-.2-4.1 1.48-4.32 5.22a2.91 2.91 0 014.37 2.47c0 1.58-1.3 2.86-2.9 2.86a2.89 2.89 0 01-2.87-2.44z"
      fillRule="evenodd"
    ></path>
  </svg>
);

const QuoteIcon = (props: IconProps) => (
  <Icon component={QuoteSvg} {...props} />
);

export default QuoteIcon;
