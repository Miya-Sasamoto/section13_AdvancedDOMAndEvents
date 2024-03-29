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
//196.Implementing a Sticky Navigation: The Scroll Event
//あるところまで行くと、上部のメニューバーが固定されて（sticky）操作しやすくなるやり方

const initialCoords = section1.getBoundingClientRect();
//getBoundingClientRectは要素の寸法とそのビューポートに対する相対位置に関する情報を返す
console.log(initialCoords);

window.addEventListener('scroll',function(){
  //スクロールイベントはwindowでイベント実装可能です
  // console.log(e); これやると、少しいじるだけでめちゃめちゃコンソールに出てくるから厄介
  // console.log(window.scrollY);
  //stickyクラスと言うのがすでにcssで作られているので、それを活用します。

  //それでは問題です。いつstickyイベントをどこまでスクロールした時に発火させるのでしょうか。
  //でもwindow.sceollYの値をハードコードするのは危険です。なぜならその値はビューポートの大きさに依存しているから。人によって変わってきます
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  //どうしてnavにクラスをつけ外しするのかというと、そこが上部メニューの全ての要素の親だからである。
  //これでできたよーーんニコニコ
});

/////////////////////////////////////////////////////
//197.A Better Way: The Intersection Observer API
//前回やったstickyナビケーションを交差点オブザーバーを使用して実装してみましょう。
//このオブザーバーによって、あるターゲット要素が他の要素と交差する「方法」
//あるいはビューポートと交差する方法に対する変化を観察できます。

// const obsCallback = function(entries,observer){
//   //これは2つの関数で呼び出される.二つ目の引数は、下のIntersectionObserverで作ったコールバック関数が入ります。
//   entries.forEach(entry => {
//     console.log(entry);
//     //これで、交差点オブザーバーのエントリーが出来上がっている
//   });
//
// };
//
// const obsOption = {
//   root: null,
//   threshold: 0.1
//   //rootはターゲットが交差している要素
//   //thresholdは闘値。交差点の割合　10%表示された時に、コールバック関数が呼び出される
//   //threshold:1.0の場合は、100%表示された時に呼び出されると言うこと
//
// };
//
// const observer =  new IntersectionObserver(obsCallback,obsOption);
// //IntersectionObserver()は、特定の要素が可視領域に入ったかを検知するAPI
// observer.observe(section1);

//はいそれでは、stickyをナビゲーションするポイントはどこでしょうか？
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//それぞれのセクションを、スクロールをしていくと、下からふわっと上がるようなクラスをつけたので、それを取り外していく作業です

//下からひヒュッて出てくるようにする４つのセクションを管理
const allSections = document.querySelectorAll('.section');

//ロジック整理
const revealSection = function(entries,observer){
  const [entry] = entries;
  console.log(entry);
  //でテクノと入っていくのをtrueとfalseでコンソールから見ることができるよ
  if(!entry.isIntersecting) return;
  //このreturnを書かないと、一番最初のsectionのtargetに常にclassがついている状態になってしまう
  entry.target.classList.remove('section--hidden');
  //どのセクションが入ったのかが大事
  observer.unobserve(entry.target);
  //これを書くと、監視が取れて、ヒュッていうイベントは一回ポッキリになる、
};

//見え方を監視する
const sectionObserver = new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15,
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  //全てのセクション（4つある）をそれぞれsectioとして監視する
  //全てのセクションに手動で--hiddenクラスをつけるのではなく、JSでループしてつけるようにする
  // section.classList.add('section--hidden');
  //これでループしたやつにこのhiddenクラスが追加されますね。
});

///199.Lazy Loading Images
//画像の読み込みを遅延させることで、パフォーマンスを上げる

//data-src(解像度の高い画像)を持っているimg要素だけがここで全て選択される
const imgTarget = document.querySelectorAll('img[data-src]')
// console.log(imgTarget); //ここでは3つの画像がlazyの対象です

