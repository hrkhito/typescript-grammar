declare module 'lodash' {
  export function shuffle<T>(arr: T[]): T[]
}

interface Lodash {
  shuffle<T>(arr: T[]): T[]
}
declare const _: Lodash

// namespaceの使い方
// declare namespace _ {
//   function shuffle<T>(arr: T[]): T[]
// }

// declareというのは変数として使いたくはないが、変数としての見せかけを用意したい時に用いる

// declare globalを使ってプロジェクト全体で使える値や型を定義できる