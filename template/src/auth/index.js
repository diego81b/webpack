import axios from '@/axios';
import router from '@/router';

// URL and endpoint constants
const LOGIN_URL = 'Authorization/login';
const SIGNUP_URL = 'Authorization/register';
const USERINFO_URL = 'Authorization/userInfo';
const qs = require('qs');
const jwtDecode = require('jwt-decode');

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const authorization = {
  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(creds, redirect) {
    const data = qs.stringify({
      Password: creds.password,
      Email: creds.username,
    });
    const request = axios.post(LOGIN_URL, data);
    request
      .then((response) => {
        this.setUserInfo(response.data, redirect);
        return response.data;
      })
      .catch((err) => err);
    return request;
  },
  signup(creds, redirect) {
    const data = qs.stringify({
      Password: creds.password,
      Email: creds.username,
      Name: creds.name,
      Surname: creds.surname,
      RegistrationNumber: creds.registrationNumber
    });

    const request = axios.post(SIGNUP_URL, data);
    request
      .then((response) => {
        this.setUserInfo(response.data, redirect);
        return response.data;
      })
      .catch((err) => err);
    return request;
  },
  setUserInfo(data, redirect) {
    const token = data.access_token;
    localStorage.setItem('access_token', token);
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    axios.get(USERINFO_URL)
      .then((resp) => {
        if (resp.data) {
          localStorage.setItem('user_info', JSON.stringify(resp.data));
        }
        this.user.authenticated = true;
        // Redirect to a specified route
        if (redirect) {
          router.push({
            name: redirect
          });
        }
      })
      .catch((err) => {});
  },
  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('access_token');
    this.user.authenticated = false;
  },
  isAuthorized() {
    this.checkAuth();
    return this.user.authenticated;
  },
  getUserId() {
    if (this.isAuthorized()) {
      const userInfo = this.getUserInfo();
      if (userInfo) {
        return userInfo.UserId;
      }
    }
    return null;
  },
  getUserInfo() {
    if (this.isAuthorized()) {
      const userInfo = localStorage.getItem('user_info');
      return JSON.parse(userInfo);
    }
    return {};
  },
  checkAuth() {
    const jwt = this.getToken('access_token');
    if (jwt) {
      if (this.isTokenExpired(jwt)) {
        this.user.authenticated = false;
      } else {
        this.user.authenticated = true;
      }
    } else {
      this.user.authenticated = false;
    }
  },
  getToken(tokenName) {
    return localStorage.getItem(tokenName);
  },
  getTokenExpirationDate(token) {
    if (!token) {
      return null;
    }
    const decoded = jwtDecode(token);

    if (typeof decoded.exp === "undefined") {
      return null;
    }

    const d = new Date(0); // The 0 here is the magic, which sets the date to the epoch
    d.setUTCSeconds(decoded.exp);

    return d;
  },
  isTokenExpired(token, offsetSeconds) {
    token = !token ? this.getToken() : (token || {});
    const d = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;
    if (d === null) {
      return true;
    }
    // Token expired?
    return d.valueOf() < (new Date().valueOf() + (offsetSeconds * 1000));
  },
  getRoles() {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      return [].concat(user.Roles);
    }
    return [];
  },
  hasRole(role, propertyName) {
    if (!role) {
      return false;
    }
    const roles = this.getRoles();
    let roleValue = null;
    if (typeof role === 'object') {
      propertyName = !propertyName ? 'RoleName' : propertyName;
      roleValue = role[propertyName];
    } else {
      roleValue = role;
    }
    const found = _.some(roles, (r) => r.RoleName.toUpperCase() === roleValue.toUpperCase());

    return found;
  },
  hasRoles(roles, propertyName) {
    if (!roles || !Array.isArray(roles)) {
      return false;
    }
    let ret = false;
    for (let i = 0; i < roles.length; i += 1) {
      const role = roles[i];
      ret = this.hasRole(role, propertyName);
      if (ret === true) {
        break;
      }
    }
    return ret;
  }
};

export default authorization;
