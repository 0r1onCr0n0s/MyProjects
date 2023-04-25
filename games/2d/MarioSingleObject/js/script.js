let mario = document.querySelector(".mario")
let pipe = document.querySelector(".pipe")
let pipe2 = document.querySelector(".pipe2")
let ambiente = document.querySelector(".ambiente")
let c=0
let pontos=0
let audioM = document.querySelector(".audio")
audioM.volume = "0.5"
let audioM2 = document.querySelector(".audio2")
let audioM3 = document.querySelector(".audio3")
let audioM4 = document.querySelector(".audio4")
let audioM5 = document.querySelector(".audio5")
let jogar =  document.querySelector(".jogar")
let logo =  document.querySelector(".logo")
let pts =  document.querySelector(".pts")
let lv =  document.querySelector(".lv")
let nivel = 0
let multiplicador = 1
const inicio = (comecar)=>{
    lv.innerHTML = 0
    pontos=0
    multiplicador=1
    if(comecar){
        audioM.autoplay = 'true'
        audioM.src = "./audio/audio-principal.mp3"
        mario.style.display = "block"
        pipe.style.display = "block"
        ambiente.style.display = "block"
        jogar.style.display = "none"
        logo.style.display = "none"
        pipe.style.animation = "pipe-animation 1.5s infinite linear"
        mario.src = "./imagens/mario.gif"
        ambiente.style.animation = "nuvens-animation 10s infinite linear"
        c=0
        mario.style.bottom="0px"
        pipe2.style.display = "none"
        audioM5.src = "./audio/correndo.wav"
        audioM5.volume = "1"
        const loop = setInterval(()=>{
            audioM5.src = "./audio/correndo.wav"
            const pipePosition = pipe.offsetLeft
            const marioBottom = +window.getComputedStyle(mario).bottom.replace("px", "")
            const ambientePosition = ambiente.offsetLeft
            if(pipePosition<=120 && marioBottom<80 && pipePosition>0){
                audioM5.src = " "
                pipe2.style.display = "block"
                mario.src = "./imagens/game-over.gif"
                mario.style.bottom="-20px"
                ambiente.style.animation = "none"
                ambiente.style.left = ambientePosition
                c=1
                audioM.src = "./audio/audio-game-over.wav"
                audioM.autoplay = true
                audioM.controls = false
                audioM.loop = false
                jogar.style.display = "block"
                logo.style.display = "block"
                pipe.style.animation = "none"
                pipe.style.rigth = "0"
                pipe.style.display = "none"
                audioM4.src = "./audio/hit.wav"
                jump()
                clearInterval(loop)
               
            }
        }, 10)
    }else{
        
        
    }
}

jogar.addEventListener("click", ()=>{
    inicio(true)
})
const jump = ()=>{
    if(c==0){
        const pipePosition = pipe.offsetLeft

        if(pipePosition<=500){
            pontos++
            pts.innerHTML = pontos
            premios(pontos, 10)
        }
        audioM5.src = ""
        mario.classList.add("jump")
        mario.src = "./imagens/mario-voando.png"
        audioM2.src = "./audio/audio-pulo.wav"
        setTimeout(()=>{
            mario.classList.remove("jump")
            mario.src = "./imagens/mario.gif"
            audioM2.src=""
        }, 700)
    }else{
        mario.src = "./imagens/game-over.gif"
    }
}

function premios(pontos, pre){
    console.log(`pontos: ${pontos} nivel: ${pre}`)
    if(pontos==(pre*multiplicador)){
        multiplicador*=10
        nivel++
        lv.innerHTML = nivel
        //alert("ya")
        audioM.volume = "0"
        audioM3.src = "./audio/ponto.wav"
        
        
    }
    audioM.volume = "0.5"
}



document.addEventListener("keydown", jump)