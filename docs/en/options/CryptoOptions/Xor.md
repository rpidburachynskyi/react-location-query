# Xor

Crypto option convert all query to single field with encrypted value and may be compressed by `compessedToBase64` value

You can pass it in [BrowserLocationQuery](/docs/en/components/BrowserLocationQuery.md 'BrowserLocationQuery')

Xor support next options:

| Name              | Description                                  | Type    | Default value |
| ----------------- | -------------------------------------------- | ------- | ------------- |
| method            | -                                            | 'xor'   | not optional  |
| key               | key of xor method                            | string  | not optional  |
| compessedToBase64 | option to compess encrypted string to base64 | boolean | false         |

**ATTENTION**: encrypted string will contains **shielded characters** and it increase size of string - to compess it, you can use **compessedToBase64** option.
