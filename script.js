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
