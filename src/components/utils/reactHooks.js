import { useStorageState } from 'react-storage-hooks';

export const useSessionState = (...args) => {
    return useStorageState(window.sessionStorage, ...args);
};

export const useLocalState = (...args) => {
    return useStorageState(window.localStorage, ...args);
};
