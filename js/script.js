// Универсальный класс для всех слайдеров
class Slider {
  constructor(container, options = {}) {
    this.container = container;
    this.wrapper = container.querySelector(options.wrapperSelector);
    this.items = container.querySelectorAll(options.itemSelector);
    this.buttons = options.buttonSelector
      ? container.querySelectorAll(options.buttonSelector)
      : [];
    this.dotsContainer = options.dotsSelector
      ? container.querySelector(options.dotsSelector)
      : null;

    this.index = 0;
    this.visibleCount = options.visibleCount || 1;
    this.gap = options.gap || 0;
    this.getItemWidth = options.getItemWidth || (() => this.items[0]?.offsetWidth || 0);

    this.prevDisabledClass = options.prevDisabledClass || 'disabled';
    this.nextDisabledClass = options.nextDisabledClass || 'disabled';
    this.dotClass = options.dotClass || 'dot';
    this.dotActiveClass = options.dotActiveClass || 'active';

    this.autoPlay = options.autoPlay || false;
    this.interval = options.interval || 3000;
    this.timer = null;

    if (!this.wrapper || this.items.length === 0) return;

    this.recalcLimits();
    this.init();
  }

  isMobile() {
    return this.container.clientWidth < 1000;
  }

  recalcLimits() {
    this.itemWidth = this.getItemWidth() + this.gap;
    if (this.isMobile()) {
      // на узких экранах листаем до последнего элемента
      this.maxIndex = this.items.length - 1;
    } else {
      // на широких экранах учитываем visibleCount
      this.maxIndex = Math.max(0, this.items.length - this.visibleCount);
    }
    if (this.index > this.maxIndex) this.index = this.maxIndex;
  }

  init() {
    if (this.buttons.length >= 2) {
      this.buttons[0].addEventListener('click', () => { this.prev(); if (this.autoPlay) this.restartAutoPlay(); });
      this.buttons[1].addEventListener('click', () => { this.next(); if (this.autoPlay) this.restartAutoPlay(); });
    }

    if (this.dotsContainer) this.createDots();

    window.addEventListener('resize', () => {
      this.recalcLimits();
      this.update();
    });

    // свайп
    let startX = 0;
    this.wrapper.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });
    this.wrapper.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      if (endX < startX - 50) this.next();
      else if (endX > startX + 50) this.prev();
      if (this.autoPlay) this.restartAutoPlay();
    });

    // пауза при наведении
    this.container.addEventListener('mouseenter', () => {
      if (this.autoPlay) clearInterval(this.timer);
    });
    this.container.addEventListener('mouseleave', () => {
      if (this.autoPlay) this.startAutoPlay();
    });

    this.update();

    if (this.autoPlay) this.startAutoPlay();
  }

  update() {
    const offset = -(this.index * this.itemWidth);
    this.wrapper.style.transform = `translateX(${offset}px)`;

    if (this.buttons.length >= 2) {
      this.buttons[0].classList.toggle(this.prevDisabledClass, this.index === 0);
      this.buttons[1].classList.toggle(this.nextDisabledClass, this.index === this.maxIndex);
    }

    if (this.dotsContainer) this.updateDots();
  }

  prev() {
    if (this.index > 0) {
      this.index--;
      this.update();
    }
  }

  next(isAuto = false) {
    if (this.index < this.maxIndex) {
      this.index++;
      this.update();
    } else if (isAuto && this.autoPlay) {
      this.index = 0; // возврат к началу только при автопрокрутке
      this.update();
    }
  }

  createDots() {
    this.dotsContainer.innerHTML = '';
    this.items.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add(this.dotClass);
      if (i === 0) dot.classList.add(this.dotActiveClass);
      dot.addEventListener('click', () => {
        this.index = i;
        this.update();
        if (this.autoPlay) this.restartAutoPlay();
      });
      this.dotsContainer.appendChild(dot);
    });
  }

  updateDots() {
    const dots = this.dotsContainer.querySelectorAll(`.${this.dotClass}`);
    dots.forEach(d => d.classList.remove(this.dotActiveClass));
    if (dots[this.index]) dots[this.index].classList.add(this.dotActiveClass);
  }

  startAutoPlay() {
    if (this.timer) return;
    this.timer = setInterval(() => this.next(true), this.interval);
  }

  restartAutoPlay() {
    clearInterval(this.timer);
    this.timer = null;
    this.startAutoPlay();
  }
}


