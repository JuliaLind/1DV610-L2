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

Redan innan jag läste boken så har jag känt att detta med namngivning är en av sakerna jag är mindre bra på. Dels tycker jag att det är svårt att komma på konsisa namn som samtidigt är beskrivande och dels att använda uttryck som är vedertagna.  

Som exempel tar bokens författare upp att kill() är bättre att använda än whack(), men jag skulle kanske inte ha kommit på kill() heller utan använt stop() eller stopAndDelete(). Jag antar att sådant kommer med erfarenhet och när man granskat kod skriven av andra mer/använder utomstående moduler i sin kod. 

En annan regel som jag är medveten om att jag brytit mot massvis av gånger är att vara konsekvent med namngivning, t ex att använda både controller och manager eftersom det blir otydligt vad skillnaden mellan de två är (bryter bl a mot regeln "one rule per concept"). Jag har även kommit på mig själv med att ibland skriva del, upd och ibland delete, update, ibland inom samma klass - detta är något jag aktivt försöker tänka på, men det händer ofta att jag kommer på den kortare varianten först när mycket av koden redan är skriven och det blir för omständligt att uppdatera samtliga ställen i koden (+ alla tillhörande tester).  

Jag har också varit rätt dålig på att inte använda samma ord för två olika koncept (exemplet i boken gäller 'add' och att man inte ska använda  det både för en funktion som skapar ett nytt värde genom att lägga ihop två befintliga värden, och samtidigt använda för en annan funktion som lägger till nytt element i en befintlig lista - utan att då är det bätre att använda 'append' eller 'insert' för det senare). Detta kommer förstås också från ovana i kombination med dålig fantasi.
  
I läroboken tycker författaren att man ska undvika att ha typ i variabeln - dels för att det är onödigt, och dels för att det gör det svårare att ändra typen på värdet i efterhand utan att behöva ändra variabelnamnet för att det inte ska bli missvisande för läsaren. Jag håller med om detta till stor del, men har dock hamnat i situation (oftast lokala block) där jag behövt ha typ i namnet, exempelvis:  
  
```
const phoneNrAsString = catalogue.getPhoneNr('Anders')
const phoneNrAsArr = phoneNrAsString.split('')
```  
  
Det enda sättet att undvika detta, som jag kan komma på, är att sammanfoga båda raderna till en one-liner
  
```  
const phoneNr = (catalogue..getPhoneNr('Anders')).split('')  
```   
  

Men ju fler operationer som sammanfogas till samma rad desto svårare kan det bli att följa vad som händer i koden. Jag har tidigare lärt mig att man bör undvika one-liners för läsbarheten och hellre skriva ut koden i flera steg. Författaren ger dock inga tips på hur man kan lösa denna typ av situation. Just detta exempel bryter även mot regeln med namngivning endast för att tillfredsställa compilern - dvs att informationen om typ inte tillför läsaren något utan är endast tillagd för att skilja orden åt. Eller är det regeln kring noise words som gäller även här? 

I boken står det att man ska undvika att använda s k noise words för att skilja på två snarlika ord - om två saker behöver olika namn så ska namnen vara tillräckligt olika för att enkelt kunna skiljas åt - just detta tycker jag nog är en av de svårare reglerna att följa med namngivning. Framförallt när det kommer till funktioner/metoder - om man har en stor metod och dela upp den i små för att minska komplexiteten, tycker jag att det ofta kan bli svårt att namnge subfunktionerna och därtill utan att bryta regeln om konsekvent namngivning. Denna utmaning stötte jag senast på i just denna uppgift med JsonFetchService som har fått en publik fetch() och en privat #fetch(). Den publika fetch har ett try/catch block där try-blocket innehåller anrop till den privata #fetch. Den privata #fetch gör själva anropet till APIet samt kontrollerar och returnerar svaret utan att fånga fel. Jag kan inte komma något namn som skulle passa bättre till något av dessa metoder.  

