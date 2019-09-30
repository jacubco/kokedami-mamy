console.log('bonjour le monde');

// Add smooth scrolling to links with a class of .smooth
$('.smooth').on('click', function(e){
  e.preventDefault();
  var href = $(this).attr('href');

  $('html, body').animate({
    scrollTop:$(href).offset().top + 20
  },'slow');
});


// Collapse mobile menu after link is clicked
const navItems = document.getElementsByClassName('nav__link');
  
for (i = 0; navItems.length; i++) {
  navItems[i].addEventListener('click', collapseIt);
};

function collapseIt() {
  let checkBox = document.getElementById("navi-toggle");
  console.log('collapseIt fired');
  checkBox.checked = false;
}