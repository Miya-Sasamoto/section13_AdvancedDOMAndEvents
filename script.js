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

document.documentElement.style.setProperty('--color-primary','orangered');
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
