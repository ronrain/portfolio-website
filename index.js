const navbarContainer = document.getElementById('navbar')

const navbarLinks = navbarContainer.querySelectorAll('a')
navbarLinks.forEach(link => {
  link.addEventListener('click', function(event){
    event.preventDefault()
    const targetId = this.getAttribute('href').substring(1)
    const targetSection = document.getElementById(targetId)

    if (targetSection){
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      })
    }
  })
})

const cards = document.querySelectorAll('.card');

  const toggleExpansion = (element, to, duration = 350) => {
    return new Promise((res) => {
      element.animate([
        {
    top: to.top,
    left: to.left,
    width: to.width,
    height: to.height
        }
      ], {duration, fill: 'forwards', ease: 'ease-in'})
      setTimeout(res, duration);
    })
  }

  const fadeContent = (element, opacity, duration = 300) => {
    return new Promise(res => {
      [...element.children].forEach((child) => {
        requestAnimationFrame(() => {
          child.style.transition = `opacity ${duration}ms linear`;
          child.style.opacity = opacity;
        });
      })
      setTimeout(res, duration);
    })
  }

  const onCardClick = async (e) => {
    const card = e.currentTarget;

    const cardClone = card.cloneNode(true);

    const {top, left, width, height} = card.getBoundingClientRect();

    cardClone.style.position = 'fixed';
    cardClone.style.top = top + 'px';
    cardClone.style.left = left + 'px';
    cardClone.style.width = width + 'px';
    cardClone.style.height = height + 'px';

    card.style.opacity = '0';

    card.parentNode.appendChild(cardClone);

    const closeButton = document.createElement('button');

    closeButton.style = `
      position: fixed;
      z-index: 10000;
      top: 35px;
      right: 35px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #e25656;
    `;

    closeButton.addEventListener('click', async () => {

      closeButton.remove();
    
      cardClone.style.removeProperty('display');
      cardClone.style.removeProperty('padding');

      [...cardClone.children].forEach(child => child.style.removeProperty('display'));
      fadeContent(cardClone, '0');

      await toggleExpansion(cardClone, {top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px`}, 300)

      card.style.removeProperty('opacity');

      cardClone.remove();
    });

    fadeContent(cardClone, '0')
      .then(() => {
        [...cardClone.children].forEach(child => child.style.display = 'none');
      });

    await toggleExpansion(cardClone, {top: 0, left: 0, width: '100vw', height: '100vh'});
    const content = getCardContent(card.textContent, card.dataset.type)

    cardClone.style.display = 'block';
    cardClone.style.padding = '0';

    cardClone.appendChild(closeButton);
    cardClone.insertAdjacentHTML('afterbegin', content);
  };

  cards.forEach(card => card.addEventListener('click', onCardClick));