module.exports = {
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    // "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "testMatch": ['<rootDir>/src/**/?(*.)test.{ts,tsx}'],
    "testEnvironment": 'jsdom',
    "setupFilesAfterEnv": [
        "<rootDir>/__test__/config.ts"
    ],
    "verbose": true,
};
