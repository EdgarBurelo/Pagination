module.exports = {
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
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
    "moduleNameMapper": {
        "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    }
};
