# Reflektion  

## Namngivning 

### Tabellreflektion för namngivning 

<table>
<tr><th></th><th>Namn</th><th>Förklaring</th><th>Reflektion och regler från Clean Code</th></tr>
<tr>
<td>1</td>
<td>RateFetcher</td>
<td>Klass som ansvarar för att hämta valutakurser från extern API.</td>
<td>RateFetcher är ett substantiv, vilket följer regeln om att klasser ska döpas till substantiv. RateFetcher följer också regeln om att namnen ska avslöja syftet (intention-revealing). Varför finns klassen? För att hämta valutakurser. Vad gör klassen? Hämtar valutakurser. Namnet besvarar inte riktigt hur, men det framgår istället av metodnamnen. Det jag eventuellt hade kunnat göra är att ändra till ExrFetcher eftersom Exr är en vedertagen förkortning för exchange rates, men i sammanhanget tycker jag att Rate ändå blir tillräckligt tydligt vad det rör sig om. Dessutom avråder bokens författare från att använda förkortningar som endast är kända i vissa kretsar.</td>
</tr>

<tr>
<td>2</td>
<td>RateFetcher.setCurrencies(currencies)</td>
<td>En setter metod som assignar lista med valutor, t ex ['USD', 'EUR'] till det interna RateFetcher.#currencies attributet</td>
<td>Följer regeln på sida 25 om att mutators (dvs metoder som ändrar på attribut) ska heta set + namnet på attributet de ändrar.</td>
</tr>

<tr>
<td>3</td>
<td>RateFetcher.fetchByDate(date, count=1)</td>
<td>Metod som hämtar valutakurser från ett specifikt datum. Om datumet inte är en bankdag så hämtas kurserna från senaste bankdagen. Count parametern avser antal observationer, dvs bankdagar för och inkluderat det specade datumet. Default är 1 som innebär valutakurser från det specade datumet eller senaste bankdagen före om datumet inte är en bankdag. Om count är t ex 3 så hämtas valutakurser från de 3 bankdagarna närmast föregående och inkl det specade datumet.</td>
<td>fetchByDate börjar med ett verb, vilket följer regeln om att metodnamn ska börja med verb. Jag tycker nog även att namnen följer regeln om att syftet tydligt ska framgå, men man skulle kunna göra både metodnamn och argumentnamn ännu tydligare - t ex kunde fetchByDate istället varit fetchBeforeOrOn för att användaren inte ska behöva fundera över om denne kommer att få ett nullvärde om man skickar in en icke-bankdag. Och count kunde istället ha varit observations eller days, dvs RateFetcher.fetchBeforeOrOn(date, days = 1).</td>
</tr>

<tr>
<td>4</td>
<td>TypeChecker.isPrimitive(value)</td>
<td>Metod som kontrollerar om ett värde är primitivt</td>
<td>Följer regeln om att metoder som returnerar boolean (predicates) ska börja med is. Metodnamnet i kombination med namnet på argumentet förklarar tydligt syftet med metoden</td></tr>

<tr>
<td>5</td>
<td>RateFetcher.fetchByPeriod(startDate, endDate)</td>
<td>Metod som hämtar valutakurser under en period (från och med startDate, tom endDate).</td>
<td>Denna metod följer regeln what, why and how. What - hämtar valutakurser under en period; why - metoden finns för att hämta valutakurser mellan två datum; how - för att hämta valutakurser från period behöver användaren skicka in ett startdatum och ett slutdatum. Därtill är startDate och endDate mer beskrivande än om argumenten skulle hetat date1 och date2.</td>
</tr>

<tr>
<td>6</td>
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

<tr>
<td>7</td>
<td>CurrencyConverter.clear()</td>
<td>Denna metod rensar CurrencyConverterns state från tidigare satta värden.</td>
<td>Denna metod svarar tydligt på why, what och how. Möjligtvis hade den kunnat döpas om till reset() för ett mer vedertaget uttryck men clear används också ofta och funkar därför bra i sammanhanget. Däremot skulle reset underlätta att i framtiden kanske ha förinställda defaultvärden istället för tomma attribut, utan att metodnamnet riskerar att bli missvisande.</td>
</tr>

