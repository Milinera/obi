document.addEventListener('DOMContentLoaded', function() {
const wrapper = document.querySelector('.qul_wrapper');
const items = document.querySelectorAll('.qul_item');
const btns = document.querySelectorAll('.qul_button_item');

let currentIndex = 0; // индекс первого видимого блока
const visibleCount = 3; // сколько блоков должно быть видно
const itemWidth = items[0].offsetWidth + 20; // ширина + gap
const maxIndex = items.length - visibleCount; // последний возможный старт

function updateCarousel() {
  const offset = -(currentIndex * itemWidth);
  wrapper.style.transform = `translateX(${offset}px)`;

  // управление классами кнопок
  if (currentIndex === 0) {
    btns[0].classList.add('qul_button_item_disabled');
  } else {
    btns[0].classList.remove('qul_button_item_disabled');
  }

  if (currentIndex === maxIndex) {
    btns[1].classList.add('qul_button_item_disabled');
  } else {
    btns[1].classList.remove('qul_button_item_disabled');
  }
}

// левая кнопка
btns[0].addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// правая кнопка
btns[1].addEventListener('click', () => {
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
});
updateCarousel();
});


document.addEventListener('DOMContentLoaded', function() {
  const galleries = document.querySelectorAll('.qul_item_photo_galery');

  galleries.forEach(gallery => {
    const items = gallery.querySelectorAll('.qul_item_photo_galery_item');
    const btns = gallery.parentElement.querySelector('.qul_item_photo_button'); 

    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth;
    let startX = 0;
    let endX = 0;

    function createButtons () {
      items.forEach(function(item, index) {
        let pogbut = document.createElement('div');
        pogbut.classList.add('qul_item_photo_button_btn');
        pogbut.addEventListener('click', () => {
          currentIndex = index;
          updateCarousel();
          appButtons();
        });
        if (index === 0) {
          pogbut.classList.add('qul_item_photo_button_btn_active');
        }
        btns.appendChild(pogbut);
      });
    }

    function updateCarousel() {
      const offset = itemWidth * currentIndex;
      gallery.style.transform = `translateX(-${offset}px)`;
    }

    function appButtons() {
      const buttons = btns.querySelectorAll('.qul_item_photo_button_btn');
      buttons.forEach(btn => btn.classList.remove('qul_item_photo_button_btn_active'));
      buttons[currentIndex].classList.add('qul_item_photo_button_btn_active');
    }

    // свайп на контейнере галереи
    gallery.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
    });

    gallery.addEventListener('touchend', function(e) {
      endX = e.changedTouches[0].clientX;
      if (endX < startX - 50 && currentIndex < items.length - 1) {
        // свайп влево
        currentIndex++;
        updateCarousel();
        appButtons();
      } else if (endX > startX + 50 && currentIndex > 0) {
        // свайп вправо
        currentIndex--;
        updateCarousel();
        appButtons();
      }
    });

    createButtons();
    updateCarousel();
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.serf_buttons_button');
  const blocks = document.querySelectorAll('.serf_block');

  // переключение вкладок
  buttons.forEach(function(btn, index) {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('serf_buttons_button_active'));
      blocks.forEach(b => b.classList.remove('serf_block_active'));

      btn.classList.add('serf_buttons_button_active');
      blocks[index].classList.add('serf_block_active');
    });
  });

  // инициализация карусели для каждого блока
  blocks.forEach(block => {
    const wrapper = block.querySelector('.serf_wrapper');
    const items = block.querySelectorAll('.serf_item');
    const btns = block.querySelectorAll('.serf_button_item');

    let currentIndex = 0;
    const visibleCount = 3;
    const itemWidth = items[0].offsetWidth + 20;
    const maxIndex = items.length - visibleCount;

    function updateCarousel() {
      const offset = -(currentIndex * itemWidth);
      wrapper.style.transform = `translateX(${offset}px)`;

      // управление классами кнопок
      if (currentIndex === 0) {
        btns[0].classList.add('serf_button_item_disabled');
      } else {
        btns[0].classList.remove('serf_button_item_disabled');
      }

      if (currentIndex === maxIndex) {
        btns[1].classList.add('serf_button_item_disabled');
      } else {
        btns[1].classList.remove('serf_button_item_disabled');
      }
    }

    // левая кнопка
    btns[0].addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    // правая кнопка
    btns[1].addEventListener('click', () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });

    updateCarousel();
  });
});
