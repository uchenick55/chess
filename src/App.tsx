import React from 'react';
import store from "./redux/store-redux";

function App() {
    console.log(store.getState())
  return (
    <div>
      123
    </div>
  );
}

export default App;
