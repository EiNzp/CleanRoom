
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



const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  // loop: true,
  slidesPerView: 2,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 1.15,
      spaceBetween: 30
    },
    900: {
      slidesPerView: 2.15,
      spaceBetween: 30
    }
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',

    clickable: true,

    dynamicBullets: true,
  },

  grabCursor: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },


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
