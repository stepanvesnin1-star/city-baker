export const categories = ['Все','Хлеб','Слойка','Десерты','Кофе','Сезон'];
export const products = [
 {id:'baguette',name:'Багет классический',slug:'baguette',description:'Хрустящая корка, мягкий мякиш, французская классика для завтрака.',price:140,cat:'Хлеб',icon:'🥖',badge:'Хит'},
 {id:'croissant',name:'Круассан с маслом',slug:'croissant',description:'Воздушная слоёная выпечка на сливочном масле.',price:220,cat:'Слойка',icon:'🥐',badge:'Хит'},
 {id:'coffee',name:'Капучино',slug:'coffee',description:'Плотный эспрессо и молочная пена. Хорошо с круассаном.',price:220,cat:'Кофе',icon:'☕'},
 {id:'muffin',name:'Маффин шоколадный',slug:'muffin',description:'Мягкий десерт с шоколадной крошкой.',price:160,cat:'Десерты',icon:'🧁'},
 {id:'rye',name:'Ржаной хлеб',slug:'rye',description:'Плотный ароматный хлеб на закваске.',price:320,cat:'Хлеб',icon:'🍞'},
 {id:'tart',name:'Тарт лимонный',slug:'tart',description:'Песочная основа, лимонный крем и лёгкая кислинка.',price:280,cat:'Десерты',icon:'🍋',badge:'Сезон'},
 {id:'cinnamon',name:'Синнабон',slug:'cinnamon',description:'Булочка с корицей и сливочной глазурью.',price:240,cat:'Слойка',icon:'🌀'},
 {id:'berry',name:'Слойка с ягодами',slug:'berry',description:'Тонкое тесто, ягоды и карамельная корочка.',price:260,cat:'Сезон',icon:'🫐'}
];
export const locations = [
 {id:'sadovaya',title:'Садовая-Спасская',address:'Садовая-Спасская ул., 21',metro:'м. Красные Ворота',hours:'06:00 – 22:00',phone:'+7 (495) 999-88-77',status:'Свободно'},
 {id:'arbat',title:'Арбатская',address:'Арбат ул., 14',metro:'м. Арбатская',hours:'06:00 – 23:00',phone:'+7 (495) 999-88-78',status:'Умеренно'},
 {id:'patriki',title:'Патриаршие',address:'Малая Бронная ул., 7',metro:'м. Маяковская',hours:'07:00 – 22:00',phone:'+7 (495) 999-88-79',status:'Час пик'}
];
export const posts = [
 {id:'morning',title:'Как мы печём к 6 утра',category:'Процесс',excerpt:'Маршрут теста от ночной расстойки до первой полки.',date:'18 мая 2026'},
 {id:'coffee',title:'Как подобрать кофе к выпечке',category:'Гид',excerpt:'Пары вкусов: круассан, тарт, ржаной хлеб и капучино.',date:'12 мая 2026'},
 {id:'city',title:'Городской завтрак без спешки',category:'Культура',excerpt:'Почему утро начинается не с дел, а с запаха хлеба.',date:'5 мая 2026'}
];
export const stats = [{label:'точки в городе',value:'12+'},{label:'изделий в день',value:'4 800'},{label:'утро начинается',value:'06:00'}];
