
// burger menu

const iconMenuButton = document.querySelector('.menu__icon-button');
const menuBody = document.querySelector('.menu__body');

if (iconMenuButton && menuBody) {
  iconMenuButton.addEventListener('click', function (e) {
    document.body.classList.toggle('body_lock')
    iconMenuButton.classList.toggle('menu__icon-button_active');
    menuBody.classList.toggle('menu__body_active');
  })
}

let menuItems = [...document.querySelectorAll('.menu__item')];
for (const i in menuItems) {
  let el = menuItems[i]
  el.addEventListener('click', function (e) {
    if (document.querySelector('.menu__body.menu__body_active')) {
      document.body.classList.toggle('body_lock')
      iconMenuButton.classList.toggle('menu__icon-button_active');
      menuBody.classList.toggle('menu__body_active');
    }
  })
}

// открытие формы
// window.onload = function() {
const popupForm = document.querySelector('.popup-form');
const buttonsActivForm = [...document.querySelectorAll('[class*="button-form-activ"]')];
const popupThankyou = document.querySelector('.popup-thankyou');

for (const i in buttonsActivForm) {
  let el = buttonsActivForm[i];

  el.addEventListener('click', function (e) {
    e.preventDefault();
    popupForm.classList.remove("popup-form_disable");
    document.body.classList.add('body_lock');
  })
}

// закрытие формы

const closeButton = document.querySelector('.popup-form__close');
if (closeButton) {
  closeButton.addEventListener('click', function () {
    popupForm.classList.add("popup-form_disable");
    document.body.classList.remove('body_lock')
  });
}

popupForm.addEventListener('click', function (e) {
  if (!e.target.closest('.popup-form__content')) {
    popupForm.classList.add("popup-form_disable");
    document.body.classList.remove('body_lock');
  }
})

// провнрка на нажатие кнопки "Esc" у нее код 27
document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    popupForm.classList.add("popup-form_disable");
    document.body.classList.remove('body_lock');
  }
})

// отправка формы

$('.form-popup').on('submit', function (event) {

  event.stopPropagation();
  event.preventDefault();

  let form = this,
    submit = $('.submit', form),
    data = new FormData(),
    files = $('input[type=file]')


  $('.submit', form).val('Отправка...');
  $('input, textarea', form).attr('disabled', '');

  data.append('Имя', $('[name="name"]', form).val());
  data.append('Телефон', $('[name="phone"]', form).val());
  data.append('Описание', $('[name="opisanie"]', form).val());


  files.each(function (key, file) {
    let cont = file.files;
    if (cont) {
      $.each(cont, function (key, value) {
        data.append(key, value);
      });
    }
  });

  $.ajax({
    url: 'ajax.php',
    type: 'POST',
    data: data,
    cache: false,
    dataType: 'json',
    processData: false,
    contentType: false,
    xhr: function () {
      let myXhr = $.ajaxSettings.xhr();

      if (myXhr.upload) {
        myXhr.upload.addEventListener('progress', function (e) {
          if (e.lengthComputable) {
            let percentage = (e.loaded / e.total) * 100;
            percentage = percentage.toFixed(0);
            $('.submit', form)
              .html(percentage + '%');
          }
        }, false);
      }

      return myXhr;
    },
    error: function (jqXHR, textStatus) {
      // Тут выводим ошибку
    },
    complete: function () {
      // Тут можем что-то делать ПОСЛЕ успешной отправки формы
      form.reset()
      $('#name').removeAttr('disabled');
      $('#Phone').removeAttr('disabled');
      $('#Opisanie').removeAttr('disabled');
      $('#formPopupSubmit').removeAttr('disabled');
      popupForm.classList.add("popup-form_disable");
      popupThankyou.classList.remove("popup-thankyou_disable");
    }
  });

  return false;
});

// закрытие popup-thankyou

const closeButtonThankyou = document.querySelector('.popup-thankyou__close');
if (closeButton) {
  closeButtonThankyou.addEventListener('click', function () {
    popupThankyou.classList.add("popup-thankyou_disable");
    document.body.classList.remove('body_lock')
  });
}

