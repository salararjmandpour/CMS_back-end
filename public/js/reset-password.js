const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm_password');
const form = document.querySelector('#form');
const token = document.querySelector('#token').value;
const passwordError = document.querySelector('#password_error');
const confirmPasswordError = document.querySelector('#config_password_error');

const passwordParent = password.parentNode;
const confirmPasswordParent = confirmPassword.parentNode;
const url = 'https://api-arshida.iran.liara.run/v1/admin-auth/reset-password';
const secretKey =
  '42757476C1B4429E823B36F26BE7F4460570E3ED9182710923D0939365584FD7';

let isMatch = true;

const showSuccessToast = () => {
  var myToast = Toastify({
    text: 'رمز عبور با موفقیت تغییر یافت. اکنون می توانید به برنامه برگردید و سعی کنید دوباره وارد شوید',
    duration: 100000,
  });
  myToast.showToast();
};

const showErrorToast = () => {
  var myToast = Toastify({
    text: 'توکن شما نامعتبر است یا متقضی شده. لطفا مجددا امتحان کنید',
    duration: 100000,
  });
  myToast.showToast();
};

const encrypt = (text, key) => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

const sendRequest = (url, encryptedData) => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      encryptedData,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status == 201 || res.status == 200) {
        showSuccessToast();
        form.remove();
        return true;
      }

      showErrorToast();
      form.remove();
    })
    .catch(() => {
      showErrorToast();
      form.remove();
    });
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  passwordError.textContent = '';
  confirmPasswordError.textContent = '';

  if (!password.value.trim()) {
    passwordError.textContent = 'رمز عبور جدید را وارد کنید';
    return false;
  }

  if (password.value.trim().length < 8) {
    passwordError.textContent = 'رمز عبور جدید حداقل باید 8 کاراکتر باشد';
    return false;
  }

  if (!confirmPassword.value.trim()) {
    confirmPasswordError.textContent = 'تکرار رمز عبور را وارد کنید';
    return false;
  }

  if (confirmPassword.value.trim().length < 8) {
    confirmPasswordError.textContent =
      'تکرار رمز عبور حداقل باید 8 کاراکتر باشد';
    return false;
  }

  if (password.value !== confirmPassword.value) {
    confirmPasswordError.textContent = 'پسورد و تکرار آن با هم مطابقت ندارند';
    return false;
  }

  const data = JSON.stringify({
    token,
    password: password.value,
  });

  const encryptedData = encrypt(data, secretKey);

  sendRequest(url, encryptedData);
});
