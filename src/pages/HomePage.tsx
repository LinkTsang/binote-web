// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <p>HomePage</p>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default HomePage;
