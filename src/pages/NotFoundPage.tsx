// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <p>404 Not Found</p>
      <Link to="/">Back to home!</Link>
    </div>
  );
}

export default NotFoundPage;
