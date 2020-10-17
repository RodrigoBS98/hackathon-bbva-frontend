<template>
<v-app class="mp-login-page">
    <div class="login-fg">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-8 col-lg-7 col-md-7 col-sm-12 bg" :style="`background-image:url(${imgLogin})`">
                    <div class="info-bg">
                        <h1>#HackathonBBVA</h1>
                    </div>
                    <div class="mp-getback">
                        <router-link to="/">
                            <i class="fas fa-angle-left"></i>
                            Regresar
                        </router-link>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-5 col-md-5 col-sm-12 login">
                    <div class="login-section">
                        <div class="logo clearfix">
                            <img draggable="false" :src="logoColor" alt="logo-mercado-lima" />
                        </div>
                        <h3 class="prefix-title">Inicia sesión con tu cuenta</h3>
                        <div class="form-container">
                            <v-form ref="userFormLogin" v-on:submit.prevent="loginUser" lazy-validation v-model="valid">
                                <div v-if="messageError && messageError.length > 0" class="alert alert-danger" role="alert">
                                    {{messageError}}
                                </div>
                                <div class="form-group form-fg">
                                    <input v-model="loginInfo.email" type="email" name="email-mp-lima" class="input-text" placeholder="Correo" required />
                                    <i class="fa fa-envelope"></i>
                                    <span :class="`mp-error-input ${activeErrorEmail ? 'active-error': ''}`">Rellena el campo del correo correctamente</span>
                                </div>
                                <div class="form-group form-fg">
                                    <input v-model="loginInfo.password" type="password" name="password-mp-lima" class="input-text" placeholder="Contraseña" required />
                                    <i class="fa fa-unlock-alt"></i>
                                    <span :class="`mp-error-input ${activeErrorPassword ? 'active-error': ''}`">Ingresa tu contraseña</span>
                                </div>
                                <div class="form-group mt-2">
                                    <button type="submit" class="btn-md btn-fg btn-block">
                                        Ingresar
                                    </button>
                                </div>
                            </v-form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mp-overlay-loader">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

</v-app>
</template>

