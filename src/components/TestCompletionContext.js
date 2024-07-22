// TestCompletionContext.js

import React, { createContext, useState } from 'react';

const TestCompletionContext = createContext();

export const TestCompletionProvider = ({ children }) => {
    const [testCompleted, setTestCompleted] = useState(false);

    return (
        <TestCompletionContext.Provider value={{ testCompleted, setTestCompleted }}>
            {children}
        </TestCompletionContext.Provider>
    );
};

export { TestCompletionContext };

export default TestCompletionContext;