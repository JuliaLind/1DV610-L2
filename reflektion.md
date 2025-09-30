# Reflektion  

## Namngivning 

Tanken är att endast de klasser som exporteras från src/index.js ska användas av andra - RateFetcher, CurrencyConverter, och QuoteConverter.

### Tabellreflektion för namngivning

<table>
<tr><th>Namn</th><th>Förklaring</th><th>Reflektion och regler från Clean Code</th></tr>
<tr>
<td>RateFetcher</td>
<td>Klass som ansvarar för att hämta valutakurser från extern API.</td>
<td>RateFetcher är ett substantiv, vilket följer regeln om att klasser ska döpas till substantiv. RateFetcher följer också regeln om att namnen ska avslöja syftet (intention-revealing). Varför finns klassen? För att hämta valutakurser. Vad gör klassen? Hämtar valutakurser. Namnet besvarar inte riktigt hur, men det framgår istället av metodnamnen. Det jag eventuellt hade kunnat göra är att ändra till ExrFetcher eftersom Exr är en vedertagen förkortning för exchange rates, men i sammanhanget tycker jag att Rate ändå blir tillräckligt tydligt vad det rör sig om. Dessutom avråder bokens författare från att använda förkortningar som endast är kända i vissa kretsar.</td>
</tr>

<tr>
<td>RateFetcher.setCurrencies(currencies)</td>
<td>En setter metod som assignar lista med valutor, t ex ['USD', 'EUR'] till det interna RateFetcher.#currencies attributet</td>
<td>Följer regeln på sida 25 om att mutators (dvs metoder som ändrar på attribut) ska heta set + namnet på attributet de ändrar.</td>
</tr>

<tr>
<td>RateFetcher.fetchByDate(date, count=1)</td>
<td>Metod som hämtar valutakurser från ett specifikt datum. Om datumet inte är en bankdag så hämtas kurserna från senaste bankdagen. Count parametern avser antal observationer, dvs bankdagar för och inkluderat det specade datumet. Default är 1 som innebär valutakurser från det specade datumet eller senaste bankdagen före om datumet inte är en bankdag. Om count är t ex 3 så hämtas valutakurser från de 3 bankdagarna närmast föregående och inkl det specade datumet.</td>
<td>fetchByDate börjar med ett verb, vilket följer regeln om att metodnamn ska börja med verb. Jag tycker nog även att namnen följer regeln om att syftet tydligt ska framgå, men man skulle kunna göra både metodnamn och argumentnamn ännu tydligare - t ex kunde fetchByDate istället varit fetchBeforeOrOn för att användaren inte ska behöva fundera över om denne kommer att få ett nullvärde om man skickar in en icke-bankdag. Och count kunde istället ha varit observations eller days, dvs RateFetcher.fetchBeforeOrOn(date, days = 1).</td>
</tr>

<tr>
<td>TypeChecker.isPrimitive(value)</td>
<td>Metod som kontrollerar om ett värde är primitivt</td>
<td>Följer regeln om att metoder som returnerar boolean (predicates) ska börja med is. Metodnamnet i kombination med namnet på argumentet förklarar tydligt syftet med metoden</td></tr>

<tr>
<td>RateFetcher.fetchByPeriod(startDate, endDate)</td>
<td>Metod som hämtar valutakurser under en period (från och med startDate, tom endDate).</td>
<td>Denna metod följer regeln what, why and how. What - hämtar valutakurser under en period; why - metoden finns för att hämta valutakurser mellan två datum; how - för att hämta valutakurser från period behöver användaren skicka in ett startdatum och ett slutdatum. Därtill är startDate och endDate mer beskrivande än om argumenten skulle hetat date1 och date2.</td></tr>

<tr>
<td>
CurrencyConverter.convert(amount)<br>
QuoteConverter.convert(quotes)
</td>
<td>
CurrencyConverter är en klass som ansvarar för att konvertera belopp från en valuta till en annan. metoden convert konverterar ett belopp från vald från-valuta till de valda till-valutorna genom att använda den senaste valutakursen.<br>
QuoteConverter ansvarar för att konvertera valutakurser från NOK till valda valutor.
</td>
<td>I grund och botten gör convert metoden hos båda klasserna motsvarande handling - den översätter belopp från en valuta till en eller flera andra. På så sätt följer detta regeln om konsekvent namngivning (one word per concept). Det som kanske inte framgår så tydligt av namnet är just att CurrencyConverter använder senast kända valutakursen, medan QuoteConverter konverterar aktiepriserna på respektive prisets datum, vilket bryter mot regeln om att namn ska förmedla syftet (intention-revealing) - jag har dock ingen idé om hur man skulle ha döpt de annorlunda utan att det blir för långt - och boken förespråkar korta namn framför långa.</td>
</tr>

<tr><td>CurrencyConverter.clear()</td>
<td>Denna metod rensar CurrencyConverterns state från tidigare satta värden.</td>
<td>Denna metod svarar tydligt på why, what och how. Möjligtvis hade den kunnat döpas om till reset() för ett mer vedertaget uttryck men clear används också ofta och funkar därför bra i sammanhanget. Däremot skulle reset underlätta att i framtiden kanske ha förinställda defaultvärden istället för tomma attribut, utan att metodnamnet riskerar att bli missvisande.</td></tr>

<tr>
<td>QuoteConverter.#calcMany()<br>
QuoteConverter.#calcOne()</td>
<td>#calcMany() konverterar alla valutakurserna från NOK till valda valutor. #calcOne() gör motsvarande för endast en valuta.</td>
<td>Nu är inte dessa metoder publika, men jag tyckte ändå att det var bra exempel att ta med. Här råkade jag bryta mot regeln med konsekvent namngivning - egentligen borde dessa ha hetat convertOne och convertMany. Däremot så följer dessa metoder regeln om att inte ha lika namn som skiljer sig väldigt lite - dvs att istället för att döpa de till convertQuote och convertQuotes (som jag kanske skulle ha gjort om jag inte hade läst kapitel 2) så blir det väldigt enkelt att se skillnad här på One och Many. Det som hade kunnat göras ännu tydligare här är att ändra Many till All eftersom det ju är alla aktiepriser som skickats med som konverteras i den metoden.</td></tr>

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

En annan sak som jag inte tänkt på tidigare som författaren nämner är att variabelnamn behöver innehålla why (varför den finns), what (vad den gör) och how (hur den används). Jag förstår bokens exempel och vad som menas, men känner ändå inte att jag kan säga att jag behärskar detta fullt ut i praktiken. Om vi tar exemplet med stopAndDelete() igen så är ju why - för att stoppa och radera, what är - stoppar och raderar och how är att det ska anropas om man vill göra båda. Men hur ska man tänka med motsvarande kill()? Stoppar den bara eller stoppar och raderar - det kanske är självklart för en van programmerate men inte helt tydligt för en nybörjare?
 








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

Jag hade hunnit läsa relevanta kapitel i boken innan jag satte igång så jag har aktivt arbetat med kodkvaliten från start gällande namngivning och antal argument till metoder. Ändå upptäckte jag, i samband med att jag skrev reflektionstabellen, att jag brutit mot flera av reglerna. De flesta misstag förekom inom lokala block och privata metoder och gällde regeln med konsekvent namngivning - jag upptäckte att motsvarande variabler i olika block kunde heta calculated / final / results när det mest lämpliga namnet egentligen hade varit "converted". Men när det gäller publikt interface och metoder tycker jag nog ändå att jag följt namngivningsreglerna ganska bra - vilket är det viktigast då namn som används i det privata scopet är enkelt att ändra i efterhand. 