popupThankyou.addEventListener('click', function (e) {
  if (!e.target.closest('.popup-thankyou__content')) {
    popupThankyou.classList.add("popup-thankyou_disable");
    document.body.classList.remove('body_lock');
  }
})

// провнрка на нажатие кнопки "Esc" у нее код 27
document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    popupThankyou.classList.add("popup-thankyou_disable");
    document.body.classList.remove('body_lock');
  }
})


// конец скрипта отправки формы

// }


// slider Swiper



// const swiper = new Swiper('.swiper', {
//   // Optional parameters
//   direction: 'horizontal',
//   // loop: true,
//   slidesPerView: 2,
//   breakpoints: {
//     320: {
//       slidesPerView: 1,
//       spaceBetween: 10
//     },
//     // when window width is >= 480px
//     480: {
//       slidesPerView: 1,
//       spaceBetween: 10
//     },
//     // when window width is >= 640px
//     640: {
//       slidesPerView: 1.15,
//       spaceBetween: 30
//     },
//     900: {
//       slidesPerView: 2.15,
//       spaceBetween: 30
//     }
//   },
//   // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',

//     clickable: true,

//     dynamicBullets: true,
//   },

//   grabCursor: true,

//   // Navigation arrows
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },


// });


document.addEventListener("DOMContentLoaded", () => {
  // Превью-слайдер
  const thumbsSlider = new Swiper(".thumbs-slider", {
    slidesPerView: 3, // Количество видимых превью
    spaceBetween: 10, // Расстояние между превью
    freeMode: true, // Свободная прокрутка
    watchSlidesProgress: true, // Следить за видимостью слайдов
  });

  // Основной слайдер
  const mainSlider = new Swiper(".main-slider", {
    loop: true, // Бесконечный слайдер
    autoplay: {
      delay: 5000, // Автопрокрутка каждые 5 секунд
    },
    navigation: {
      nextEl: ".swiper-button-next", // Стрелка "вперед"
      prevEl: ".swiper-button-prev", // Стрелка "назад"
    },
    thumbs: {
      swiper: thumbsSlider, // Связь с превью-слайдером
    },
  });
});







// Модальное окно блока карточек "подробнее"

// Получаем все кнопки "More Details" и модальные окна
const detailButtons = document.querySelectorAll(".service-cards__button-details");
const modals = document.querySelectorAll(".service-cards__modal");
const body = document.body;

// Функция для открытия модального окна
detailButtons.forEach(button => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal"); // Получаем id модального окна
    const modal = document.getElementById(`modal-${modalId}`); // Находим нужное окно

    if (modal) {
      modal.style.display = "block";
      body.style.overflow = "hidden"; // Блокируем скролл
      setTimeout(() => (modal.style.opacity = "1"), 10); // Плавное появление
    }
  });
});

// Функция для закрытия модальных окон
modals.forEach(modal => {
  const closeButton = modal.querySelector(".service-cards__modal-close");

  closeButton.addEventListener("click", () => {
    closeModal(modal);
  });

  // Закрытие модального окна при нажатии на Esc
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      closeModal(modal);
    }
  });
});

function closeModal(modal) {
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.display = "none";
    body.style.overflow = "auto"; // Включаем скролл
  }, 300); // Время на анимацию исчезновения
}



// cleanRooms

// старое меню с локациями

// function relocateElement() {
//   const menuBody = document.querySelector('.menu__body');
//   const menuContainer = document.querySelector('.menu__container');
//   const originalParent = document.querySelector('.menu__main-info-body');

//   if (menuBody && menuContainer && originalParent) {
//     if (window.innerWidth <= 799.98) {
//       // Перемещаем элемент `.menu__body` после `.menu__container`
//       if (!menuContainer.nextElementSibling || menuContainer.nextElementSibling !== menuBody) {
//         menuContainer.insertAdjacentElement('afterend', menuBody);
//       }
//     } else {
//       // Возвращаем элемент `.menu__body` в `.menu__main-info-body`
//       if (!originalParent.contains(menuBody)) {
//         originalParent.appendChild(menuBody);
//       }
//     }
//   } else {
//     console.error('Не удалось найти элементы. Проверьте селекторы.');
//   }
// }