<tr>
<td>8</td>
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

Författaren nämner att man inte ska prefixa variabler och tar upp som exempel att IShareFactory bör bara heta Shapefactory. Jag håller med i det exemplet, men kan också komma på ett fall där jag personligen tycker att prefixning är nödvändig - och det är när man skapar vyer i SQL kod. Min erfarenhet är att man från och till vill se om en tabell är en vanlig table eller view och det är till stor hjälp att det framgår att det är en vy av tabellens namn med hjälp av v_ prefixet, så att man inte behöver leta i koden hur tabellen har skapats.  

Något som boken nämner som var helt nytt för mig var regeln vid overloading av konstruktorn i Java och att man bör använda statiskt metod för det som har ett namn som förklarar funktionsrgumenten, t ex ```Complex.FromRealNumber(23.0)```
istället för ```new Complex(23.0)``` . Detta var helt nytt för mig då det inte är så vi lärt oss att jobba i Java-kursen förra terminen, men låter å andra sidan rimligt ur läsbarhets perspektiv.  

En annan sak som jag inte tänkt på tidigare som författaren nämner är att variabelnamn behöver innehålla why (varför den finns), what (vad den gör) och how (hur den används). Jag förstår bokens exempel och vad som menas, men känner ändå inte att jag kan säga att jag behärskar detta fullt ut i praktiken. Om vi tar exemplet med stopAndDelete() igen så är ju why - för att stoppa och radera, what är - stoppar och raderar och how är att det ska anropas om man vill göra båda. Men hur ska man tänka med motsvarande kill()? Stoppar den bara eller stoppar och raderar - det kanske är självklart för en van programmerate men inte helt tydligt för en nybörjare?



## Funktioner

### Tabellreflektion för funktioner/metoder

<table>

<tr>
<th></th>
<th>Metodnamn</th><th>Länk eller kod</th><th>Antal rader (ej ws)</th><th>Reflektion</th></tr>

<tr>
<td>1</td>
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
</code></pre>
</td>
<td>11</td>
<td>Denna metod bryter mot regeln om att alla subfunktioner i en funtion ska vara på samma abstraktionsnivå.  

#isReady() är på en väldigt hög abstraktionsnivå och säger inte mycket alls om vad som krävs för att CurrencyConverter ska vara redo.
Setterna är däremot på en låg abstraktionsnivå och talar om exakt vad som görs. fetchLatest ligger på en mellannivå. Därtill bryter submetoden #isReady()  mot namngivningsregeln att metoder som börjar på is, has och can ska returnera ett boolean värde. Denna metod kastar däremot ett fel om CurrencyConverter inte är redo och bör därför heta något i stil med #assertReady().  
För att korrigera koden så att submetoderna håller samma abstraktionsnivå-regeln kan man bryta ut alla assignments av currencies till normalizer respektive fetcher till en metod, CurrencyConverter.#assignCurrencies(). Och bryta ut fetchLatest() och normalize() till ytterligare en metod CurrencyConverter.#fetchAndNormalize() så att metoderna istället blir:

<pre><code>
/**
* Prepares the converter by fetching and normalizing rates.
*
* @returns {Promise<void>} - A promise that resolves when preparation is complete.
*/
async #prep () {
    if (this.#normalizer.hasCachedRates()) {
        return
    }

    this.#assertReady()
    this.#assignCurrencies()
    await this.#fetchAndNormalize()
}


/**
 * Assigns currencies to the fetcher and the normalizer.
 */
#assignCurrencies() {
    this.#fetcher.setCurrencies([this.#fromCurrency, ...this.#toCurrencies])  
    this.#normalizer.setFromCurrency(this.#fromCurrency)
    this.#normalizer.setToCurrencies(this.#toCurrencies)
}

/**
 * Fetches and normalizes exchange rates
 * from the external API.
 */
async #fetchAndNormalize() {
  const rates = await this.#fetcher.fetchLatest()
  this.#normalizer.normalize(rates)
}

</code></pre>
.

Efter denna ändring skulle metoden följa både regeln om samma abstratkionsnivå och regeln om att koden ska kunna läsas uppifrån och ner på ett logiskt sett.
</td>
</tr>

