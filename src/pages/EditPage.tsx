// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ZEditor from '../components/editor/ZEditor';

function EditPage() {
  return (
    <div>
      <header className="App-header">ZNote Demo</header>
      <div style={{ height: '100%' }}>
        <ZEditor />
      </div>
    </div>
  );
}

export default EditPage;
