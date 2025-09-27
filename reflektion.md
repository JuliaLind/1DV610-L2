# Reflektion  

## Namngivning 

Tanken är att endast de klasser som exporteras från src/index.js ska användas av andra - RateFetcher, CurrencyConverter, och QuoteConverter.

### Tabellreflektion för namngivning

<table>
<tr><th>Namn</th><th>Förklaring</th><th>Reflektion och regler från Clean Code</th></tr>

<tr>
<td>RateFetcher.setCurrencies(currencies)</td>
<td>En setter metod som assignar lista med valutor, t ex ['USD', 'EUR'] till det interna RateFetcher.#currencies attributet</td>
<td></td>
</tr>

<tr>
<td>RateFetcher.fetchByDate(date, count)</td>
<td>Metod som hämtar valutakurser från ett specifikt datum. Count parametern avser antal observationer. Default är 1 som innebär valutakurser från det specade datumet eller senaste bankdagen före om datumet inte är en bankdag. Om count är t ex 3 så hämtas valutakurser från de 3 bankdagarna närmast föregående och inkl det specade datumet.</td>
<td></td>
</tr>

<tr>
<td>RateFetcher.fetchLatest(count)</td>
<td>
Metod som hämtar valutakurser från senaste bankdagen. Count parametern avser antal observationer, default är 1 vilket innebär valutakurser från den senaste bankdagen. Om count tex är 3 så innebär det att valutakurser hämtas från den tre senaste bankdagarma.
</td>
<td></td>
</tr>

<tr><td>RateFetcher.fetchByPeriod(startDate, endDate)</td><td></td><td></td></tr>
<tr><td>CurrencyConverter.setFromCurrency(value)</td><td></td><td></td></tr>
<tr><td>CurrencyConverter.getFromCurrency()</td><td></td><td></td></tr>
<tr><td>CurrencyConverter.setToCurrencies(values)</td><td></td><td></td></tr>
<tr><td>CurrencyConverter.getToCurrencies()</td><td></td><td></td></tr>
<tr><td>CurrencyConverter.clear()</td><td></td><td></td></tr>
<tr><td>CurrencyConverter.convert(amount)</td><td></td><td></td></tr>
<tr><td>QuoteConverter.setCurrencies(values)</td><td></td><td></td></tr>
<tr><td>QuoteConverter.convert(quotes)</td><td></td><td></td></tr>
</table>

### Kapitelreflektion kap 2


## Funktioner

### Tabellreflektion för funktioner/metoder

<table>
<tr><th>Metodnamn</th><th>Länk eller kod</th><th>Antal rader (ej ws)</th><th>Reflektion</th></tr>

<tr>
<td>CurrencyConverter.#prep()</td>
<td></td>
<td></td>
<td></td>
</tr>

<tr>
<td>CurrencyConverter.#recalc()</td>
<td></td>
<td></td>
<td></td>
</tr>

<tr>
<td>FormatHelper.#getMultiplier()</td>
<td></td>
<td></td>
<td></td>
</tr>

<tr>
<td>FormatHelper.#mergeAndNormalize()</td>
<td></td>
<td></td>
<td></td>
</tr>

<tr>
<td>RateNormalizer.normalize(rates)</td>
<td></td>
<td></td>
<td></td>
</tr>

</table>

### Kapitelreflektion kap 3

## Reflektion över egen kodkvalitet  

Jag hade hunnit läsa relevanta kapitel i boken innan jag satte igång så jag har aktivt arbetat med kodkvaliten från start gällande namngivning och antal argument till metoder. Däremot var vissa metoder längre från start, och jag har brytit ut dessa till mindre allteftersom. När samma metod behövt användas i fler än en klass har jag gjort den till en fristående funktion. Den regel som jag upplevde som svårast att hålla var att hålla delar i en metod på samma nivå. 

