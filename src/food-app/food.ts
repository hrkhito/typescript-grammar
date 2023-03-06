import { Foodable } from "./interfaces";
import { Score } from "./score";

// 一つの食べ物のクラス
export class Food implements Foodable {
  constructor(public element: HTMLDivElement) {
    // bindメソッドに指定する第一引数はその関数に対してのthisになる (今回で言うと、thisを渡しているがそれはFoodクラスという意味になる)
    element.addEventListener('click', this.clickEventHandler.bind(this));
  }
  clickEventHandler() {
    // コールバック関数として呼ばれた関数内のthisは正しいthisではなくなる (今回で言うと、thisはFoodクラスそのものを指し示すのではなくelementを表すことになる)
    this.element.classList.toggle('food--active');
    const score = Score.getInstance();
    score.render();
  }
}