<script>
import imgLogin from '@/assets/img/login-bg.jpg'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            valid: false,
            imgLogin: imgLogin,
            loginInfo: {
                email: '',
                password: '',
            },
            messageError: '',
            usernameRules: [
                (v) => !!v || 'Usuario requerido!!',
                (v) =>
                v.length > 4 || 'El usuario no puede contener menos de 4 caractéres!',
            ],
            passwordRules: [
                (v) => !!v || 'Contraseña requerida!!',
                (v) =>
                v.length >= 4 || 'La contraseña no puede ser menor a 4 caractéres!',
            ],
        }
    },
    computed: {
        ...mapState({
            logoColor: (state) => state.baseData.BlueLogo,
        }),
        activeErrorEmail() {
            return /.+@.+/.test(this.loginInfo.email) ? false : true
        },
        activeErrorPassword() {
            return this.loginInfo.password.length >= 4 ? false : true
        }
    },
    mounted() {
        console.log(this.$store.state.auth)
    },
    methods: {
        async loginUser() {
            if (this.activeErrorEmail || this.activeErrorPassword) return;
            document.querySelector('.mp-overlay-loader').classList.add('active-loader');
            console.log(this.loginInfo);
            try {
                const RES = await this.$auth.loginWith('local', {
                    data: this.loginInfo,
                })
                console.log(RES)
                console.log(this.$store.state.auth.loggedIn);
                if (RES.status != 200) {
                    this.messageError = RES.data.message
                    document.querySelector('.mp-overlay-loader').classList.remove('active-loader');
                    return;
                }
                this.$router.push('/').catch(err => {})
            } catch (err) {
                document.querySelector('.mp-overlay-loader').classList.remove('active-loader');
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
.mp-login-page {
    padding: 0;
    margin: 0;

    .login-fg .form-container {
        color: #ccc;
        position: relative;
    }

    .alert {
        font-size: 12px;
    }

    .mp-getback {
        position: absolute;
        top: 3%;
        left: 3%;
        padding: 1em;

        a {
            padding: .8em 1.5em;
            background: rgba(0, 0, 0, .35);
            border: 1px solid $primary-color-transparent;
            font-family: $primary-font;
            border-radius: 30px;
            color: #fff;
            text-decoration: none;
            transition: all ease-in-out .2s;

            &:hover {
                background: $primary-color-transparent;
            }

            i {
                margin-right: 5px;
            }
        }
    }

    //loader
    .mp-overlay-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        transition: all ease-in-out .2s;
        background: rgba(255, 255, 255, .7);
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        opacity: 0;
        z-index: 50;
    }

    .mp-overlay-loader.active-loader {
        visibility: visible;
        opacity: 1;
    }

    //end loader
    .login-fg .login {
        min-height: 100vh;
        position: relative;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 15px;
    }

    .login-fg .login-section {
        max-width: 370px;
        margin: 0 auto;
        text-align: center;
        width: 100%;
    }

    .login-fg .form-fg {
        width: 100%;
        text-align: center;
    }

    .login-fg .form-container .form-group {
        padding-bottom: 25px;
    }

    .login-fg .form-container .form-fg {
        float: left;
        width: 100%;
        position: relative;
    }

    .login-fg .form-container .input-text {
        font-size: 14px;
        outline: none;
        color: #616161;
        border-radius: 3px;
        font-weight: 500;
        border: 1px solid transparent;
        background: #fff;
        height: 55px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    .login-fg .form-container img {
        margin-bottom: 5px;
        height: 40px;
    }

    .login-fg .form-container .form-fg input {
        float: left;
        width: 100%;
        padding: 11px 45px 11px 20px;
        border-radius: 50px;
    }

    .login-fg .form-container .form-fg i {
        position: absolute;
        top: 16px;
        right: 20px;
        font-size: 19px;
        color: #616161;
    }

    .login-fg .form-container label {
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 5px;
    }

    .login-fg .form-container .forgot {
        margin: 0;
        line-height: 45px;
        color: #535353;
        font-size: 15px;
        float: right;
    }

    .login-fg .bg {
        background: rgba(0, 0, 0, 0.04) repeat;
        background-size: cover;
        top: 0;
        width: 100%;
        bottom: 0;
        opacity: 1;
        z-index: 10;
        min-height: 100vh;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px;
        background-position: center;
    }

    .login-fg .info-bg h1 {
        font-size: 60px;
        color: #fff;
        font-weight: 800;
        margin-bottom: 15px;
        //text-transform: uppercase;
        //text-shadow: 2px 0px #000;
        margin-bottom: 0;
        position: relative;
    }

    .login-fg .info-bg {
        padding: 1em 1.5em;
        text-align: center;
        background: transparent;
        font-family: $primary-font;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: $primary-color-transparent;
            transform: skew(-10deg);
        }
    }

    .login-fg .info-bg p {
        margin-bottom: 0;
        color: #fff;
        line-height: 28px;
        text-shadow: 1px 1px #000;
    }

    .login-fg .form-container .btn-md {
        cursor: pointer;
        padding: 10px 30px 9px;
        height: 45px;
        letter-spacing: 1px;
        font-size: 14px;
        font-weight: 400;
        font-family: 'Open Sans', sans-serif;
        border-radius: 50px;
        color: #d6d6d6;
    }

    .login-fg .form-container p {
        margin: 0;
        color: #616161;
    }

    .login-fg .form-container p a {
        color: #616161;
    }

    .login-fg .form-container button:focus {
        outline: none;
        outline: 0 auto -webkit-focus-ring-color;
    }

    .login-fg .form-container .btn-fg.focus,
    .btn-fg:focus {
        box-shadow: none;
    }

    .login-fg .form-container .btn-fg {
        background: $primary-color;
        border: none;
        color: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    .login-fg .form-container .btn-fg:hover {
        background: $primary-color;
    }

    .login-fg .logo a {
        font-weight: 700;
        color: #333;
        font-size: 39px;
        text-shadow: 1px 0px #000;
    }

    .login-fg .logo img {
        max-width: 100%;
        max-height: 80px;
    }

    .login-fg .form-container .checkbox {
        margin-bottom: 25px;
        font-size: 14px;
    }

    .login-fg .form-container .form-check {
        float: left;
        margin-bottom: 0;
    }

    .login-fg .form-container .form-check a {
        color: #d6d6d6;
        float: right;
    }

    .login-fg .form-container .form-check-input {
        position: absolute;
        margin-left: 0;
    }

    .login-fg .form-container .form-check label::before {
        content: '';
        display: inline-block;
        position: absolute;
        width: 18px;
        height: 18px;
        top: 2px;
        margin-left: -25px;
        border: none;
        border-radius: 3px;
        background: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    .login-fg .form-container .form-check-label {
        margin-left: 25px;
        margin-bottom: 0;
        font-size: 14px;
        color: #616161;
    }

    .login-fg .form-container .checkbox-fg input[type='checkbox']:checked+label::before {
        color: #fff;
        background: #0f96f9;
    }

    .login-fg .form-container input[type='checkbox']:checked+label:before {
        font-weight: 300;
        color: #f3f3f3;
        font-size: 14px;
        content: '\2713';
        line-height: 17px;
    }

    .login-fg .form-container input[type='checkbox'],
    input[type='radio'] {
        margin-top: 4px;
    }

    .login-fg .form-container .checkbox a {
        font-size: 14px;
        color: #616161;
        float: right;
        margin-left: 3px;
    }

    .login-fg .form-container .checkbox a:hover {
        color: $primary-color;
    }

    .login-fg .login-section .prefix-title {
        font-size: 22px;
        margin-bottom: 27px;
        font-family: $primary-font;
        font-weight: 700;
        color: #414141;

        margin-top: 10px;
    }

    .login-fg .login-section p {
        margin: 25px 0 0;
        font-size: 15px;
        color: #616161;
    }

    .login-fg .login-section p a {
        color: #616161;
        transition: all ease-in-out 0.2s;
    }

    .login-fg .login-section p a:hover {
        color: $primary-color;
    }

    .login-fg .login-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .login-fg .login-section .social li {
        display: inline-block;
        margin-bottom: 5px;
    }

    .login-fg .login-section .social li a {
        font-size: 12px;
        font-weight: 600;
        width: 120px;
        margin: 2px 0 3px;
        height: 35px;
        line-height: 35px;
        border-radius: 20px;
        display: inline-block;
        text-align: center;
        text-decoration: none;
        background: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    .login-fg .login-section .social li a i {
        height: 35px;
        width: 35px;
        line-height: 35px;
        float: left;
        color: #fff;
        border-radius: 20px;
    }

    .login-fg .login-section .social li a span {
        margin-right: 7px;
    }

    .login-fg .login-section .or-login {
        float: left;
        width: 100%;
        margin: 20px 0 25px;
        text-align: center;
        position: relative;
    }

    .login-fg .login-section .or-login::before {
        position: absolute;
        left: 0;
        top: 10px;
        width: 100%;
        height: 1px;
        background: #d8dcdc;
        content: '';
    }

    .login-fg .login-section .or-login>span {
        width: auto;
        float: none;
        display: inline-block;
        background: #fff;
        padding: 1px 20px;
        z-index: 1;
        position: relative;
        font-family: Open Sans;
        font-size: 13px;
        color: #616161;
        text-transform: capitalize;
    }

    .login-fg .facebook-i {
        background: #4867aa;
        color: #fff;
    }

    .login-fg .twitter-i {
        background: #3cf;
        color: #fff;
    }

    .login-fg .google-i {
        background: #db4437;
        color: #fff;
    }

    .login-fg .facebook {
        color: #4867aa;
    }

    .login-fg .twitter {
        color: #3cf;
    }

    .login-fg .google {
        color: #db4437;
    }

    .mp-error-input {
        color: #af0000;
        position: absolute;
        left: 0;
        bottom: 2px;
        font-size: 12px;
        margin-left: 20px;
        visibility: hidden;
        opacity: 0;
        transition: all ease-in-out .15s;
    }

    .mp-error-input.active-error {
        visibility: visible;
        opacity: 1;
    }

}

@media (max-width: 1200px) {
    .login-fg .info-bg h1 {
        font-size: 45px;
    }
}

@media (max-width: 992px) {
    .login-fg .bg {
        display: none;
    }
}

@media screen and (max-width: 959px) {
    .mp-login-page .bg {
        display: none !important;
    }

}

@media (max-width: 768px) {
    .login-fg .login-section .social li a {
        width: 100px;
    }

    .login-fg .logo a {
        font-size: 26px;
    }
}

@media screen and (max-width: 500px) {
    .mp-login-page .prefix-title {
        font-size: 18px !important;
    }
}

@media screen and (max-width: 400px) {
    .mp-login-page .prefix-title {
        font-size: 16px !important;
    }

    .mp-login-page input {
        font-size: 13px !important;
    }

    .mp-login-page a,
    .mp-login-page p {
        font-size: 13px !important;
    }
}

.mp-login-page {
    width: 100%;
    height: 100vh;

    .mp-login-wrapper {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column nowrap;

        .mp-login-form {
            max-width: 500px;
            background: rgb(205, 231, 244);
            padding: 1em;
        }
    }
}
</style>
