module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "space-before-blocks": "off",
        "linebreak-style": 0,
        "indent": ["error", 4],
        "comma-dangle": ["error", "never"],
        "react/jsx-indent": [true, 4],
        "react/jsx-indent-props": [true, 4],
        "no-use-before-define": ["error", { "functions": false, "classes": true, "variables": false }],
        "react/prop-types": [false, {}],
        "arrow-parens": ["error", "as-needed"],
        "no-class-assign": "off",
        "no-restricted-syntax": "off",
        "no-plusplus": "off",
        "no-trailing-spaces": ["error", { "skipBlankLines": true }],
        "class-methods-use-this": ["off", {}],
        "curly": ["warn", "multi"],
        "no-underscore-dangle": ["error", { "allowAfterThis": true }],
        "no-mixed-operators": "off",
        "react/sort-comp": [0]
    },
    "env": {
        "browser": true,
        "node": true
    }
};