import translite, { convertTamilObjectToEnglish } from '@karthikeyan05046/tamil-transliterator'


const data = {
    name: "கார்த்தி",
    address: "சரவணா தெரு, கண்ணன் நகர், கோவை - 641002"
}

const result = convertTamilObjectToEnglish(data);

console.log(result);