// PostTestCompletionContext.js

import React, { createContext, useState } from 'react';

export const PostTestCompletionContext = createContext();

export const PostTestCompletionProvider = ({ children }) => {
  const [postTestCompleted, setPostTestCompleted] = useState(false);

  return (
    <PostTestCompletionContext.Provider value={{ postTestCompleted, setPostTestCompleted }}>
      {children}
    </PostTestCompletionContext.Provider>
  );
};
