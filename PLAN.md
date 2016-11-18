Currently, sherlock can take two state objects, and return an array of commands to be executed to transition from one state to another.

Sherlock should be able to take in an array of each state, with the associated frame number. Ideally this will be tweened so that all frames are present.

Sherlock will then identify which code could be used to transition from one frame to the next. Ideally, some code will be common across each frame. We can then use that code.

