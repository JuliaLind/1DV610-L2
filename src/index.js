import { RateFetcher } from './RateFetcher.js'
import { CurrencyConverter } from './CurrencyCoverter.js'
import { QuoteConverter } from './QuoteConverter.js'
import { DeepCloner } from './lib/DeepCloner.js'
import { TypeChecker } from './lib/TypeChecker.js'

export { RateFetcher, CurrencyConverter, QuoteConverter, DeepCloner, TypeChecker }


const fetcher = new RateFetcher()
fetcher.setCurrencies(['USD', 'SEK','RUB'])
const res = await fetcher.fetchLatest()
console.log(res)