// Инициализация всех слайдеров
document.addEventListener('DOMContentLoaded', () => {
  // Слайдер с проектами компании
  const qulRoot = document.querySelector('.qul');
  if (qulRoot) {
    new Slider(qulRoot, {
      wrapperSelector: '.qul_wrapper',
      itemSelector: '.qul_item',
      buttonSelector: '.qul_button_item',
      visibleCount: 3,
      gap: 20,
      prevDisabledClass: 'qul_button_item_disabled',
      nextDisabledClass: 'qul_button_item_disabled',
      autoPlay: true,
      interval: 4000
    });
  }

  // Слайдеры внутри блоков проектов (галереи с точками)
  document.querySelectorAll('.qul_item_photo_galery').forEach(gallery => {
    const root = gallery.parentElement;
    if (root) {
      new Slider(root, {
        wrapperSelector: '.qul_item_photo_galery',
        itemSelector: '.qul_item_photo_galery_item',
        dotsSelector: '.qul_item_photo_button',
        dotClass: 'qul_item_photo_button_btn',
        dotActiveClass: 'qul_item_photo_button_btn_active',
        autoPlay: false
      });
    }
  });

  // Переключатель блоков "сертификаты/благодарности"
  const serfButtons = document.querySelectorAll('.serf_buttons_button');
  const serfBlocks = document.querySelectorAll('.serf_block');
  if (serfButtons.length && serfBlocks.length) {
    serfButtons.forEach(function(btn, index) {
      btn.addEventListener('click', () => {
        serfButtons.forEach(b => b.classList.remove('serf_buttons_button_active'));
        serfBlocks.forEach(b => b.classList.remove('serf_block_active'));
        btn.classList.add('serf_buttons_button_active');
        serfBlocks[index].classList.add('serf_block_active');
      });
    });
  }

  // Слайдеры внутри каждого блока "сертификаты/благодарности"
  document.querySelectorAll('.serf_block').forEach(block => {
    new Slider(block, {
      wrapperSelector: '.serf_wrapper',
      itemSelector: '.serf_item',
      buttonSelector: '.serf_button_item',
      visibleCount: 3,
      gap: 20,
      prevDisabledClass: 'serf_button_item_disabled',
      nextDisabledClass: 'serf_button_item_disabled',
      autoPlay: true,
      interval: 40000
    });
  });

  // Слайдер "о нас"
  const onasRoot = document.querySelector('.onas');
  if (onasRoot) {
    new Slider(onasRoot, {
      wrapperSelector: '.onas_slider',
      itemSelector: '.onas_item',
      buttonSelector: '.onas_button_item',
      dotsSelector: '.onas_dots',
      prevDisabledClass: 'onas_button_item_dis',
      nextDisabledClass: 'onas_button_item_dis',
      dotClass: 'onas_dots_dot',
      dotActiveClass: 'onas_dots_dot_active',
      autoPlay: true,
      interval: 5000
    });
  }

  // Слайдер фото в карточке товара
  const tovRoot = document.querySelector('.tov_galery');
  if (tovRoot) {
    new Slider(tovRoot, {
      wrapperSelector: '.tov_galery_photos',
      itemSelector: '.tov_galery_photos_item',
      dotsSelector: '.tov_galery_button',
      dotClass: 'tov_galery_button_btn',
      dotActiveClass: 'tov_galery_button_btn_active',
      autoPlay: true,
      interval: 4000
    });
  }
});

// раскрывающийся список
document.addEventListener('DOMContentLoaded', function() {
  const button = document.querySelector('.more_button');
  const button2 = document.querySelector('.more_button_del');
  const text = document.querySelector('.more_text');

  if (button && button2 && text) {
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
  }
});


