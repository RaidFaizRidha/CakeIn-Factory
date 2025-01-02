   // Smooth Scroll for Navbar Links
    document.querySelectorAll('.navbar nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const dropdown = document.querySelector('.dropdown-page');
document.querySelector('#navbar-dropdown').onclick = (e) => {
    dropdown.classList.toggle('active');
    document.body.classList.add('no-scroll-dropdown');
    document.querySelector('.modal-dropdown').classList.add('active-modal-dropdown');
    e.preventDefault();
}

const dropdownOutside = document.querySelector('#navbar-dropdown');
document.addEventListener('click', function(e) {
    if (!dropdownOutside.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
        document.body.classList.remove('no-scroll-dropdown');
        document.querySelector('.modal-dropdown').classList.remove('active-modal-dropdown')
    };
});