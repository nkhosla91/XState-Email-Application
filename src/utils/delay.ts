interface WaitOptions {
    delay?: number;
    fail?: boolean;
}

type Wait = (options: WaitOptions) => Promise<void>;

// Simulate a delay in resolving a promise
export const wait: Wait = async ({ delay = 2000, fail = false }) =>
    new Promise((resolve, reject) =>
        setTimeout(() => (fail ? reject() : resolve()), delay)
    );