Bokens författare nämner även att man ska undvika att använda tecken som kan misstas för andra tecken, t ex ett fristående litet l som kan misstas för en etta eller stort O som kan misstas för en nolla. Det är inte något som jag tänkt på tidigare, men låter fullt rimligt så det är något jag aktivt har börjat tänka på nu. Nu tror jag iofs att dessa tecken normalt sett är del i ett ord så att man förstår ur sammanhanget om det är en siffra eller en bokstav, men jag kan tänka mig att i slumpvist genererade användarnamn/lösenord kan dessa tecken skapa problem för användare.  

Författaren nämner att enbokstavs-variabler endast bör användas i lokala block - det håller jag med om. Från tidigare utbildning har jag faktiskt lärt mig att undvika enbokstavs-variabelnamn även i loopar - t ex att 

```for i=0; i < books.length; i++```  

skulle likväl kunna vara:

```for bookIndex=0; bookIndex < books.length; bookIndex++``` 

Att detta ökar läsbarheten blir extra tydligt om man har nästlade loopar (vilket man förstås bör undvika, men min erfarenhet är att det inte alltid som det går att plocka ut inner-loopen till egen metod utan att den då måste få en massa inparametrar).  

Författaren nämner att man inte ska prefixa variabler och tar upp som exempel att IShareFactory bör bara heta Shaefactory. Jag håller med i det exemplet, men kan också komma på ett fall där jag personligen tycker att prefixning är nödvändig - och det är när man skapar vyer i SQL kod. Min erfarenhet är att man från och till vill se om en tabell är en vanlig table eller view och det är till stor hjälp att det framgår att det är en vy av tabellens namn med hjälp av v_ prefixet, så att man inte behöver leta i koden hur tabellen har skapats.  

Något som boken nämner som var helt nytt för mig var regeln vid overloading av konstruktorn i Java och att man bör använda statiskt metod för det som har ett namn som förklarar funktionsrgumenten, t ex ```Complex.FromRealNumber(23.0)```
istället för ```new Complex(23.0)``` . Detta var helt nytt för mig då det inte är så vi lärt oss att jobba i Java-kursen förra terminen, men låter å andra sidan rimligt ur läsbarhets perspektiv.  

En annan sak som jag inte tänkt på tidigare som författaren nämner är att variabelnamn behöver innehålla why (varför denn finns), what (vad den gör) och how (hur den används). Jag förstår bokens exempel och vad som menas, men känner ändå inte att jag kan säga att jag behärskar detta fullt ut i praktiken. Om vi tar exemplet med stopAndDelete() igen så är ju why - för att stoppa och radera, what är - stoppar och raderar och how är att det ska anropas om man vill göra båda. Men hur ska man tänka med motsvarande kill()? Stoppar den bara eller stoppar och raderar - det kanske är självklart för en van programmerate men inte helt tydligt för en nybörjare?
 








## Funktioner

### Tabellreflektion för funktioner/metoder

<table>
<tr><th>Metodnamn</th><th>Länk eller kod</th><th>Antal rader (ej ws)</th><th>Reflektion</th></tr>

<tr>
<td>CurrencyConverter.#prep()</td>
<td><pre><code>
/**
* Prepares the converter by fetching and normalizing rates.
*
* @returns {Promise<void>} - A promise that resolves when preparation is complete.
*/
async #prep () {
    if (this.#normalizer.hasCachedRates()) {
        return
    }

    this.#isReady()
    this.#fetcher.setCurrencies([this.#fromCurrency, ...this.#toCurrencies])
    const rates = await this.#fetcher.fetchLatest()

    this.#normalizer.setFromCurrency(this.#fromCurrency)
    this.#normalizer.setToCurrencies(this.#toCurrencies)
    this.#normalizer.normalize(rates)
}
</code></pre></td>
<td>11</td>
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

Jag hade hunnit läsa relevanta kapitel i boken innan jag satte igång så jag har aktivt arbetat med kodkvaliten från start gällande namngivning och antal argument till metoder. Däremot var vissa metoder längre från start, och jag har brytit ut dessa till mindre allteftersom. När samma metod behövt användas i fler än en klass har jag gjort den till en fristående funktion - alternativet hade varit att göra egen klass, men eftersom den inte behöver tillgång till/ändra state så kändes klass onödigt komplext för ändamålet. Den regel som jag upplevde som svårast att hålla var att hålla delar i en metod på samma nivå. 

