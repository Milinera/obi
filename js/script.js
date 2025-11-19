//слайдер с проектами компании
document.addEventListener('DOMContentLoaded', function() {
const wrapper = document.querySelector('.qul_wrapper');
const items = document.querySelectorAll('.qul_item');
const btns = document.querySelectorAll('.qul_button_item');

let currentIndex = 0;
const visibleCount = 3;
const itemWidth = items[0].offsetWidth + 20;
const maxIndex = items.length - visibleCount;

function updateCarousel() {
  const offset = -(currentIndex * itemWidth);
  wrapper.style.transform = `translateX(${offset}px)`;

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



//слайдер внутри блоков с проектами компании
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

    gallery.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
    });

    gallery.addEventListener('touchend', function(e) {
      endX = e.changedTouches[0].clientX;
      if (endX < startX - 50 && currentIndex < items.length - 1) {
        currentIndex++;
        updateCarousel();
        appButtons();
      } else if (endX > startX + 50 && currentIndex > 0) {
        currentIndex--;
        updateCarousel();
        appButtons();
      }
    });

    createButtons();
    updateCarousel();
  });
});



//слайдер и переключатель для блока с благодарностями и сертификатами 
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.serf_buttons_button');
  const blocks = document.querySelectorAll('.serf_block');

  buttons.forEach(function(btn, index) {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('serf_buttons_button_active'));
      blocks.forEach(b => b.classList.remove('serf_block_active'));

      btn.classList.add('serf_buttons_button_active');
      blocks[index].classList.add('serf_block_active');
    });
  });

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


//раскрывающейся список
document.addEventListener('DOMContentLoaded', function() {
  const button = document.querySelector('.more_button');
  const button2 = document.querySelector('.more_button_del');
  const text = document.querySelector('.more_text');

  button.addEventListener('click', function() {
    text.classList.add('more_text_active');
    button.style.display = 'none';
    button2.style.display = 'block';
  });

  button2.addEventListener('click', function() {
    text.classList.remove('more_text_active');
    button2.style.display = 'none';
    button.style.display = 'flex';
  });
});



//слайдер о нас
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.onas_slider');
  const items = slider.querySelectorAll('.onas_item');
  const buttons = document.querySelectorAll('.onas_button_item');
  const dotsContainer = document.querySelector('.onas_dots');

  let index = 0;
  let width = items[0].offsetWidth;
  const maxItem = items.length;

  function dotsCreate() {
    items.forEach(function(item, ind) {
      let dot = document.createElement('div');
      dot.classList.add('onas_dots_dot');
      if (ind === 0) dot.classList.add('onas_dots_dot_active');
      dot.addEventListener('click', function() {
        index = ind;
        uppdate();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function uppdate() {
    let up = index * width;
    let dotsList = dotsContainer.querySelectorAll('.onas_dots_dot');

    slider.style.transform = `translateX(-${up}px)`;
    buttons.forEach(n => n.classList.remove('onas_button_item_dis'));
    dotsList.forEach(n => n.classList.remove('onas_dots_dot_active'));
    dotsList[index].classList.add('onas_dots_dot_active');

    if (index === 0) {
      buttons[0].classList.add('onas_button_item_dis');
    } else if (index === maxItem - 1) {
      buttons[1].classList.add('onas_button_item_dis');
    }
  }

  buttons.forEach((btn, ind) => {
    btn.addEventListener('click', function() {
      if (ind === 0) {
        index--;
      } else {
        index++;
      }
      if (index < 0) index = 0;
      if (index >= items.length) index = items.length - 1;
      uppdate();
    });
  });

  window.addEventListener('resize', () => {
    width = items[0].offsetWidth;
    uppdate();
  });

  dotsCreate();
  uppdate();
});
