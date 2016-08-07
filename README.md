
# React transitionable component

React component for building simple transitions using
d3-transition. Tested for SVG elements, but should work with anything.

To make a transitionable circle:

```javascript
// src/Circle.js
import React from 'react';
import TransitionableComponent from 'react-transitionable-component';

class Circle extends TransitionableComponent {
    render() {
        return <circle cx={this.state.cx}
                       cy={this.state.cy}
                       r={this.state.r} />
    }
}


// src/App.js

render() {
    return <svg>
        <Circle cx="100" cy="100" r="5" easing="cubicInOut" duration="1500" />
    </svg>
}

```

When rendering a transitionable component, make sure to use state instead of
props. All props are copied to state and will use transitions when
rendering.

You can use the `easing` and `duration` props to define easing
functions and the duration for all transitions. All easing functions
from [d3's easing package](https://github.com/d3/d3-ease) are supported.
