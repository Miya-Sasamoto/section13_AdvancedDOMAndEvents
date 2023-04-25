　'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
//btn--show-modalクラスは、上と下2つある「アカウントを作りませんか？」のボタン。
const btnScrollTo = document.querySelector(".btn--scroll-to");
//これは{Learn more}のボタン
const section1 = document.querySelector("#section--1");
const nav = document.querySelector('.nav');
//これは一番上部分のところ、全ての親部分にあたる。
const tabs = document.querySelectorAll('.operations__tab');
//operations__tab は３つのタブ切り替えボタンにそれぞれつけられている。
const tabsContainer = document.querySelector('.operations__tab-container');
//operations__tab-containerは3つのボタンの共通の親要素
const tabsContent = document.querySelectorAll('.operations__content');
//operations__contentは文字が書いてあるところ。

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

///セクション188で勉強したやつをここに移動してきました。
//コード説明のコメントが見たい場合は下のところを参照してください

btnScrollTo.addEventListener("click",function(e){
  const s1coords = section1.getBoundingClientRect();

  console.log("Current Scroll (X/Y)",window.pageXOffset,pageYOffset);
  console.log("heigth/width viewport",
  document.documentElement.clientHeight,
  document.documentElement.clientWidth
);
//スクロール

section1.scrollIntoView({behavior: "smooth"});
//実はこれだけで移動できます。

});

//ページナビゲーション
///192.Event Delegation: Implementing Page Navigation
// document.querySelectorAll('.nav__link').forEach(function(el){
//   //.nav__linkは三つありますからね。querySelectorAllです。
//   el.addEventListener('click',function(e){
//     //コールバック関数の中にコールバック関数がある
//     //多分だけど、querySelectorAllにはイベントリスナーは使えないから、それをforeachのループで回して、それの要素にイベントリスナーを追加してく感じになっているんだと思う。
//     e.preventDefault(); //実はこれを入れると、指定したURLまで動かなくなります。
//     console.log("Link Check!");
//
//     //smooothなスクロールにしましょう。
//     const id = this.getAttribute('href'); //getAttributeは指定された属性を返すんだよね。
//     console.log(id);
//
//     document.querySelector(id).scrollIntoView({behavior: "smooth"});
//     //こうやって、href属性を持たせてから、scrollIntoViewにするのは、navではよくある話です
//   });
// });
//まぁこのやり方でもいいんですが、あまり効率が良くないですよね？（byJonas)
//この場合は、要素が1つしかないですが、もしこれが10000とかあったらどうですか？

//1.イベントの対象となる共通の親要素に、イベントリスナーを追加
//2.その中でどの要素がイベントの鍵になったのかを判断
document.querySelector('.nav__links').addEventListener('click',function(e){//nav__linkが今回の3つのボタンの共通の親要素です
  // console.log(e.target);//これでイベントが発火した鍵を見つけられる　
  e.preventDefault();

//マッチングするかを見つける
  if(e.target.classList.contains('nav__link')){
    //これはclassListなので、引数に.はいらない！
      console.log('check links!!!!!!');
      const id = e.target.getAttribute('href');
      //外側にあるので、thisではなくe.targetです
      document.querySelector(id).scrollIntoView({behavior: "smooth"});
  }
});
//これでできました！大変！

//194.Building a Tabbed Component
//タブの切り替えができる


// tabs.forEach(t => t.addEventListener('click',() =>
//   console.log('TAB')
// ));
// //前回もやりましたが、この方法はあまり良くない方法です。

