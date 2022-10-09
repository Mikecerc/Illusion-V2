import translate from 'google-translate-api-x';

const res = await translate('Je Parle la Francais', {to: 'en'});

console.log(res.text); //=> I speak English
console.log(res.from.language.iso);  //=> nl