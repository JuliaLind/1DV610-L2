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

1. Namn på variabel, funktion eller klass ska vara beskrivande och besvara varför den finns, vad den gör och hur den används. Om ett namn kräver en förtydligande kommentar så är det inte ett bra namn
2. Vid namngivning ska man undvika förkortningar som kan missuppfattas, att förkorta hypotenusa till hp ska exemeplvis leda till ihopblandning med Hewlett Packard. Man ska också undvika andra typer av namngivningar som kan leda till missförstånd, t ex att döpa en variabel till accountList om det inte faktiskt är en List.
3. Man ska undvika att använda namn som skiljer sig åt väldigt lite, t ex updateAccount() och updateAccounts().
4. Man ska undvika att inkludera typer i variabelnamn, t ex 
accountList  eftersom det gör det svårare att ändra typ efteråt (i fallet med accounts till annan typ av collection) utan att behöva ändra namnet. En annan anledning till att inte inkludera typer är när det inte tillför något, tex använda nameString istället för name eftersom ett namn normalt sett är av typen string.
5. Undvika att avvända tecken som kan misstas för andra tecken, t ex ett fristående litet l som kan misstas för en etta eller stort O som kan misstas för en nolla.
6. Man ska undvika att endast ha compilern i åtanke vid namngivning, t ex att "felstava" klass för att class är ett reserverat ord.
7. Undvika att använda vad bokförfattaren refererar till som "noise words" för att kunna använda samma namn för en andra variabel. t ex book och abook. Om två variabler behöver ha olika namn så ska namnen ha distinkt skillnad, t ex ska man inte döpa två variabler till money respektive moneyAmount eftersom det blir svårt för nästa utvecklare att förstå skillnaden mellan dessa.
8. Variabelnamn ska vara enkla att uttala.
9. Variabelnamn ska vara enkla att söka på, i den bemärkelsen att om jag gör en sökning på namnet i VSCode så ska bara den variabeln markeras på alla ställen, inte delar av andra ord. En-bokstavs variabler såsom "i" bör endast användas inom lokala block som for-i loopar. Namnet på en variabel bör vara proportionerligt med dess scope.
10. Man ska undvika enkodning i variabelnamn. T ex ska man inte prefixa medlemsvariabler (dvs attribut) med m_ eftersom klasser bör vara tillräckligt korta för att det ska framgå ändå. Man ska inte prefixa interface med I, tex IShapeFactory, utan den bör heta endast ShapeFactory. 
11. Klasser och objekt bör heta substantiv som Customer, Book, Account. Metodet bör vara verb och fraser som innehåller verb som purchaseBook(), edit(). Getters och setters bör heta get/set + namn på attributet den avser, tex getName(), setAge(). Metoder som returnerar boolean bör börja med is, t ex isActive().
12. När konstruktorn overloadas (ej relevant för javascript, men tex för java) bör man istället använda en statisk metod med namn som förklarar argumenten - t ex ```Complex.FromRealNumber(23.0)```
istället för ```new Complex(23.0)```
13. Man ska inte använda "interna" uttryck och skämt som namn, t ex ska inte kill() ersättas med whack()
14. vara konsekvent med namn, t ex ska man inte använda fetch för en klass och get för en annan klass om båda metoderna gör motsvarande saker, eller använda både controller och manager eftersom det blir otydligt vad skillnaden mellan de två är.
15. Samma ord ska inte användas för två olika koncept - t ex om add har använts för att skapa ett nytt värde genom att lägga ihop två befintliga så ska man inte använda add för att lägga till ett värde i en befintlig lista, utan då bör man i det senare fallet hellre använda append eller insert. Man ska tänka att det är den som skriver koden som har ansvar för att uttrycka sig tydligt, inte läsarens ansvar för att tolka tvetydligheter.
16. Kod som ligger närmare problemdomänet bör namnges med uttryck från problemdomänet, medan kod som ligger längre ifrån problem domänet bör ha namn relaterade till lösningsdomänet "Solution Domain" - t ex AccountVisitor, JobQueue.
17. Korta variabelnamn är att föredra framför långa, så länge som det är enkelt att förstå vad den avser. Man ska undvika onödiga prefixar. T ex så funkar namnen accountAddress och customerAddress för instanser av klassen Address, men passar inte som namn på klasser. En klass bör heta Address och om man exempelvis behöver ha separata klasser för  MAC address och webaddress är mer specifika namn som MAC och URI att föredra. Om kontext behövs för att tydliggöra att variabler tillhör samma grupp bör dessa grupperas ihop inom en klass.
 



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

