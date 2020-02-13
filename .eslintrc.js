module.exports = {
    "extends": [
        "eslint:recommended"
    ],
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "rules": {
        "no-constant-condition": "off",
        "no-undef": "off"
    }
}