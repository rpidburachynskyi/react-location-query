# Crypto options

Crypto options are options to control encrypt/decrypt query.

You can pass them in [BrowserLocationQuery](/docs/en/components/BrowserLocationQuery.md 'BrowserLocationQuery')

CryptoOptions support next options:

| Name   | Description                               | Type   | Default value |
| ------ | ----------------------------------------- | ------ | ------------- |
| method | optional to set method on encrypt/decrypt | string | 'none'        |

We support next methods:

-   base64 - just convert from/to base64 all query (see [Base64](/docs/en/options/CryptoOptions/Base64.md 'Base64')).
-   xor - xor encryption/decryption (may be compressed to base64) (see [Xor](/docs/en/options/CryptoOptions/Xor.md 'Xor')).
