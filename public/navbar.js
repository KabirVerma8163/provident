let lastScrollTop = 0;
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
window.addEventListener("scroll", function(){
  if (window.pageYOffset < lastScrollTop){
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-80px";
  }
  lastScrollTop = window.pageYOffset
  // document.getElementById("navbar").style.top = "-100px";
  // document.getElementById("navbar").classList.add('bg-green-400')
}, false);