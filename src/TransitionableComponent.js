import React, { Component } from 'react';

import * as d3 from 'd3';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class TransitionableComponent extends Component {
    constructor(props) {
        super(props);

        let { easing, duration } = props;

        this.state = props;
        this._defineEasing(easing);
        this._defineDuration(duration);
    }

    _defineEasing(easing) {
        if (!this.easing || easing !== this.state.easing) {
            if (!easing) {
                easing = 'linear';
            }
            this.easing = d3[`ease${capitalizeFirstLetter(easing)}`];
        }
    }

    _defineDuration(duration) {
        if (this.duration === undefined) {
            this.duration = duration;
        }
    }

    componentWillReceiveProps(newProps) {
        this._defineEasing(newProps.easing);
        this._defineDuration(newProps.duration);

        const node = d3.select(this.refs.node);

        let transition = node.transition()
                             .ease(this.easing);

        if (this.duration !== undefined) {
            transition.duration(this.duration);
        }

        Object.keys(newProps)
                .forEach((k) => {
                    if (typeof newProps[k] != 'object') {
                        transition.attr(k, newProps[k]);
                    }
                });

        transition.on('end', () => {
            this.setState(newProps);
        });
    }
}

export default TransitionableComponent;
