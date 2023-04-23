　'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
//btn--show-modalクラスは、上と下2つある「アカウントを作りませんか？」のボタン。

const openModal = function (e) {
  e.preventDefault(); //ここでpreventDeafaultにするわけは、htmlでここがhref=#になっているため、クリックすると自動的に上にスクロールされるのを防ぐため。
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//もともと書いてあったbtnOpenModalの文をforEachループに置き換えて書き換え。
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
//
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


/////////////////////////////////////////////////////
//185 How the DOM Really Works
//座学メモ
//DOMとはjsとブラウザーの間にあるインターフェースのこと
//できることはたくさんあルガ
//・要素の作成,変更,削除
//・スタイル、クラス、属性の設定
//・イベントを監視して応答することができる
//querySelectorAll()とかaddEventListener()とかもだよ

//nodeの下に
//element,text,comment,documentがあって、
//またその下にhtml elementとかがある
//とっっっっっても重要なのは、上から下に「継承」と言う形で受け継がれること
//
//「継承」とは、すべての子ノードタイプが、すべての親ノードタイプのメソッド、プロパティにアクセスできるようになること


/////////////////////////////////////////////////////
//186..Selecting, Creating, and Deleting Elements
//要素の選択の仕方
console.log(document.documentElement);
//これでdocument（html）要素を引っ張り出してくることができる
console.log(document.head);
//これでdocument（html）要素のhead部分を持って来れる
console.log(document.body);
//これでdocument（html）要素のbody部分を持って来れる

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections);
//querySelectorAllはその指定したクラスを持っているものすべてを選択する。

document.getElementById("section--1");
//このID名に一致するidを選ぶ。名前にIDが入っているから#はいらない
const allButtons =  document.getElementsByTagName("button");
console.log(allButtons);
//これですべてのボタン要素を取り出す
console.log(document.getElementsByClassName("btn"));
//クラス名にbtnが入っているものは選択

//要素の作成と挿入について
const message = document.createElement("div");//div要素を作る
message.classList.add("cookie-message");//そのdivのクラス名はcookie-messageにします
// message.textContent = "We use cookied for improved functionality and analytics.";
message.innerHTML =
'We use cookied for improved functionality and analytics. <button class="btn btn--close--cookie">Got it </button>';
//そのcookie-messageクラスには、上記のように書く
//エラーがあって解消に時間がかかった、、、
//innerHTMLの時は、ごっちゃになるから''と""は分けるようにしよう

// header.prepend(message);
///headerにmessageを追加する
//prependはその選択された要素の最初の子として要素を追加する
//この場合はheaderの一番最初に追加をするような感じ、
// header.append(message);
//その要素の一番最後に挿入する
header.before(message);
//名前の通り、headerよりも前におく
// header.after(message);
//headerの後におく

//要素の削除の仕方
//さっき作ったcookieのところにあるボタンをクリックしたら消えるようにしましょう。
document.querySelector(".btn--close--cookie")
.addEventListener("click",function(){
  message.remove(); //このremoveで消すことができます
  //実はこのremove()は割と新しい概念で、これができるまでDOMトラバースでparentnodeに行ってそのchildnodeを消すみたいなアップダウンをしていた
});
//これでボタンを押すと消えます。

/////////////////////////////////////////////////////
//187.Styles, Attributes and Classes
message.style.backgroundColor = "#373834"; //濃いめのグレーみたい
message.style.width = "120%";

console.log(message.style.height); //実はこれでは、値を取得することができ前ん。
//なぜなら、ここで手動で行うことはインラインスタイルであるためです。はにゃ？
//もし本当に必要であれば、このようにして値を取ることができます。
console.log(getComputedStyle(message));//引数に値を渡してこれですべての情報を取ることができます、
console.log(getComputedStyle(message).color); //rgb(187, 187, 187)
console.log(getComputedStyle(message).height); //49px

message.style.height =
 Number.parseFloat(getComputedStyle(message).height,10) + 50 + "px";

// document.documentElement.style.setProperty('--color-primary','orangered');
//--color-primaryを使っている数カ所がorangeredになる

//attribute 属性
//クラスとかIDとかね
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);//Bankist logo
console.log(logo.src); //写真のURLがでる
//実はこの写真のURLはhtmlに書いてあるURLと違う。相対的なものになります。
console.log(logo.getAttribute('src'));
//htmlファイルに書いてある通りのURLが欲しい場合は、getAttributeを書くといいです。
console.log(logo.className); //nav__logo単純にクラス名
//logoと言う変数を作り、それはnav__logoクラスがついているものになる。
//それのalt属性とsrc属性をここで表示させる　
//しかしこれはalrとかsrcとか普通に考えて普通に使われる属性なら出てきますが、変なdesighnerとか新しい属性を作ったとしてもそれは表示されませんよ。非標準だからですよ！
console.log(logo.getAttribute('designer'));
//さっきの非標準のやつを洗わせる方ほはないのだろうか、、これです。

