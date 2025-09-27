## About

This package is a school project.  
The package provides tools for fetching exchange rates and for recalculating amounts between different currencies, utilizing the public API provided by Norges Bank (Norway national bank).  

To use the package in your projects install with:  

```
npm install @jl225vf/exr   

```


This module provides the classes CurrencyConverter, RateFetcher and QuoteConverter.  

To use the RateFetcher pass an array with currencies you wish to fetch rates for to the method setCurrencies().  The RateFetcher provids the following methods:
- fetchByDate() with optional count parameter that determines the number of observations prior to and including the specified date.  If the date is not a bank date, the rates will be fetched from the nearest bankdate perceeding the specified date.  
- fetchLatest() with optional parameter count that fetches the latest rates  
- fetchByPeriod() that fetches the rates between and including the two specified dates  

 

Example 1:  

Fetch exchange rates on 2023-01-01.

```
import { RateFetcher } from "@jl225vf/exr"

const fetcher = new RateFetcher()
fetcher.setCurrencies(["USD", "EUR", "GBP"])
const rates = await fetcher.fetchByDate("2023-01-01")

console.log(rates) // {
                   //    USD: { '2022-12-30': 9.8573 },
                   //    GBP: { '2022-12-30': 11.8541 },
                   //    EUR: { '2022-12-30': 10.5138 }
                   // }

```

Example 2:  

Fetch exchange rates between 2023-01-01 and 2023-01-12.

```
import { RateFetcher } from "@jl225vf/exr"


const fetcher = new RateFetcher()
fetcher.setCurrencies(["EUR", "SEK"])
const rates = await fetcher.fetchByPeriod("2023-01-01", "2023-01-12")

console.log(rates) // {
                   //   EUR: {
                   //     '2023-01-02': 10.5135,
                   //     '2023-01-03': 10.528,
                   //     '2023-01-04': 10.738,
                   //     '2023-01-05': 10.7248,
                   //     '2023-01-06': 10.807,
                   //     '2023-01-09': 10.6108,
                   //     '2023-01-10': 10.6785,
                   //     '2023-01-11': 10.738,
                   //     '2023-01-12': 10.7228
                   //   },
                   //   SEK: {
                   //     '2023-01-02': 0.9415,
                   //     '2023-01-03': 0.9448,
                   //     '2023-01-04': 0.9617,
                   //     '2023-01-05': 0.9589,
                   //     '2023-01-06': 0.9599,
                   //     '2023-01-09': 0.9477,
                   //     '2023-01-10': 0.9538,
                   //     '2023-01-11': 0.9521,
                   //     '2023-01-12': 0.9512
                   //   }
                   // }

```


  
The CurrencyConverter can be used to covert an amount from any currency to one or more other currencies using the latest available exchange rate.  To use the CurrencyConverter you must first set the fromCurrency using setFromCurrency() method and the target currencies by passing an array with target currencies to the setToCurrencies() method. Then pass the amount you wish to convert to the convert() method. To reset the CurrencyConverter use the clear() method.
  

Example 3:  

Coverting 350 SEK to EUR and PLN.

```
import { CurrencyConverter } from "@jl225vf/exr"

const converter = new CurrencyCoverter()

converter.setFromCurrency('SEK')
converter.setToCurrencies(['EUR', 'PLN'])

const coverted = await converter.convert(350)

console.log(converted['EUR']) // 31.61561201
console.log(converted['PLN']) // 134.7786382

``` 

The QuoteConverter converts a period of stock quotes from NOK to selected currencies.  
To use the QuoteConverter set the currencies you wish to convert using setCurrencies() method and then pass the quotes object to the convert() method. Quotes must be an object where keys are dates in the format "YYYY-MM-DD" and values are the quotes in NOK.  

Example 4:

```
import { QuoteConverter } from "@jl225vf/exr"

const converter = new QuoteCoverter()

converter.setCurrencies(['EUR', 'PLN'])

const quotes = {
    "2025-01-10": 332.4,
    "2025-01-09": 334.8,
    "2025-01-08": 332,
    "2025-01-07": 334.8,
    "2025-01-06": 331,
    "2025-01-03": 332,
    "2025-01-02": 334.4
}

const coverted = await converter.convert(quotes)

console.log(converted) // {
                       //   '2025-01-10': { NOK: 332.4, EUR: 28.27, PLN: 120.61 },
                       //   '2025-01-09': { NOK: 334.8, EUR: 28.47, PLN: 121.63 },
                       //   '2025-01-08': { NOK: 332, EUR: 28.28, PLN: 120.96 },
                       //   '2025-01-07': { NOK: 334.8, EUR: 28.52, PLN: 121.45 },
                       //   '2025-01-06': { NOK: 331, EUR: 28.27, PLN: 120.19 },
                       //   '2025-01-03': { NOK: 332, EUR: 28.34, PLN: 121.1 },
                       //   '2025-01-02': { NOK: 334.4, EUR: 28.54, PLN: 122.01 }
                       // }


``` 

## Testing

Current code has 100% coverage, latest test report available under https://github.com/JuliaLind/1DV610-L2/actions/workflows/ci.yml .  

## Contribute  

1. **Fork** this repository to your GitHub account.
2. **Clone your fork** (replace `<your-username>`):

```
git clone git@github.com:<your-username>/1DV610-L2.git
cd 1DV610-L2
```
3. **Install**
```
npm install
```

4. **Create a branch**

```
git checkout -b feat/short-description
```

5. **Test and lint**

Make sure to fix any linting errors. Please add/adjust tests for any change you make to the code.

6. **Opening a Pull Request**

Push your branch:

```
git push -u origin <branch-name>
```
  
Open a PR against main and include:  
  
What problem it solves / why the change is needed.  
  
What changed (before/after, screenshots if relevant).  
  
How to test (commands, sample input/output).  
  
**PR checklist**  
  
1. Tests pass (npm test)  

2. Lint passes (npm run lint)

3. README/docs updated if behavior or API changed
