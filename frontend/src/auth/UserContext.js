//* Creating Context

/** What is Context?
- Universal data across your application
- Data accessible across all components

Why is it useful?
- Prop drilling / tunneling
- Less repetition
- Useful for global themes, shared data*/

import React from "react";

export default React.createContext();

/** This gives us a component:

<UserContext.Provider> 

- allows you to provide a value to the context */

/** Context: provides currentUser object and setter for it throughout app. */
