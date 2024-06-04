// export const blurhashes =
//   "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const blurhasheList = [
	"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[",
	"LEHLh[WB2yk8pyoJadR*.7kCMdnj",
	"LGF5?xYk^6#M@-5c,1J5@[or[Q6.",
	"L6PZfSi_.AyE_3t7t7R**0o#DgR4",
	"LKN]Rv%2Tw=w]~RBVZRi};RPxuwH",
	"LIB3qEB,9p+e0Jw0%7OUD~#pkEOU",
]

export const blurhashes = () => {
	const randomIndex = Math.floor(Math.random() * blurhasheList.length)
	return blurhasheList[randomIndex]
}