logo.alt = 'Beautiful minimalist logo';
//これでalt属性の名前を変えることができるよーん
logo.setAttribute('company','Bankist');
///これでcompany属性の"Bankist"と言うものを作り出せました。

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));
//このtwitterの二つはあまり変わりませんでした。

//データ属性
//データと言う言葉で始まる、特別な種類の属性です
console.log(logo.dataset.versionNumber); //3.0
//data-version-number="3.0" と言うのを書いたので、
//dataを除いたその後のversion-numberをキャメルケースにして書くとデータ取得できる

//クラス属性
// logo.classList.add()
// logo.classList.remove()
// logo.classList.toggle()
// logo.classList.contains()

logo.className = "Miya";
 ///クラス名がmiyaになりました！　
//しかしこれは絶対に使わないでください！なぜなら既存のクラスを上書きしてしまうからです。

/////////////////////////////////////////////////////
//188.Implementing Smooth Scrolling
//
const btnScrollTo = document.querySelector(".btn--scroll-to");
//ボタンを選択
const section1 = document.querySelector("#section--1");
//ボタンを押したときの移動先

btnScrollTo.addEventListener("click",function(e){
  const s1coords = section1.getBoundingClientRect();
  //getBoundingClientRect()はその要素の寸法、及び相対位置に関する情報を返す
  // console.log(s1coords);
  //
  // console.log(e.target.getBoundingClientRect());

  console.log("Current Scroll (X/Y)",window.pageXOffset,pageYOffset);
  //これはページがどれだけスクロールされているかを知ることができる。
  //ページの一番上だったら、x/y は0/0になる
  //今は全然わかりませんが、これが、ある種のアプリケーションだと、非常に重要になります。
  console.log("heigth/width viewport",
  document.documentElement.clientHeight,
  document.documentElement.clientWidth
);
//これはビューポートの大きさを知ることができます。
//そしてビューポートとは、そこの画面の大きさです。
//chromeの検証ページを大きくしたらビューポートは小さくなります。

//スクロール
// window.scrollTo(s1coords.left,s1coords.top);
//これだと、s1coordsの一番先頭に、ボタンを押すと、ふいっと移動する（アニメーション話）
//(ボタンをクリックするのは、ページの一番先頭まで戻してから)
//section1は#section--1です（ID)
//しかしこのままでは、2回目にそのボタンをクリックすると、全然違うところになります。
//理由は、この第二引数にあるs1coords.topの指定場所pxはあくまでも相対的であり、いつまでもその場所というわけではないからです
//↓改善策　
// window.scrollTo(
//   s1coords.left + window.pageXOffset,
//   s1coords.top + window.pageYOffset
// );
// //これでページのどこにいたとしてもそのボタンをクリックすればsection1の先頭に来るように書くことができました。

// window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior :'smooth'
//   //スーーって移動するよ。他にあるって思ったけどsmoothしかないみたい。
// });

//実は上記のスクロールのやり方は古いやり方です。
//これから新しいやり方を紹介します。

section1.scrollIntoView({behavior: "smooth"});
//実はこれだけで移動できます。

});


/////////////////////////////////////////////////////
//189.Types of Events and Event Handlers

//イベントを設定するのはいくつかの方法があります。
//１つ目。いつもやっているみたいな感じ
const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter',function(e){
//   alert("addEventLisener: Great! You are reading the hading :D");
//   //mouseenterはcssのhoverと少し似ている。マウスを上に置くだけで反応する。
// });
//
// //2つ目　　オンイベントプロパティを要素に直接使用するやり方
// h1.onmouseenter = function(e){
//   alert("onmouseenter: Great! You are reading the hading :D");
// };
//functionを書かなくても、これで先ほどと同じように反応します。
//しかし、これはやり方が古いので、addEventLisenerの方がよく使われていますよ。
//どうして addEventListenerの方が使われているかというと、
//①同じイベントに対して複数のイベントリスナーを追加できるから(単純に関数を変更したりすることができ)
//② イベントが必要なくなった時に、それを削除できるという点
//先程のやり方で実践してみました。
//まず、関数の部分を新しい変数を作ってそこに格納する。
const alertH1 = function(e){
  alert("addEventLisener: Great! You are reading the hading !!");
  // h1.removeEventListener('mouseenter',alertH1);
  ///removeEventListenerというのは、そのイベントを一回ポッキリで終わらせることができる。　
}
//イベントハンドラーのところに、第二引数として、先程作った変数を入れる
h1.addEventListener('mouseenter',alertH1);

setTimeout(() => h1.removeEventListener('mouseenter',alertH1),10000);
//setTimeoutを使えば、『何秒後に、そのイベントを消す』みたいなこともできます。
//この場合は10秒後です
//他に、htmlそのものを消す方法もあるが、使って欲しくないそうなので、見るだけにします。