// // Выполняем функцию при загрузке страницы и при изменении размера окна
// window.addEventListener('resize', relocateElement);
// window.addEventListener('orientationchange', relocateElement);
// window.addEventListener('DOMContentLoaded', relocateElement);
// window.addEventListener('load', relocateElement);
// window.addEventListener('pageshow', relocateElement);
// document.addEventListener('visibilitychange', () => {
//   if (!document.hidden) {
//     relocateElement();
//   }
// });

// // 

// function relocateCommunicationElement() {
//   const communicationBody = document.querySelector('.menu__communication-body');
//   const menuContainer = document.querySelector('.menu__container');
//   const originalParent = document.querySelector('.menu__main-info-body');

//   if (communicationBody && menuContainer && originalParent) {
//     if (window.innerWidth <= 637.98) {
//       // Перемещаем элемент `.menu__communication-body` после `.menu__container`
//       if (!menuContainer.nextElementSibling || menuContainer.nextElementSibling !== communicationBody) {
//         menuContainer.insertAdjacentElement('afterend', communicationBody);
//       }
//     } else {
//       // Возвращаем элемент `.menu__communication-body` в `.menu__main-info-body`
//       if (!originalParent.contains(communicationBody)) {
//         originalParent.appendChild(communicationBody);
//       }
//     }
//   } else {
//     console.error('Не удалось найти элементы. Проверьте селекторы.');
//   }
// }

// // Выполняем функцию при загрузке страницы и при изменении размера окна
// window.addEventListener('resize', relocateCommunicationElement);
// window.addEventListener('orientationchange', relocateCommunicationElement);
// window.addEventListener('DOMContentLoaded', relocateCommunicationElement);
// window.addEventListener('load', relocateCommunicationElement);
// window.addEventListener('pageshow', relocateCommunicationElement);
// document.addEventListener('visibilitychange', () => {
//   if (!document.hidden) {
//     relocateCommunicationElement();
//   }
// });

// //


// function relocateContactsItem() {
//   const contactsItem = document.querySelectorAll('.menu__contacts-item')[1];
//   const menuList = document.querySelector('.menu__container');
//   const originalParent = document.querySelector('.menu__contacts-body');

//   if (contactsItem && menuList && originalParent) {
//     if (window.innerWidth <= 352.98) {
//       // Перемещаем элемент `.menu__contacts-item:nth-child(2)` после `.menu__list`
//       if (!menuList.nextElementSibling || menuList.nextElementSibling !== contactsItem) {
//         menuList.insertAdjacentElement('afterend', contactsItem);
//       }
//     } else {
//       // Возвращаем элемент `.menu__contacts-item:nth-child(2)` в исходный контейнер
//       if (!originalParent.contains(contactsItem)) {
//         originalParent.appendChild(contactsItem);
//       }
//     }
//   } else {
//     console.error('Не удалось найти элементы. Проверьте селекторы.');
//   }
// }

// // Выполняем функцию при загрузке страницы и при изменении размера окна
// window.addEventListener('resize', relocateContactsItem);
// window.addEventListener('orientationchange', relocateContactsItem);
// window.addEventListener('DOMContentLoaded', relocateContactsItem);
// window.addEventListener('load', relocateContactsItem);
// window.addEventListener('pageshow', relocateContactsItem);
// document.addEventListener('visibilitychange', () => {
//   if (!document.hidden) {
//     relocateContactsItem();
//   }
// });




// modal form

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contact-modal');
  const openModalBtns = document.querySelectorAll('.btn-modal-trigger');
  const closeModalBtn = modal.querySelector('.modal-close');
  const overlay = modal.querySelector('.modal-overlay');

  const openModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable scrolling
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Enable scrolling
  };

  openModalBtns.forEach((btn) => btn.addEventListener('click', openModal));
  closeModalBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Phone number mask
  const phoneInputs = document.querySelectorAll('.phone-mask');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 0) {
        value = `+${value.slice(0, 1)} (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`;
      }
      e.target.value = value.slice(0, 18);
    });
  });
});


// main-form-block
document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone");

  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.startsWith("44")) {
      value = "+" + value;
    } else {
      value = "+44 " + value;
    }

    value = value.replace(/(\+44\s\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
    e.target.value = value;
  });
});