const loadImg = function(entries,observer){
  const [entry] = entries; //なんかいっつもこれじゃんね
  console.log(entry);//これでいつも確認しているよ

  //交差していない時にはそのままにしていてや
  if(!entry.isIntersecting) return;

  //しかし、交差した場合、画像をdata-srcに置き換える必要があります
  entry.target.src = entry.target.dataset.src;
  //data-srcのようにdata属性がついているものは、dataset.でできるんだよ。

  entry.target.addEventListener('load',function(){
    //ぼやかしクラスを外す
    entry.target.classList.remove('lazy-img');
    //何度もいうが、classListだから.はいらない
  });
  //一回読み込んだので監視を外す
  　observer.unobserve(entry.target);
};


const imgObserver = new IntersectionObserver(loadImg,{
  root:null,
  threshold:0,
  rootMargin:'200px' //全てが見える前にはもうフルロードになっている
});

//それぞれに関しをつける
imgTarget.forEach(img => imgObserver.observe(img));

/////////////////////////////////////////////////////
//200.Building a Slider Component: Part 1
//下のところにある3つのコメントをスライドするところを実装していくよ
const slider = function(){
  //3つのスライドを選択
  const slides = document.querySelectorAll('.slide');
  //スライドを動かす左側のボタン
  const btnLeft = document.querySelector('.slider__btn--left');
  //スライドを動かす右側のボタン
  const btnRight = document.querySelector('.slider__btn--right');
  //スライドの下に表示しておくドットの入るコンテナを選択
  const dotContainer = document.querySelector('.dots');

  //現在表示しているスライドは0。index = 0の状態から。
  //表示するスライドは変わるのでletで宣言する
  let currentSlide = 0;
  //Max のスライド量をここで表す。
  const maxSlide = slides.length;

  const createDots = function(){
    slides.forEach(function(_,i){
      //第一引数のslideは別に必要ないから、_の捨て変数でいい。
        dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`);
    });
    //insertAdjacentHTMLはjsでHTMLを作成するやり方だけど、このやり方大好きだよね。
    //data-slideのところには、スライドのindexと一致するように、iで入れている
  };
  createDots(); //関数を呼ぶの忘れないで

  //activeになっているドットを管理する関数(濃いグレーになるドット)
  const activateDots = function(slide){
    //dots__dotがついているクラスから、activeクラスをループして削除
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

  //ここむずい！currentSlideのindexがついているものにactiveクラスをつける関数
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };
  //初期値(最初に黒くしておくのは0番目)
  activateDots(0);

  //3つのスライドの共通の親部分
  const slider = document.querySelector('.slider');
  //見えやすくするために少しスケールダウン
  // slider.style.transform = 'scale(0.3)';
  //これで、右側に動いたスライドも見えるようにしました。
  // slider.style.overflow = 'visible';


  //右側に動かす関数を外部で宣言
  const gotoSlide = function(slide){
    slides.forEach((s,i)=> (s.style.transform = `translateX(${100 *(i-slide)}%)`)
    //１枚目は-100%,0%,100%,200%と右に行けば行くほどなる。
    //アクティブなスライドは0%であると覚えてください。
    //こうなります。多分応用効くね
    );
  };
  gotoSlide(0);
  //今の上で作った関数の一番初期は0だね。

  const nextSlide = function(){
    if(currentSlide === maxSlide -1){
      //もし今のスライドがmaxSlideと同じなら、0に戻す
      //どうしてmaxSlide -1かというと、0ベースにするためです
      currentSlide = 0;
    }else {
      //現在のスライドをクリックするたびに一つずつ増やしていく。
      currentSlide++;
    };
    //ネクストだから、右側に動くように
    gotoSlide(currentSlide);
    //下のドットが合わせて動くように
    activateDots(currentSlide);
  };

  const previousSlide = function(){
    if(currentSlide === 0){
      currentSlide = maxSlide-1;
      //こうすることにより、一番端っこになったら、右端（一番大きいところ）にいく。
    }else{
      //左側にいくから--だね
      currentSlide--;
    };

    //previousだから前のスライドに行くように
    gotoSlide(currentSlide);
    //下のドットが合わせて動くように
    activateDots(currentSlide);
  };

  //右側のボタンの実装 = 次のスライドに移動するためのもの
  btnRight.addEventListener('click',nextSlide);
    //次のスライドに移動するのは、基本的にtransformのプロパティの値を変えるだけ
    //translateX()の値を変えるだけ
    //nextSlideは上に関数で定義したの
  btnLeft.addEventListener('click',previousSlide);

  //右左のキーボードを押すだけで、スライドが動くような実装
  document.addEventListener('keydown',function(e){
    // console.log(e);
    //→はArrowRightとしてkeyが登録してある
    //←はArrowLeftとしてkeyが登録してある
    e.key === 'ArrowLeft' && previousSlide();
    e.key === 'ArrowRight' && nextSlide();
    //これで、キーダウンした時に、その関数が呼び出される。
    //こんな感じでできるから、関数に入れると言うのはとても大事ね。
  });

  dotContainer.addEventListener('click',function(e){
    if(e.target.classList.contains('dots__dot')){
      // console.log('DOT');
      const {slide} = e.target.dataset;
      gotoSlide(slide);
      //dots__dotというクラスがついているならば、slideはそのスライドと一致して、gotoSlideと一致致します
    };
    //今表示しているindexと同じドットは濃いグレーに色が変化する。
    //dots_dot--activeクラスがついています。
  });
};
slider();

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


// /////////////////////////////////////////////////////
// //186..Selecting, Creating, and Deleting Elements
// //要素の選択の仕方
// console.log(document.documentElement);
// //これでdocument（html）要素を引っ張り出してくることができる
// console.log(document.head);
// //これでdocument（html）要素のhead部分を持って来れる
// console.log(document.body);
// //これでdocument（html）要素のbody部分を持って来れる
//
// const header = document.querySelector(".header");
// const allSections = document.querySelectorAll(".section");
// console.log(allSections);
// //querySelectorAllはその指定したクラスを持っているものすべてを選択する。
//
// document.getElementById("section--1");
// //このID名に一致するidを選ぶ。名前にIDが入っているから#はいらない
// const allButtons =  document.getElementsByTagName("button");
// console.log(allButtons);
// //これですべてのボタン要素を取り出す
// console.log(document.getElementsByClassName("btn"));
// //クラス名にbtnが入っているものは選択
//
// //要素の作成と挿入について
// const message = document.createElement("div");//div要素を作る
// message.classList.add("cookie-message");//そのdivのクラス名はcookie-messageにします
// // message.textContent = "We use cookied for improved functionality and analytics.";
// message.innerHTML =
// 'We use cookied for improved functionality and analytics. <button class="btn btn--close--cookie">Got it </button>';
// //そのcookie-messageクラスには、上記のように書く
// //エラーがあって解消に時間がかかった、、、
// //innerHTMLの時は、ごっちゃになるから''と""は分けるようにしよう
//
// // header.prepend(message);
// ///headerにmessageを追加する
// //prependはその選択された要素の最初の子として要素を追加する
// //この場合はheaderの一番最初に追加をするような感じ、
// // header.append(message);
// //その要素の一番最後に挿入する
// header.before(message);
// //名前の通り、headerよりも前におく
// // header.after(message);
// //headerの後におく
//
// //要素の削除の仕方
// //さっき作ったcookieのところにあるボタンをクリックしたら消えるようにしましょう。
// document.querySelector(".btn--close--cookie")
// .addEventListener("click",function(){
//   message.remove(); //このremoveで消すことができます
//   //実はこのremove()は割と新しい概念で、これができるまでDOMトラバースでparentnodeに行ってそのchildnodeを消すみたいなアップダウンをしていた
// });
//これでボタンを押すと消えます。

/////////////////////////////////////////////////////
//187.Styles, Attributes and Classes
// message.style.backgroundColor = "#373834"; //濃いめのグレーみたい
// message.style.width = "120%";

// console.log(message.style.height); //実はこれでは、値を取得することができ前ん。
// //なぜなら、ここで手動で行うことはインラインスタイルであるためです。はにゃ？
// //もし本当に必要であれば、このようにして値を取ることができます。
// console.log(getComputedStyle(message));//引数に値を渡してこれですべての情報を取ることができます、
// console.log(getComputedStyle(message).color); //rgb(187, 187, 187)
// console.log(getComputedStyle(message).height); //49px
//
// message.style.height =
//  Number.parseFloat(getComputedStyle(message).height,10) + 50 + "px";
//
// // document.documentElement.style.setProperty('--color-primary','orangered');
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

// const h1 = document. querySelector('h1');
// //下へ下へ。子要素の選択
// console.log(h1.querySelectorAll('.highlight'));
// //これだと、h1要素の中にある「highlight」クラスを選択。この場合は2つあるからquerySelectorAllになります。
// //これが子要素に下にしたに入っていく選択の仕方になります。
// console.log(h1.childNodes);
// //h1のしたにある全てのものが取得できる。コメントを残しているとかもわかる
// console.log(h1.children);
// //これはjsライブラリなので、<>で囲われているところが出るって感じかな。
// h1.firstElementChild.style.color = 'white';
// //h1の最初の要素の色が白色になりました。
// h1.lastElementChild.style.color = 'blue';
// //h1の最後の要素の色が青くなりました。
//
// //上に上に。親要素の選択
// console.log(h1.parentNode);
// //この場合はheaderのtitle_headerが選択されます。
// console.log(h1.parentElement);
// //この場合は普通に一つ上の要素なのでdivです
//
// //しかし、残念ながらほとんどの場合、直接の親ではない親要素が必要になります。
// //言い換えると、どれだけ離れている場所うにあろうとも、それを見つける必要があるかもしれない
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// //これだと、h1に一番違いheaderクラスの背景をcssでスタイリングしているこの色に変える。
// h1.closest('h1').style.background = 'var(--gradient-primary)';
// //これだと、まぁ普通にこれだからその要素が選択されますよね。
// //そう考えると、closestはquerySelectorの反対であると考えることができる
// //querySelectorはDOMツリーの深さに関係なく、その値を探すことができるの。
// //closestは親を見つけることができるからだ！
//
// //横に横に.兄弟の選択
// //jsではなぜか直接の兄弟にしかアクセスできません。なんてこった。
// console.log(h1.previousElementSibling);
// //ここではnullになる。名前の通りその前の兄弟を見つけるから。この場合はh1が最初だから兄はいない
// console.log(h1.nextElementSibling);
// //これはh4の要素が選択される。次に書いてあるからね。
// //あまり使うことはないんだけど↓
// console.log(h1.previousSibling);
// //#text
// console.log(h1.nextSibling);
// //#text
//
// //使えるトリックとしては、親要素にアクセスしてから全ての子要素にアクセスする、というやり方もあります。
// console.log(h1.parentElement.children);
// //親要素に移動し、そこから要素をつかむ。
// //h1（自分も含める）、h4,button,img
// [...h1.parentElement.children].forEach(function(el){
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
//配列に入れて、h1以外の要素をtransformを設定し、縮小した。。。

///////////////////////////////////////////
//202.Lifecycle DOM Events
//DOM contens loaded
// document.addEventListener('DOMContentLoaded',function(e){
//   //DOMContentLoadedは、最初のHTML文書の読み込みと、解析が完了し、DOMツリーの構築が完了した時点で発生します。
//   console.log('HTML parsed and DOM tree built!',e);
// });
//しかし、これをやる必要はあるのだろうか？
//HTMLの解析が終わった時に、これが発生するが、そもそもHTMLファイルで一番最後にscriptを読み込んでいると言うことはDOMContentLoadedを呼び出す必要はないだろう。だってすでにHTMLが読み込まれた後にscriptを読んでJSに映るわけだから必要はないよね。

//Load イベント⇨ウィンドウによって発生します。
window.addEventListener('load',function(e){
  console.log('Page fully loaded',e);
});
//ロードイベントは、ページ全体が、スタイルシート、画像の全てのリソースを含めて読み込まれた時に発生。

//beforeunloadイベント。消すと言うことを知らせる
// window.addEventListener('beforeunload',function(e){
//   //chromeは大丈夫だけど、いくつかのブラウザはこれをしないと。
//   e.preventDefault();
//   console.log(e);
//   //returnValueを空にすることで、消すと言うことがわかる。
//   e.returnValue = '';
// });
//これによって、「本当にこのサイトを離れますか？」と言うポップアップが出てきます。必ずこのメッセージです。編集はできません。
//リソースがアンロード＝タブが閉じられる時に発生します。

///悪用は絶対するな! by Jonas
