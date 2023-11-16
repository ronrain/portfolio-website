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



