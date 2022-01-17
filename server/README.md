# chat

## node ts env

```bash
# 生成tsconfig.json， 有详细注释
tsc --init
```

```js
// tsconfig.json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
  },
  "exclude":[
    "./node_modules"
  ]
}
```
