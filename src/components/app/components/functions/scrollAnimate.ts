

export function scrollAnimate(parentElem: any, childrenElem: any) {
    const parent = document.querySelector(parentElem)
    const children = document.querySelectorAll(childrenElem)
    
    parent.onscroll = function(){
        // console.log(parent.getBoundingClientRect().bottom)

      Array.from(children).forEach(element => {
        if( element.getBoundingClientRect().bottom > (parent.getBoundingClientRect().bottom - 40 ) ){
            element.classList.add("cut-nav")
        }
        else{
            element.classList.remove("cut-nav")
        }
      });
    }
}