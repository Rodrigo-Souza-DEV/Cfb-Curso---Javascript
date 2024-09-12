class Login {
    static logado = false;
    static matlogado = null;
    static nomelogado = null;
    static acessologado = null;
    static estilocss = null;
    static callback_ok = null
    static callback_naook = null
    static config = {
        cor: null,
        img:null,
        endPoint:null, //     static endPoint = "https://8d9dda2b-3f72-4f88-bf3a-b695164e40cb-00-2ropfdlhtpzh6.kirk.replit.dev/"
    }
    static login = (callback_ok,callback_naook, config) => {
        this.config=config 
        this.callback_ok=()=>{callback_ok()}
        this.callback_naook=()=>{callback_naook()}
        this.estilocss = `
        .fundoLogin{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%; 
            height: 100vh;
            position: absolute;
            top: 0px;
            left: 0px;
            background-color: rgba(0, 0, 0, 0.75);
            box-sizing: border-box;
        }
        .baseLogin {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
            box-sizing: border-box;
        }
        .elementosLogin {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            width: 50%;
            background-color: #eee;
            padding: 10px;
            border-radius: 10px 0px 0px 10px;
            box-sizing: border-box;
        }
        .logoLogin{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
            height: 160px;
            background-color: #bbb;
            padding: 10px;
            border-radius: 0px 10px 10px 0px;
        }
        .logoLogin img {
            width: 90%;
            
        }
        .campoLogin{
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
            margin-bottom: 10px;
        }
        .campoLogin label {
            font-size: 18px;
        }
        .campoLogin input {
            font-size: 18px;
            padding: 5px;
            background-color: #fff;
            border-radius: 5px;
            border:none;
        }
        .botoesLogin {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            
        }
        .botoesLogin button {
            cursor: pointer;
            background-color: ${this.config.cor};
            color: #fff;
            border-radius: 5px;
            padding: 10px;
            width: 100px;
            border:none;
        }
        `
        const styleEstilo = document.createElement('style')
        styleEstilo.setAttribute('id','id_estiloLogin')
        styleEstilo.setAttribute('rel','stylesheet')
        styleEstilo.setAttribute('type','text/css')
        styleEstilo.innerHTML=this.estilocss
        document.head.appendChild(styleEstilo)

        const fundoLogin=document.createElement('div')
        fundoLogin.setAttribute('id','fundoLogin')
        fundoLogin.setAttribute('class','fundoLogin')
        document.body.prepend(fundoLogin)

        const baseLogin=document.createElement('div')
        baseLogin.setAttribute('id','baseLogin')
        baseLogin.setAttribute('class','baseLogin')
        fundoLogin.appendChild(baseLogin)
        
        const elementosLogin=document.createElement('div')
        elementosLogin.setAttribute('id','elementosLogin')
        elementosLogin.setAttribute('class','elementosLogin')
        baseLogin.appendChild(elementosLogin)

        const campoLoginName=document.createElement('div')
        campoLoginName.setAttribute('class','campoLogin')
        elementosLogin.appendChild(campoLoginName)

        const labelName = document.createElement('label')
        labelName.innerHTML="Username: "
        campoLoginName.appendChild(labelName)
        const userName = document.createElement('input')
        userName.setAttribute('type','text')
        userName.setAttribute('name','f_username')
        userName.setAttribute('id','f_username')
        campoLoginName.appendChild(userName)
        const campoLoginSenha=document.createElement('div')
        campoLoginSenha.setAttribute('class','campoLogin')
        elementosLogin.appendChild(campoLoginSenha)

        const labelSenha = document.createElement('label')
        labelSenha.innerHTML="Password: "
        campoLoginSenha.appendChild(labelSenha)

        const f_senha = document.createElement('input')
        f_senha.setAttribute('type','password')
        f_senha.setAttribute('name','f_senha')
        f_senha.setAttribute('id','f_senha')
        campoLoginSenha.appendChild(f_senha)

        //-------------------------------------------------------
        const logoLogin=document.createElement('div')
        logoLogin.setAttribute('id','logoLogin')
        logoLogin.setAttribute('class','logoLogin')
        baseLogin.appendChild(logoLogin)

        const imgLogo=document.createElement('img')
        imgLogo.setAttribute('src',this.config.img)
        imgLogo.setAttribute('title','CFBCursos')
        logoLogin.appendChild(imgLogo)
        //=========================================================
        const botoesLogin=document.createElement('div')
        botoesLogin.setAttribute('class','botoesLogin')
        elementosLogin.appendChild(botoesLogin)

        const btn_login=document.createElement('button')
        btn_login.setAttribute('id','btn_login')
        btn_login.innerHTML="Login"
        btn_login.addEventListener('click',(evt)=>{
            this.verificaLogin()
        })
        botoesLogin.appendChild(btn_login)
        const btn_cancelar=document.createElement('button')
        btn_cancelar.innerHTML="Cancelar"
        btn_cancelar.addEventListener('click',(evt)=>{
            this.fechar()
        })
        btn_cancelar.setAttribute('id','btn_cancelar')
        botoesLogin.appendChild(btn_cancelar)
    }

    static verificaLogin=()=>{
        const mat = document.querySelector('#f_username').value 
        const pas = document.querySelector('#f_senha').value 
        
        const endPoint = `${this.config.endPoint}/?matricula=${mat}&senha=${pas}`
        fetch(endPoint)
        .then(res=>res.json())
        .then(res=>{
            if(res){
                sessionStorage.setItem('logado','true')
                sessionStorage.setItem('matlogado',mat)
                sessionStorage.setItem('nomelogado',res.nome)
                sessionStorage.setItem('acessologado',res.acesso)
                this,this.callback_ok()
                this.fechar()
                console.log('Login: '+this.nomelogado)
                console.log('Acesso: '+this.acessologado)
            } else {
                sessionStorage.setItem('logado','false')
                sessionStorage.setItem('matlogado','')
                sessionStorage.setItem('nomelogado','')
                sessionStorage.setItem('acessologado','')
                this.callback_naook()
                alert('Login não efetuado')
            }
        })
        
    }

    static fechar=()=>{
        const id_estiloLogin=document.querySelector('#id_estiloLogin')
        id_estiloLogin.remove()
        const fundoLogin=document.querySelector('#fundoLogin')
        fundoLogin.remove()
    }
}
