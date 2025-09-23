# 1DV610-L2

This module provides two classes CurrencyConverter and RateFetcher.  
  
The CurrencyConverter can be used to covert an amount from any currency to one or more other currencies using the latest available exchange rate.  
  

Example:  

Coverting 350 SEK to EUR and PLN.

```
import { CurrencyConverter } from 'index.js'

const converter = new CurrencyCoverter()

converter.setFromCurrency('SEK')
converter.setToCurrencies(['EUR', 'PLN'])

const coverted = await converter.convert(350)

console.log(converted['EUR']) // 31.61561201
console.log(converted['PLN']) // 134.7786382

```



