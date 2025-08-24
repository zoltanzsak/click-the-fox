export const safeSet = (storage: Storage, key: string, value: unknown): void => {
    try {
        const encoded = btoa(JSON.stringify(value));
        storage.setItem(key, encoded);
    } catch {
        console.error(`Error during setting ${key} in Storage`);
    }
};

export const safeGet = <T>(storage: Storage, key: string): T | null => {
    try {
        const encoded = storage.getItem(key);
        if (!encoded) return null;
        const json = atob(encoded);
        return JSON.parse(json) as T;
    } catch {
        // at this point it means someone tried to cheat, so wiping storage and returning null
        try {
            storage.removeItem(key);
        } catch {
            // ignore
        }
        return null;
    }
};

export const safeRemove = (storage: Storage, key: string): void => {
    try {
        storage.removeItem(key);
    } catch {
        console.error(`Error during removing ${key} from Storage`);
    }
};