//親要素にイベントをつけます。
tabsContainer.addEventListener('click',function(e){
  //マッチングをここにつける
  // const clicked = e.target;
  // console.log(clicked);
  //実はこれだと、<span>とかもコンソールに出てしまう。
  //要素の中に要素があると、こんなことになります。
  //必要なのは、button要素だけです
  const clicked = e.target.closest('.operations__tab');
  //どうしてclosestかというと、一番近い.operations__tabを取得してくれるから。
  //そうなると、ここでは常にbuttonを選択してくれます。

  //以下、これは、ボタンじゃなくて親要素をクリックした場合、親要素である.operations__tabが見つからなくてnullになってエラーが出るため、
  if(!clicked)return;
  //クリックされなかったら(!だからね)、何も起きないようにここでガードする

  //目に見えているタブは、常に-activeがクラス名についてます。
  //ただ、目に見えているもの一つだけにactiveクラスがついていますので、一回全部bのactiveクラスを取り除いてから、クリックされたものに再度付けるオペレーションを取ります。
  // ---REMOVE CLASSES ---
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  //一回tabsの全てのクラスから、tab-activeをとる。
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  //下の文字が書いてあるところからもactiveクラスを取るようにここで書く

  clicked.classList.add('operations__tab--active');
  //押されたタブのクラスにこのoperations__content--activeをつける操作

  //どのコンテンツエリアを表示するかはdata属性に書かれてあります。
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
  //datasetはdataから始まる属性を一気に取得するやり方です。
  //data-tab="1"というように3つのタブそれぞれに書いてありますから、それを取得できるようにdataset.tabに書かれている数字、と描きます。
  //そしてそれにクラスにcontainer activeクラスを追加します。⇨container activeを付けるとhiddenが解ける
});

//Menuのところにホバーすると、他のところが色が薄くなっていくハンドラーを形成
// nav.addEventListener('mouseover',function(e){
//   if(e.target.classList.contains('nav__link')){
//     const link = e.target;
//     //linkはmouseoverした場所のnav_linkがあるところ
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     //navタブに一番近い.nav_linkのところ
//     const logo = link.closest('.nav').querySelector('img');
//     //これはnavタブに一番近いimgを選択（必然的にあのロゴになる）
//
//     //マウスオーバーしたところ以外のところが白く白濁するように。
//     siblings.forEach(el => {
//       if(el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });　
// //どうしてmouseenterではなくmouseoverかというと、mouseenterはバブルを発生させないので、伝搬しないんです。
// //ただこれだけだと、mouseoverしたっきりで元に戻らないので、mouseoutメソッドがあります。
// nav.addEventListener('mouseout',function(e){
//   if(e.target.classList.contains('nav__link')){
//     const link = e.target;
//     //linkはmouseoverした場所のnav_linkがあるところ
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     //navタブに一番近い.nav_linkのところ
//     const logo = link.closest('.nav').querySelector('img');
//     //これはnavタブに一番近いimgを選択（必然的にあのロゴになる）
//     //フォーカスが外れた後に元に戻るように
//     siblings.forEach(el => {
//       if(el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });　
//RE-WRIGHT
//それでは今のコードでは被りも多いので、書き直してみましょう
const handleHover = function(e,opacity){

  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    //linkはmouseoverした場所のnav_linkがあるところ
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    //navタブに一番近い.nav_linkのところ
    const logo = link.closest('.nav').querySelector('img');
    //これはnavタブに一番近いimgを選択（必然的にあのロゴになる）
    //フォーカスが外れた後に元に戻るように
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
    //そうです、、もうthisがopacityになりました。不可思議現象
  }
}

