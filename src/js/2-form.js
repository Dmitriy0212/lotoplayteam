import axios from 'axios';
const storageKey = 'feedback-form-state';

let formData = {
  name: '',
  email: '',
  message: '',
};

const registerForm = document.querySelector('.feedback-form');

const savedData = localStorage.getItem(storageKey);

if (savedData) {
  const parsedData = JSON.parse(savedData);
  formData.name = parsedData.name || '';
  formData.email = parsedData.email || '';
  formData.message = parsedData.message || '';
  registerForm.elements.name.value = formData.name;
  registerForm.elements.email.value = formData.email;
  registerForm.elements.message.value = formData.message;
}
function resetForm() {
  formData = {
    name: '',
    email: '',
    message: '',
  };

  localStorage.removeItem(storageKey);
  registerForm.reset();
}

registerForm.addEventListener('input', handleInput);

function handleInput(event) {
  const { name, value } = event.target;

  formData[name] = value.trim();

  localStorage.setItem(storageKey, JSON.stringify(formData));
}

registerForm.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const name = formData.name.trim();
  const email = formData.email.trim();
  const message = formData.message.trim();

  if (!name || !email || !message) {
    alert('All form fields must be filled in');
    return;
  }

  try {
    const response = await axios.get(
      'http://localhost:8080/author/posts/blog/download/img',
      {
        params: { name, email, message },
      }
    );

    console.log('Ответ:', response.data);

    resetForm();
  } catch (error) {
    console.error('Ошибка:', error);
  }
  resetForm();
}
