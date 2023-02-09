## Running locally

- Build package with rollup
- `cd example && npm i ../ && npm i`

References:
- https://stackoverflow.com/questions/15806241/how-to-specify-local-modules-as-npm-package-dependencies

## Reducing import noise

```
    "include": [
        "src",
    ],
    "exclude": [
        "src/utils/*.tsx", "src/__tests__/**/*.tsx", "src/__tests__/**/*.ts", "src/store/*.ts"
    ]

    // Does not work as expected due to the nature of tsc
    //
    // It won't ignore src/store/*.ts from the declaration files
    // generated
    // --
    // This is because it is imported by a certain module
    // and thus not an independent module
    // --
    // The caveat of this is that people can TRY import from this path
    // but it won't work but look like it will.
    // --
    // This isn't due to rtsp2 as its just following tsc's rules.

    "gen:declarations": "rm -rf lib && tsc --emitDeclarationOnly --p tsconfig.prod.json"

    // Was the way of proving this, it still shows them no matter what.
```