//カーソルを当てた時⇨opacityを0.5にする
nav.addEventListener('mouseover',handleHover.bind(0.5));
//bindは定義された関数に対して、thisを代入できるメソッドです。なのでこれはthisということになります。
//カーソルが外れた時⇨opacityを1に戻す
nav.addEventListener('mouseout',handleHover.bind(1));

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
// const btnScrollTo = document.querySelector(".btn--scroll-to");
// //ボタンを選択
// const section1 = document.querySelector("#section--1");
// //ボタンを押したときの移動先
//
// btnScrollTo.addEventListener("click",function(e){
//   const s1coords = section1.getBoundingClientRect();
//   //getBoundingClientRect()はその要素の寸法、及び相対位置に関する情報を返す
//   // console.log(s1coords);
//   //
//   // console.log(e.target.getBoundingClientRect());
//
//   console.log("Current Scroll (X/Y)",window.pageXOffset,pageYOffset);
//   //これはページがどれだけスクロールされているかを知ることができる。
//   //ページの一番上だったら、x/y は0/0になる
//   //今は全然わかりませんが、これが、ある種のアプリケーションだと、非常に重要になります。
//   console.log("heigth/width viewport",
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );
// //これはビューポートの大きさを知ることができます。
// //そしてビューポートとは、そこの画面の大きさです。
// //chromeの検証ページを大きくしたらビューポートは小さくなります。
//
// //スクロール
// // window.scrollTo(s1coords.left,s1coords.top);
// //これだと、s1coordsの一番先頭に、ボタンを押すと、ふいっと移動する（アニメーション話）
// //(ボタンをクリックするのは、ページの一番先頭まで戻してから)
// //section1は#section--1です（ID)
// //しかしこのままでは、2回目にそのボタンをクリックすると、全然違うところになります。
// //理由は、この第二引数にあるs1coords.topの指定場所pxはあくまでも相対的であり、いつまでもその場所というわけではないからです
// //↓改善策　
// // window.scrollTo(
// //   s1coords.left + window.pageXOffset,
// //   s1coords.top + window.pageYOffset
// // );
// // //これでページのどこにいたとしてもそのボタンをクリックすればsection1の先頭に来るように書くことができました。
//
// // window.scrollTo({
// //   left: s1coords.left + window.pageXOffset,
// //   top: s1coords.top + window.pageYOffset,
// //   behavior :'smooth'
// //   //スーーって移動するよ。他にあるって思ったけどsmoothしかないみたい。
// // });
//
// //実は上記のスクロールのやり方は古いやり方です。
// //これから新しいやり方を紹介します。
//
// section1.scrollIntoView({behavior: "smooth"});
// //実はこれだけで移動できます。
//
// });
//

/////////////////////////////////////////////////////
//189.Types of Events and Event Handlers

//イベントを設定するのはいくつかの方法があります。
//１つ目。いつもやっているみたいな感じ
// const h1 = document.querySelector('h1');1
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
// const alertH1 = function(e){
//   alert("addEventLisener: Great! You are reading the hading !!");
//   // h1.removeEventListener('mouseenter',alertH1);
//   ///removeEventListenerというのは、そのイベントを一回ポッキリで終わらせることができる。　
// }
// //イベントハンドラーのところに、第二引数として、先程作った変数を入れる
// h1.addEventListener('mouseenter',alertH1);
//
// setTimeout(() => h1.removeEventListener('mouseenter',alertH1),10000);
//setTimeoutを使えば、『何秒後に、そのイベントを消す』みたいなこともできます。
//この場合は10秒後です
//他に、htmlそのものを消す方法もあるが、使って欲しくないそうなので、見るだけにします。

/////////////////////////////////////////////////////
//190.Event Propagation: Bubbling and Capturing
//JSのイベントには特筆すべき点が2つあります。『キャプチャリングフェーズ』と『バブリングフェーズ』です
//座学だけど、要は、どのようにイベントが伝わっていくか。要素ないをくぐり抜けて行ったり。
//DOMみたい

