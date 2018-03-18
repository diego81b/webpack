<template>
<b-form>
<div class="ev-login col-sm-4 offset-sm-4">
    <b-card  no-body  title="Authorization"
        footer-tag="footer">
        <em slot="footer"><a href="#">Forgot your password?</a></em>
         <b-tabs pills card class="nav-fill">
            <b-tab title="LOGIN" active>
                <b-form-group>
                    <b-form-input 
                        type="text"
                        v-validate="'required|email'" 
                        :class="{'input': true, 'is-invalid': errors.has('email') }" 
                        name="email"
                        placeholder="Enter your Email"
                        v-model="credentials.email" required>
                    </b-form-input>
                    <span v-show="errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</span>
                </b-form-group>
                <b-form-group>
                    <b-form-input
                        type="password"
                        data-id="login.password"
                        placeholder="Enter your password"
                        v-model="credentials.password" required>
                    </b-form-input>
                </b-form-group>
                <b-button class="btn-block"
                    data-id="login.submit"
                    variant="primary" 
                    @click="submit()">Login &nbsp; <i class="fa fa-arrow-circle-o-right"></i>
                </b-button>
            </b-tab>
            <b-tab title="REGISTER" >
                <b-form-group>
                    <b-form-input 
                        type="text"
                        v-validate="'required|email'" 
                        :class="{'input': true, 'is-invalid': errors.has('email2') }" 
                        name="email2"
                        data-id="register.email" 
                        placeholder="Enter your Email"
                        v-model="credentials.email" required>
                    </b-form-input>
                    <span v-show="errors.has('email2')" class="invalid-feedback">{{ errors.first('email2') }}</span>
                </b-form-group>
                <b-form-group>
                    <password v-model="credentials.password"
                        v-validate="{required:true,regex:'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'}" 
                        :class="{'input': true, 'is-invalid': errors.has('password2') }"
                        name="password2"
                        placeholder="Enter your Password"
                        defaultClass="form-control" style="width:100%"
                        errorClass="badge badge-pill badge-danger"
                        successClass="badge badge-pill badge-success"
                        secureLength="8" required>
                    </password>
                    <span v-show="errors.has('password2')" class="invalid-feedback">{{ errors.first('password2') }}</span>
                </b-form-group>
                 <b-form-group>
                    <b-form-input
                        type="password"
                        v-validate="'required|confirmed:password2'"
                         :class="{'input': true, 'is-invalid': errors.has('repeatPassword') }"
                        placeholder="Repeat Password"
                        name="repeatPassword" required
                        v-model="credentials.repeatPassword">
                    </b-form-input>
                    <span v-show="errors.has('repeatPassword')" class="invalid-feedback">{{ errors.first('repeatPassword') }}</span>
                </b-form-group>
                <b-form-group>
                    <b-form-input
                        type="text"
                        data-id="register.name" 
                        placeholder="Enter Name"
                        v-model="credentials.name" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input
                        type="text"
                        data-id="register.surname" 
                        placeholder="Enter your Surname"
                        v-model="credentials.surname" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input
                        type="text"
                        data-id="register.registrationNumber" 
                        placeholder="Enter your Registration Number"
                        v-model="credentials.registrationNumber" required>
                    </b-form-input>
                </b-form-group>
                <b-button class="btn-block"
                    data-id="signup.submit"
                    variant="primary" 
                    @click="signup()">Sign Up &nbsp; <i class="fa fa-arrow-circle-o-right"></i>
                </b-button>
            </b-tab>
         </b-tabs>
    </b-card>
  </div>
</b-form>
</template>

<script>
import auth from '@/auth';
import Password from 'vue-password-strength-meter';

export default {
  name: 'login',
  components: { Password },
  data() {
    return {
      credentials: {
        email: '',
        password: '',
        repeatPassword: '',
        name: '',
        surname: '',
        registrationNumber: ''
      }
    };
  },
  methods: {
    submit() {
        auth
            .login({
                username: this.credentials.email,
                password: this.credentials.password
            }, 'Home')
            .then((response) => {
                this.$store.commit('LOGIN_SUCCESS');
                this.showLoginSucess();
                this.$router.push({ name: 'User' });
            })
            .catch((err) => this.showLoginError({ message: err.message }));
    },
    signup() {
        auth
            .signup({
                username: this.credentials.email,
                password: this.credentials.password,
                name: this.credentials.name,
                surname: this.credentials.surname,
                registrationNumber: this.credentials.registrationNumber
            }, 'Home')
            .then((response) => {
                this.$store.commit('LOGIN_SUCCESS');
                this.showLoginSucess();
            })
            .catch((err) => this.showRegistrationError({ message: err.message }));
    }
  },
  notifications: {
      showLoginError: {
        title: 'Login Failed',
        message: 'Failed to authenticate',
        type: 'error'
      },
      showLoginSucess: {
        title: 'Login Succeded',
        message: 'Logged In...',
        type: 'success'
      },
       showRegistrationError: {
        title: 'Registration Failed',
        message: 'Failed to Signin',
        type: 'error'
      },
      showRegistrationSucess: {
        title: 'Registration Succeded',
        message: 'Logged In...',
        type: 'success'
      }
    }
};
</script>

<style lang="scss" scoped>
.ev-login {
  margin-top: 100px;
}
</style>