<tr>
<td>2</td>
<td>DeepCloner.clone()</td>
<td>
<pre>
<code>
  /**
   * Deep clones any object or array and its nested elements.
   * Custom classes are converted to plain objects.
   *
   * @param {any} any - The value to clone.
   * @returns {any} - The cloned value.
   */
  clone (any) {
    if (this.#typeChecker.isPrimitive(any) || this.#typeChecker.isFunction(any)) {
      return any
    }

    if (this.#typeChecker.isDate(any)) {
      return this.#cloneDate(any)
    }

    if (this.#typeChecker.isSet(any)) {
      return this.#cloneSet(any)
    }

    if (this.#typeChecker.isMap(any)) {
      return this.#cloneMap(any)
    }


    return this.#typeChecker.isArray(any) ? this.#cloneArr(any) : this.#cloneObj(any)
  }

</code>
</pre>
</td>
<td>14</td>
<td>Metoden följer regeln om att bara göra en sak. Den gör en deep clone av värdet som skickas in. Det är en annan klass, TypeChecker som ansvarar för att kontrollera typen av värde. Separata privata/undermetoder hanterar olika typer av kloningar beroende på datatyp. Alla undermetoderna följer också regeln om att vara på samma nivå, vilket gör metoden enkel att göra trots att metoden i sig har en hög komplexitet (manuellt uppskattad till 7 (10 brukar räknas som högt). Metoden bryter mot regeln om att undvika många if-satser, men i detta fall tycker jag nog att metoden ändå är enkel att läsa och följa, och kan inte heller komma på något bättre sätt att bryta ner detta.  

Det som kanske hade kunnat göra metoden ännu enklare att läsa är att ändra sista ternary statement:

<code><pre>
return this.#typeChecker.isArray(any) ? this.#cloneArr(any) : this.#cloneObj(any)

</code></pre>

till 

<code><pre>

if (this.#typeChecker.isArray(any)) {
  return this.#cloneArr(any)
}

return this.#cloneObj(any)

</code></pre>

och på så sätt hålla samma "stil" genom hela metoden

</td>
</tr>




<tr>
<td>3</td>
<td>DataFormatter.#rearrange()</td>
<td>
<pre><code>
  /**
   * Rearrange the data into a more usable structure.
   */
  #rearrange () {
    for (let currencyIndex = 0; currencyIndex < this.#rateCount; currencyIndex++) {
      const currency = this.#helper.getCurrency(currencyIndex)

      this.#formatted[currency] = this.#helper.formatOneCurrency(currencyIndex)
    }
  }
</code></pre>
</td>
<td>6</td>
<td>Just denna metod är kanske inte så lång, men den bryter ändå mot regeln om att ett block endast bör innehålla en rad med kod. Egentligen skulle allt inom for-blocket kunna plockas ut till en separat privat metod som tar currencyIndex som argument och uppdaterar #formatted-attributet, för att hålla funktionen kort och läsbar samt för att följa stepdown-principen. </td>
</tr>


