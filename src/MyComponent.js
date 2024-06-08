//MyComponent.js

import React, { useState } from "react";

function MyComponent( { initialCount }) {
    const [count, setCount] = useState(initialCount);

    return (
        <div>
        <h1> Be-Gone Phishing!</h1>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}

export default MyComponent;