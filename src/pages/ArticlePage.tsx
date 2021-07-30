// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Link } from 'react-router-dom';

function ArticlePage() {
  return (
    <div>
      <p>ArticlePage</p>
      <p>
        <Link to="/edit">Edit</Link>
      </p>
    </div>
  );
}

export default ArticlePage;