<tr>
<td>4</td>
<td>FormatHelper.#mergeAndNormalize()</td>
<td>
<pre><code>
  /**
   * Merges and normalizes the data for a specific rate.
   *
   * @returns {object} - merged and normalized data for the currency rate
   */
  #mergeAndNormalize () {
    const formatted = {}
    const multiplier = this.#getMultiplier()

    for (const dateIndex in this.#dates) {
      const rateValue = Number(this.#currentRate.observations[dateIndex][0])
      formatted[this.#dates[dateIndex]] = Number((rateValue / multiplier).toFixed(4))
    }

    return formatted
  }
</code></pre>
</td>
<td>9</td>
<td>Metoden bryter mot reglerna att blocket inom loop bara ska ha en rad samt om att det ska vara samma abstraktionsnivå på alla delar eftersom getMultiplier har en högre abstraktionsnivå än det detaljerade uttrycket Number((rateValue/multiplier).toFixed(4)). Det senare hade exempelvis kunnat brytas ut till submetod #normalize(value, multiplier). Detta skulle förstås bryta mot regeln om att en metod helst inte ska ha två argument men jag tycker nog inte att det skulle försvåra läsbarheten eftersom det syftet ändå framgår så tydligt ur metodnamnet och argumentnamnen.  

 Konstanten formatted bryter även mot regeln mot konsekvent namngivning (detta hör dock till kapitel 2) eftersom det hade varit tydligare om den hette normalized.  

Däremot följer metoden regel om att den gör en sak - den bygger ihop ett nytt objekt, sammansatt av normaliserade värden, och att metoden även är enkel att läsa uppifrån och ned. Metoden har även låg komplexitetsnivå - den är kort och har ett enda indrag (for-loopen).</td>
</tr>

<tr>
<td>5</td>
<td>RateNormalizer.normalize(rates)</td>
<td><pre><code>
  /**
   * Normalizes the fetched exchange rates.
   *
   * @param {object} rates - The fetched exchange rates.
   */
  normalize (rates) {
    const fromRate = Object.values(rates[this.#fromCurrency])[0]
    const normalized = {}

    for (const toCurrency of this.#toCurrencies) {
      const toRate = toCurrency === 'NOK' ? 1 : Object.values(rates[toCurrency])[0]

      normalized[toCurrency] = round(toRate / fromRate, 4)
    }
    this.#normalizedRates = normalized
  }
</code></pre></td>
<td>8</td>
<td>Denna metod följer regeln om beskrivande namn. Valutakurserna som hämtas från APIet är på formen 1 LCY = XX NOK. För att kunna konvertera ett belopp från annan basvaluta än NOK behöver valutakurserna normeras i förhållande till basvalutan. Så RateNormalizer.normalize(rates) gör precis det som namnet säger och normerar kurserna.  En annan regel som följs är att metoden bara ska göra en sak - den skapar ett nytt objekt med normerade valutakurser. Metoden har även låg komplexitet eftersom den bara har en indentering (även om ternary statement i praktiken lägger till +1 på komplexiteten) och är lätt att följa uppfrån och ned. Man skulle också kunna hävda att metoden följer regeln kring abstraktionsnivå eftersom den egentligen inte innehåller några abstraktioner så att allt är på samma nivå - men det i sig är väl egentligen ingen fördel, det hade ju varit bättre att bryta ut delar till just abstraktioner.  

Den regel som bryts även i denna metod är att if-blocket bara ska innehålla en rad. Ternary statementen hade absolut kunnat brytas ut till egen metod <code>getRateForCurrency(currency)</code></td>
</tr>

</table>

### Kapitelreflektion kap 3

Författaren menar att regel nummer ett är att funktioner ska vara små, vilket jag håller helt med om. I tidigare kurser har jag arbetat med verktyget Scrutinizer som bland annat beräknar komplexitet för varje klass och metod. Där ökar varje inre block (if/for/while osv.) komplexiteten med +1. Jag är därför redan van att försöka bryta ut nästlade strukturer till egna funktioner för att hålla nere komplexiteten.  
  
Något som däremot var nytt för mig var regeln om att innehållet i ett block egentligen bara bör vara en rad. Vid första anblick låter det kanske överdrivet, men när man ser fördelen med att sammanfatta blockets innehåll till ett beskrivande metodnamn blir koden direkt mer lättläst. Tidigare har jag bara brutit ut innehållet i block om det i sig var en loop eller ett större if-block. Det som jag upplever som svårt med regeln är att man ibland måste definiera en variabel utanför för att kunna skicka den vidare till den extraherade metoden, och då blir det ändå två rader i blocket.  

Det som förvånade mig mest i kapitlet var dock regeln om att ju färre argument en metod har, desto bättre. Jag har tidigare lärt mig att det är bättre att skicka in argument än att ha värden som attribut i klassen, eftersom det annars kan bli svårare att enhetstesta. I bokens exempel blir metoderna visserligen mer läsbara när argumenten minskas, men i praktiken, när jag arbetade med denna uppgift,  upplevde jag ofta motsatsen. Det gjorde metoderna mer svårbegripliga och ökade beroendet av att andra steg redan hade körts.
  
Ett konkret exempel är dessa två metoder:  

```
  /**
   * Gets the multiplier for the current exchange rate's value.
   *
   * @returns {number|undefined} - The multiplier value or undefined if not found
   */
  #getMultiplier () {
    for (const attrIndex in this.#currentRate.attributes) {
      this.#currentAttr = this.#attributes[attrIndex]

      if (this.#isMultiplierIndex()) {
        return this.#calculateDenominator(attrIndex)
      }
    }

    throw new Error('UNIT_MULT attribute missing')
  }

  **
   * Checks if the current attribute is a multiplier index.
   *
   * @returns {boolean} - true if the current attribute is UNIT_MULT
   */
  #isMultiplierIndex () {
    return this.#currentAttr.id === 'UNIT_MULT'
  }
  ```

Här hade jag hellre skickat in this.#attributes[attrIndex] som argument till #isMultiplierIndex() för att det direkt skulle framgå vad som kontrolleras. Som det är nu måste man läsa in även i #isMultiplierIndex() för att förstå att det handlar om just attributet. Boken förespråkar dock att undvika argument helt om möjligt, och därför valde jag motvilligt att sätta värdet på ett attribut i stället. Kanske hade jag upplevt fler fördelar med att ha variabler som attribut i stället för som funktionsparametrar om jag varit ännu mer konsekvent med tydliga namngivningsregler.  

Ett område där jag däremot såg tydlig nytta av ”en-arguments-regeln” var i konstruktorn. Där har jag använt dependency injection genom att skicka in ett dependencies-objekt (det som författaren benämner som argument objects). Detta objekt kan innehålla ett valfritt antal beroenden, och det går enkelt att lägga till fler vid refaktorisering. Att injicera beroenden på detta sätt, i stället för att skapa instanser direkt i klassen, gör det också betydligt enklare att mocka i tester. På så sätt blir det lättare att testa delar av koden i isolation och samtidigt säkerställa förväntade utgångspunkter.  

Överlag upplever jag dock att det ibland är svårt att följa reglerna eftersom de till viss del kan motsäga varandra. Ett exempel är motsättningen mellan regeln om att minimera antalet argument och regeln om att metoder ska vara lätta att förstå. I fallet med #isMultiplierIndex() hade det faktiskt varit mer begripligt att skicka in värdet som ska kontrolleras som argument, i stället för att metoden ska förlita sig på att ett attribut satts tidigare. Här blir det tydligt att man måste väga läsbarhet mot strikt regeluppföljning och hitta en balans i praktiken.  

Författaren lyfter regeln att man hellre ska använda exceptions än att returnera felkoder (error codes). Jag har nog aldrig sett en metod som returnerar en delkod i praktiken, förutom i bash-script där program avslutas med en siffra, så jag kan inte riktigt relatera till det. Det jag däremot saknade i kapitlet var en jämförelse mellan exceptions (eller rättare sagt try/catch) och if/else-hantering, dvs de två etablerade strategierna LBYL (Look Before You Leap) och AFTP (Easier to Ask for Forgiveness Than Permission). Om man läser i forum på nätet så hävdar vissa att exceptions är dyra, och därför bör man använda if/else där man kan. Andra menar att exception inte alls är dyra och att när det kommer till läsbarhet så signalerar if/else att man förväntar sig att fallet kan inträffa regelbundet. Ett throw signalerar däremot en anomalitet. Därtill att om det är ett extra if block som körs många gånger så blir den totala kostnaden kanske ändå större jämfört mot ett catch block som skulle ha exekverats någon enstaka gång. Ur ett clean code-perspektiv hade det därför varit intressant att få författarens syn på hur man ska resonera kring när man bör välja respektive strategi.  



## Reflektion över egen kodkvalitet  

Jag hade hunnit läsa relevanta kapitel i boken innan jag satte igång, och försökte därför redan från början arbeta aktivt med kodkvaliteten, framför allt när det gäller namngivning och utformning av funktioner (metoder). Trots detta upptäckte jag, i samband med att jag skrev reflektionstabellen, att jag hade brutit mot flera av reglerna, även sådana som jag trodde att jag följde.  
  
De flesta misstag återfanns i lokala block och privata metoder. På ett sätt är det positivt, eftersom dessa är enklare att justera i efterhand jämfört med det publika scopet. En nackdel med att ändra kod i efterhand är normalt sett risken att behöva uppdatera många testfall. Här ser jag en tydlig fördel med att de testramverk jag hittills arbetat med inte tillåter testning eller mockning av privata metode - det ger frihet att döpa om och skriva om privata metoder utan att testsuiten påverkas, så länge de publika metodernas in- och utdata förblir oförändrade. På så sätt kan man fortsätta arbeta med läsbarhet, namngivning och intern refaktorering utan att riskera merarbete i form av trasiga tester.  
  
Samtidigt fick jag en tydlig insikt i att det är mer utmanande än man först tror att skriva clean code i praktiken. Man tänker att man har läst och förstått reglerna, och mycket känns självklart - men det handlar om betydligt fler aspekter än att bara hålla funktioner korta (Small Functions) och undvika för många indenteringsnivåer, och det är många regler att hålla i huvudet samtidigt och väga mot varandra.  

Den regel jag upplevde som svårast att följa var att hålla allt som ligger direkt under en funktion på samma abstraktionsnivå (One Level of Abstraction per Function). Det räcker inte att enbart “packa” in kod i subfunktioner, utan även namnen och ansvaret hos dessa subfunktioner måste ligga på samma nivå. Ett konkret exempel är att en metod som setCurrency inte bör blandas med en metod som assertReady, eftersom de representerar väldigt olika nivåer av abstraktion. Att avgöra vad som är samma abstraktionsnivå när det kommer till funktioner är inte alltid så självklart, särskilt under tidspress. Vid den retroaktiva genomgången, i samband med att jag satte ihop reflektionstabellerna, var det något enklare att identifiera brister, eftersom jag då kunde “zooma ut” och läsa koden mer som en utomstående. Det gjorde det lättare att se att något var fel, men inte alltid lika lätt att komma på hur det borde ha gjorts annorlunda, framförallt när det kommer till namngivning (Descriptive Names), som ju är en av faktorerna som påverkar läsbarhet.  

En regel som jag inte är övertygad att jag håller med om är Structured Programming - att det bara ska finnas en return i en funktion, och att det inte ska finnas break eller continue i loopar. Jag har svårt att se framför mig hur det är tänkt att fungera i praktiken och författaren tar inte heller upp något praktiskt konkret exempel på det. Men om jag tolkar författaren rätt så menar denne alltså att man inte ska avbryta loopen tidigt även om man har hittat det element man söker? Det känns ju inte helt optimalt i sorteringsalgoritmer t ex. Eller menar författaren att man gör en tidig return från loopen men om värdet inte hittas så returneras inget alls? För att om jag åter tar upp Scrutinizer verktyget som exempel så brukar det påpeka att om man har en tidig return och inte returnerar något i det fall loopen loopar färdigt (i praktiken undefined) så bör man ändå explicit skriva ```return underfined```. Alternativet är ju att kasta en exception efter loopen, men ska man verkligen kasta ett exception om det förväntas hända ofta?  

Men det fanns iallafall ett par regel som jag var bekant med sedan tidigare och tycker att jag är rätt bra på att följa redan:  

1. Don’t Repeat Yourself (DRY). Jag tycker att jag snabbt känner igen upprepad kod och extraherar den till en utility-klass eller en funktion som sedan kan återanvändas av flera klasser. Däremot tvingar ESLint fram en del dokumentationsupprepning, där även självförklarande metoder kräver fullständig kommentar med både metodbeskrivning och specifikation av parametrar och returvärden. Det blir ofta överflödigt, t.ex. att setCurrencies() får en beskrivning som “Assigns a value to the currencies attribute” och därefter en parameterbeskrivning som i princip upprepar samma information.  

2. Avoid Side Effects respektive Output Arguments. Bokens författare varnar för att funktioner inte ska ha sidoeffekter, i synnerhet inte modifiera inparametrar eller yttre state, och att man ska undvika output-argument. När en inparameter varit en referenstyp har jag skapat och returnerat ett nytt objekt i stället för att mutera originalet. Dessutom har jag i de fall där delar av data behövde returneras från en klass, exempelvis i DataReader, gjort en DeepClone för att säkerställa att jag inte lämnar ut direkta referenser till originaldata. På så sätt minskar risken att någon annan del av koden oavsiktligt modifierar originalet.



