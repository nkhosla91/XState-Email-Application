import React from 'react';

import { AppContext } from './Home';

export const State = ({ matches, children }: any) => {
    const {
        machine: { current },
    } = React.useContext(AppContext);

    if (current.matches(matches)) {
        return children;
    }

    return null;
};