// /////////////////////////////////////////////////////
// //191.Event Propagation in Practice
//
// //rgb(255,255,255);白
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
//   //Math.floorは決められた数以下の最大の整数を出します。
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// //色コードrgbaって数字が0から255で表されるんだけど、それを乱数生成で色々な色になるように関数を作っている。
// //
//
// document.querySelector('.nav__link').addEventListener("click",function(e){
//   this.style.backgroundColor = randomColor();
//   //上の乱数を生成する関数を入れているので、背景がどんどん変わります。
//   console.log("LINK",e.target,e.currentTarget);
//   //e.targetはイベントがどこで発火したかを示す
//   //e.currentTargetはイベントを登録した要素。基本的にはそこのクラスが表示される
//   console.log(e.currentTarget === this); //trueとなる
//
//   //イベントの親要素への伝搬を止める方法
//   // e.stopPropagation(); //ほんとにその選択した要素だけになる
//   //あまり使わないでください。あまりいいアイデアではありませんから。
// });
//
//
// document.querySelector('.nav__links').addEventListener("click",function(e){
//   this.style.backgroundColor = randomColor();
//   //ここにやると、featuresも、そのコンテナも生成された乱数の背景色になる
//   //これがバブルアップ。基本的にそのイベントが全ての親要素でも発生したかのような状態になること。
//   //なので、器用に、コンテナのところを押して見ると、子要素の色は変わりません。
//   //子要素の色を変えたときは、バブルアップでその親要素までそれが伝搬してく
//   console.log("CONTAINER",e.target,e.currentTarget);
//
// });
//
//
// document.querySelector('.nav').addEventListener("click",function(e){
//   this.style.backgroundColor = randomColor();
//   //これも一緒。これが一番大きいコンテナだから、これだけやったら別にそのコンテナだけ色が変化する
//   //DOMの勉強でした。　　
//   console.log("NAV",e.target,e.currentTarget);
// });


// /////////////////////////////////////////////////////
// //193.DOM Traversing （DOMの横断）

const h1 = document. querySelector('h1');
//下へ下へ。子要素の選択
console.log(h1.querySelectorAll('.highlight'));
//これだと、h1要素の中にある「highlight」クラスを選択。この場合は2つあるからquerySelectorAllになります。
//これが子要素に下にしたに入っていく選択の仕方になります。
console.log(h1.childNodes);
//h1のしたにある全てのものが取得できる。コメントを残しているとかもわかる
console.log(h1.children);
//これはjsライブラリなので、<>で囲われているところが出るって感じかな。
h1.firstElementChild.style.color = 'white';
//h1の最初の要素の色が白色になりました。
h1.lastElementChild.style.color = 'blue';
//h1の最後の要素の色が青くなりました。

//上に上に。親要素の選択
console.log(h1.parentNode);
//この場合はheaderのtitle_headerが選択されます。
console.log(h1.parentElement);
//この場合は普通に一つ上の要素なのでdivです

//しかし、残念ながらほとんどの場合、直接の親ではない親要素が必要になります。
//言い換えると、どれだけ離れている場所うにあろうとも、それを見つける必要があるかもしれない
h1.closest('.header').style.background = 'var(--gradient-secondary)';
//これだと、h1に一番違いheaderクラスの背景をcssでスタイリングしているこの色に変える。
h1.closest('h1').style.background = 'var(--gradient-primary)';
//これだと、まぁ普通にこれだからその要素が選択されますよね。
//そう考えると、closestはquerySelectorの反対であると考えることができる
//querySelectorはDOMツリーの深さに関係なく、その値を探すことができるの。
//closestは親を見つけることができるからだ！

//横に横に.兄弟の選択
//jsではなぜか直接の兄弟にしかアクセスできません。なんてこった。
console.log(h1.previousElementSibling);
//ここではnullになる。名前の通りその前の兄弟を見つけるから。この場合はh1が最初だから兄はいない
console.log(h1.nextElementSibling);
//これはh4の要素が選択される。次に書いてあるからね。
//あまり使うことはないんだけど↓
console.log(h1.previousSibling);
//#text
console.log(h1.nextSibling);
//#text

//使えるトリックとしては、親要素にアクセスしてから全ての子要素にアクセスする、というやり方もあります。
console.log(h1.parentElement.children);
//親要素に移動し、そこから要素をつかむ。
//h1（自分も含める）、h4,button,img
[...h1.parentElement.children].forEach(function(el){
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
//配列に入れて、h1以外の要素をtransformを設定し、縮小した。。。