// переключение доставки/самовывоз
document.addEventListener("DOMContentLoaded", function() {
  const radios = document.querySelectorAll('input[name="delivery"]');
  const samBlock = document.querySelector('.dost_main_switc_sam');
  const dostBlock = document.querySelector('.dost_main_switc_dost');

  function updateBlocks() {
    const checked = document.querySelector('input[name="delivery"]:checked');
    if (!checked) return;
    const selected = checked.value;
    if (selected === "sam") {
      if (samBlock) samBlock.style.display = "block";
      if (dostBlock) dostBlock.style.display = "none";
    } else {
      if (samBlock) samBlock.style.display = "none";
      if (dostBlock) dostBlock.style.display = "block";
    }
  }

  if (radios.length && samBlock && dostBlock) {
    radios.forEach(radio => radio.addEventListener("change", updateBlocks));
    updateBlocks();
  }
});


// переключение Юр/Физ в блоке доставки
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll('.dost_main_switc_dost_buttons_button');
  const urBlock = document.querySelector('.dost_main_switc_dost_ur');
  const fzBlock = document.querySelector('.dost_main_switc_dost_fz');

  function activateButton(clickedButton) {
    buttons.forEach(btn => btn.classList.remove('dost_main_switc_dost_buttons_button_active'));
    clickedButton.classList.add('dost_main_switc_dost_buttons_button_active');
    if (clickedButton.textContent.includes("Юр")) {
      if (urBlock) urBlock.style.display = "block";
      if (fzBlock) fzBlock.style.display = "none";
    } else {
      if (urBlock) urBlock.style.display = "none";
      if (fzBlock) fzBlock.style.display = "block";
    }
  }

  if (buttons.length && urBlock && fzBlock) {
    buttons.forEach(btn => btn.addEventListener("click", () => activateButton(btn)));
    const activeBtn = document.querySelector('.dost_main_switc_dost_buttons_button_active');
    if (activeBtn) activateButton(activeBtn);
  }
});


// переключение Доставка/Оплата
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll('.dost_buttons_button');
  const mainBlock = document.querySelector('.dost_main');
  const oplBlock = document.querySelector('.dost_opl');

  function activateButton(clickedButton) {
    buttons.forEach(btn => btn.classList.remove('dost_buttons_button_active'));
    clickedButton.classList.add('dost_buttons_button_active');

    if (clickedButton.textContent.includes("Доставка")) {
      if (mainBlock) mainBlock.style.display = "block";
      if (oplBlock) oplBlock.style.display = "none";
    } else {
      if (mainBlock) mainBlock.style.display = "none";
      if (oplBlock) oplBlock.style.display = "block";
    }
  }

  if (buttons.length && mainBlock && oplBlock) {
    buttons.forEach(btn => btn.addEventListener("click", () => activateButton(btn)));
    const activeBtn = document.querySelector('.dost_buttons_button_active');
    if (activeBtn) activateButton(activeBtn);
  }
});


// переключение Юр/Физ в блоке оплаты
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll('.dost_opl_switc_dost_dot');
  const urBlock = document.querySelector('.dost_opl_switc_ur');
  const fzBlock = document.querySelector('.dost_opl_switc_fz');

  function activateButton(clickedButton) {
    buttons.forEach(btn => btn.classList.remove('dost_opl_switc_dost_dot_active'));
    clickedButton.classList.add('dost_opl_switc_dost_dot_active');

    if (clickedButton.textContent.includes("Юр")) {
      if (urBlock) urBlock.style.display = "block";
      if (fzBlock) fzBlock.style.display = "none";
    } else {
      if (urBlock) urBlock.style.display = "none";
      if (fzBlock) fzBlock.style.display = "block";
    }
  }

  if (buttons.length && urBlock && fzBlock) {
    buttons.forEach(btn => btn.addEventListener("click", () => activateButton(btn)));
    if (buttons.length > 1) activateButton(buttons[1]); // второй элемент — "Для Физ лиц"
  }
});


// бургер-меню
document.addEventListener("DOMContentLoaded", function() {
  const main = document.querySelector('.header_mobile_main_burger');
  const dop = document.querySelector('.header_mobile');
  if (main && dop) {
    main.addEventListener('click', () => {
      dop.classList.toggle('active');
    });
  }
});
