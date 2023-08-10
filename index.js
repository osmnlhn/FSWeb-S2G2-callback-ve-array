const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

//(e) 2014 Dünya kupası finali kazananı*/

function final1(arr, year) {
	const newArr = arr.filter((el) => {
		return el["Stage"] === "Final"
	}).filter(obj => {
		return obj["Year"] === year
	})
	console.log(newArr[0]["Home Team Name"]);
	console.log(newArr[0]["Away Team Name"]);
	console.log(newArr[0]["Home Team Goals"]);
	console.log(newArr[0]["Away Team Goals"]);
	console.log(newArr[0]["Win conditions"]);

}

final1(fifaData, 2014)


// let new_dizi=[]
// for (let i = 0; i < arr.length; i++) {
// 	if (arr[i].includes("Final")) {
// 		new_dizi.push(arr[i])





/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(arr) {
	const newArr = arr.filter( item=>item.Stage === "Final")
	
	return newArr
}
console.log(Finaller(fifaData))


/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(array, callback) {
	const finaller = callback(array)
	let years = []
	for (let i = 0; i < finaller.length; i++) {
		const element = finaller[i];
		years.push(element.Year)
	}

	
	return years
}
console.log(Yillar(fifaData, Finaller));



/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(array, callback) {
	let kazananlar = callback(array);
	let winner = [];
	for (let index = 0; index < kazananlar.length; index++) {
		const kazanan = kazananlar[index]
		if (kazanan['Home Team Goals'] !== kazanan['Away Team Goals']) {
			if (kazanan['Home Team Goals'] > kazanan['Away Team Goals']) {
				winner.push(kazanan['Home Team Name'])
			} else {
				winner.push(kazanan['Away Team Name'])
			}
		} else {
			winner.push(kazanan["Win conditions"].split(' ')[0] )
		  }

	}
	
	return winner;
}

console.log(Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(array, cb1, cb2, cb3) {
	let final = cb1(array);
	let yil = cb2(array, cb1);
	let kazan = cb3(array, cb1);
	let result = [];
	for (let index = 0; index < final.length; index++) {
		const element = yil[index] + " yılında, " + kazan[index] + " dünya kupasını kazandı!"
	
		result.push(element);

	}return result

}
console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar))


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(array) {

	// let totalGoals=final.reduce((acc,item)=> {
	// return acc+item['Home Team Goals']+item['Away Team Goals']
	
	// },0)
	// return (totalGoals/final.length).toFixed(2)

	
	let toplamgoller = []

	for (let index = 0; index < array.length; index++) {
		const element = array[index];
		const toplamgol = element['Home Team Goals'] + element['Away Team Goals']

		toplamgoller.push(toplamgol);
	}
	
	const ortGoller = (toplamgoller.reduce((a, b) => a+b))
	const sonuc=ortGoller/toplamgoller.length
	console.log(sonuc);

	return sonuc.toFixed(2)

	

}

console.log(OrtalamaGolSayisi(Finaller(fifaData)));

	



/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {

	/* kodlar buraya */

}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {

	/* kodlar buraya */

}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {

	/* kodlar buraya */

}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
	console.log('Kodlar çalışıyor');
	return 'as';
}
sa();
module.exports = {
	sa,
	Finaller,
	Yillar,
	Kazananlar,
	YillaraGoreKazananlar,
	OrtalamaGolSayisi
}
