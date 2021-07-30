// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <p>HomePage</p>
      <p>
        <Link to="/login">Login</Link>
      </p>
      <p>
        <Link to="/article">Article</Link>
      </p>
    </div>
  );
}

export default HomePage;
