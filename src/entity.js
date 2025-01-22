export class Entity{
    constructor({tag= 'div', className=''} = {}){
        this.el = document.createElement(tag);
        document.body.appendChild(this.el);
        this.el.className = 'entity' + className
        // this.el.style.position = 'absolute'
        // this.setX(window.innerWidth/2)
        // this.el.style.left = `${this.x}px`  
        // this.setY( this.y =  window.innerHeight - 50)
        
    }

    setX(x){
        this.x = x
        this.el.style.left = `${this.x}px`  
    }
    setY(y){
         this.y = y
        this.el.style.top = `${this.y}px`
    }
}