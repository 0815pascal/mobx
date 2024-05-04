// StoreContext.ts
import React from 'react';
import { RootState, rootState } from './RootState';

export const StoreContext = React.createContext<RootState>(rootState);
