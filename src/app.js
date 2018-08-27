import $ from 'jquery';
import Rx, { ReplaySubject } from 'rxjs/Rx';

// Observable from events

// const btn = $('#btn');
// const input = $('#input')
// const output = $('#output')

// // colocar un $ al final de la funcion para reconocer los observable facilmente

// const a = $('#btn').click(
//   a => {
//     return('hola')
//   }).promise()

// //   function llamado(){
// //     a.then(a => alert(a.next()))
// //   } 
// //   llamado()

// actividad 1

const btnStream$ = Rx.Observable.fromEvent(btn, 'click'); // crear el evento

// // btn.js
btnStream$.subscribe(
  value => {
    alert('clicked');
  }, err => console.log(err), completed => console.log(completed)
);

// // btn2.js
btnStream$.subscribe(
  value => alert('clicked again')
)



// Actividad 2

// const posts = [
//   {title: 'Post one', body: 'this is the body'},
//   {title: 'Post two', body: 'this is the body'},
//   {title: 'Post three', body: 'this is the body'},
// ]
// const posts$ = Rx.Observable.from(posts)
// posts$.subscribe(
//   post => {
//     console.log(post)
//     $('#posts').append('<li><h3>'+post.title+'</h3><p>'+post.body+'</p></li>')
//   }, err => console.log(err), completed => console.log("complete")
// )

// ----------------------------------------------------------------

// const set = new Set(['hello',44,{title: 'My title'}])

/*
const set$ = Rx.Observable.from(set)
set$.subscribe(
  post => {
    console.log(post)
  }, err => console.log(err), completed => console.log("complete")
)


const map = new Map([[1,2],[3,4],[5,6]])
const map$ = Rx.Observable.from(map)

map$.subscribe(
  m => {
    console.log(m)
  }, err => console.log(err), completed => console.log(completed)
)
*/

// Actividad 3

// Observables from scratch

// const source$ = new Rx.Observable(
//   observer => {
//     console.log('creating observable')
//     observer.next('hello world')
//     observer.next('another value')

//     observer.error(new Error('Error: something went wrong'))

//     setTimeout( a => {
//       observer.next('yet another value')
//       observer.complete()
//     }, 3000)
//   }
// )
// source$
// .catch(err => Rx.Observable.of(err))
// .subscribe(
//   x => {
//     console.log(x)
//   }, err => console.log(err), completed => console.log('completed')
// )


// Observable from a promise
/*
const myPromise = new Promise((resolve, reject) => {
  console.log('creating promise')
  setTimeout(() => {
    resolve('hello from promise')
  }, 3000)
})
*/

// myPromise.then(x => {
//   console.log(x)
// })


// Map

// Actividad 4


// const source$ = Rx.Observable.interval(1000)
//   .take(10)
//   .map( v => v*v)

// source$.subscribe(
//   res => {
//     console.log('me imprimo cada 1 s')
//     console.log(res)
//   })
  

// const source$ = Rx.Observable.from(['name','tom','shown'])
//   .map(v => v.toUpperCase())
//   .map(v => 'I`m '+v)

// source$.subscribe(v => console.log(v))


  // pluck
/*
const users = [
  {name: 'will', age: 34},
  {name: 'mike', age: 33},
  {name: 'paul', age: 32}]
  
const users$ = Rx.Observable.from(users)
  .pluck('age')

users$.subscribe( age => {
  console.log(age)
})
*/

// Merge and concat
/*
Rx.Observable.of('hello')
  .merge(Rx.Observable.of('everyone'))
  .subscribe(x => console.log(x) )

Rx.Observable.interval(2000)
  .merge(Rx.Observable.interval(500))
  .take(25)
  .subscribe(x => console.log(x))

const source1$ = Rx.Observable.interval(2000).map(v => 'merge1: '+v)
const source2$ = Rx.Observable.interval(500).map(v => 'merge2: '+v)

Rx.Observable.merge(source1$, source2$)
  .take(25)
  .subscribe(x => console.log(x))
  */

// Actividad 5

// const source1$ = Rx.Observable.range(0,5).map(v => 'source1: '+v)
// const source2$ = Rx.Observable.range(6,5).map(v => 'source2: '+v)

// Rx.Observable.concat(source1$, source2$)
//   .subscribe(x => console.log(x))



const apikey = 'AIzaSyAIAczMbpd8SmfhnAuHra2niRVT97q0zek'

function getMap(input) {
  return $.ajax({
    url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+input+'&types=(cities)&language=es&key='+apikey,
    dataType: 'json'
  }).promise()
}
const inputSource$ = Rx.Observable.fromEvent($('#google-search'),'keyup')
  .map(e => e.target.value)
  .switchMap( v => {
    return Rx.Observable.fromPromise(getMap(v))
  })
  // ejemplo.js
inputSource$.subscribe(
  response => {
    response.predictions.map(
      a => {
        $('#search').text(a.description)
        $('#city').text(a.terms[0].value)
      })
  },error => console.log(error))

  // ejemplo1.js
inputSource$.subscribe(
  word => {
    word.predictions.map(
      a => $('#state').text(a.terms[1].value)
    )
  }
)
// ejemplo2.js
inputSource$.subscribe(
  word => {
    const value = $('#google-search')[0].value
    $('#search-word').text(value)
  }
)
