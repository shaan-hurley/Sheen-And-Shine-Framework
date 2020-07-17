
const template= document.createElement('template')
// Set the content of the template
template.innerHTML = `
<style>
    .container {
        margin: 0px 30px;
    }
    h1 {
        display: absolute;
        transform: translate3d(174px, 165px, 0px);
        font-size: 42pt;
        color: #001E29;
    }

  .inner {
    display: flex;
    transition: 400ms;
  }
  button{
      display: relative
      padding: 8px;
      font-size: 14pt;
      border: none;
      background-color: #005A7A;
      font-weight: bold;
      transition: 500ms;
  }

  button:hover{
    background-color: #00B4F5;
}

    button:focus {
        outline: none;
    }

  .triangle {
    display: absolute;
    width: 140px;
    height: 140px;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    transform: rotate(-90deg);
  }
  .triangle-2 {
    display: absolute;
    width: 140px;
    height: 140px;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    transform: translate3d(250px, -227px, 0px)rotate(90deg);
  }
  .text-inc {
    display: absolute;
    font-size: 14pt;
    color: #DBF2FA;
    font-weight: bold;
    transform: translate3d(30px, -115px, 0);
  }
  .text-dec {
    display: absolute;
    font-size: 14pt;
    color: #DBF2FA;
    font-weight: bold;
    transform: translate3d(260px, -340px, 0);
  }
</style>
<div class="container">
    <h1>Counter</h1>
    <button id='btn-inc' class="triangle"></button>
    <div class="text-inc">
        <h4>Increment</h4>
    </div>
    <button id='btn-dec' class="triangle-2"></button>
    <div class="text-dec">
        <h4>Decrement</h4>
    </div>
</div>
`


class Counter extends HTMLElement {
    constructor() {
        super();
        const tempNode = template.content.cloneNode(true);
        this._shadow = this.attachShadow({ mode: 'open' })
        this._shadow.appendChild(tempNode)
        this._h1 = this._shadow.querySelector('h1');
        this._incButton = this._shadow.querySelector('#btn-inc')
        this._decButton = this._shadow.querySelector('#btn-dec')
        this._count = 0
        this._incButton.addEventListener("click", this.inc.bind(this))

        this._decButton.addEventListener("click", () => {
            this.dec()
    
        })
    }
    get count(){
        return this.getAttribute("count");
    }
    set count(val) {
        this.setAttribute("count", val);
    }
    static get observedAttriutes(){
        return ["count"];
    }
    inc(){
        console.log(this)
        this._count += 1;
        this.render()
    }
    dec(){
        console.log(this)
        this._count -= 1;
        this.render()
    }
    attributeChangedCallback(prop, oldVal, newVal){
        if(prop === "count"){
            this.render();
            let btn = this.shadow.querySelector("#btn");
            btn.addEventListener("click", this.inc.bind(this));
        }
    }
    connectedCallback() {
        this.render();
        let btn = this.shadow.querySelector("#btn");
        btn.addEventListener("click", this.inc.bind(this));
    }

    render(){
        this._h1.innerHTML = this._count

    }
}


customElements.define('custom-counter', Counter)