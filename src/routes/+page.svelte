<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let showLoginPopup = false;
  let showCreateAccountPopup = false;
  let showForgotPasswordPopup = false;

  const handleLogin = () => {
    const username = document.querySelector('.popup input[type="text"]').value;
    const password = document.querySelector('.popup input[type="password"]').value;

    if (username && password) {
      console.log(`Logging in with ${username}...`);
      showLoginPopup = false;
      goto('/mainPages/main');
    } else {
      alert('Please enter both username and password.');
    }
  };

  const handleCreateAccount = () => {
    const username = document.querySelector('.popup input[type="text"]').value;
    const password = document.querySelector('.popup input[type="password"]').value;

    if (username && password) {
      console.log(`Creating account for ${username}...`);
      showCreateAccountPopup = false;
    } else {
      alert('Please enter both username and password.');
    }
  };

  const handleForgotPassword = () => {
    const email = document.querySelector('.popup input[type="email"]').value;

    if (email) {
      console.log(`Sending password reset to ${email}...`);
      showForgotPasswordPopup = false;
    } else {
      alert('Please enter your email address.');
    }
  };
  const handleClosePopup = () => {
    showLoginPopup = false;
    showCreateAccountPopup = false;
    showForgotPasswordPopup = false;
  };

  onMount(() => {
    window.particlesJS("particles-js", {
      particles: {
        number: { value: 50 },
        size: { value: 3 },
        color: { value: "#ffffff" },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" }
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 }
        }
      }
    });
  });
</script>

<style>
  main {
    background-image: url('/images/welcome_bgi.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .title,
  .subtitle,
  .loginBtn {
    position: absolute;
    z-index: 1;
  }

  .title {
    font-size: 4rem;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
    top: 50%;
    left: 1%;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInFromBottom 1s ease-out forwards;
    animation-delay: 0.3s;
  }

  .subtitle {
    font-size: 2rem;
    font-weight: bold;
    color: white;
    top: 63%;
    left: 15%;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInFromBottom 1s ease-out forwards;
    animation-delay: 1s;
  }

  .login-container {
    position: absolute;
    top: 2%;
    right: 10%;
    display: flex;
    gap: 0.5rem;
  }

  .loginBtn {
    padding: 8px 24px;
    font-size: 1rem;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    cursor: pointer;
    transition: all 0.3s ease;
    left: 105%;
  }

  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 400px;
    z-index: 1000;
  }

  .popup h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #333;
    text-align: center;
  }
    .popup h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #333;
    text-align: center;
  }

  .popup input {
    display: block;
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    background: #f9f9f9;
    outline: none;
    transition: border-color 0.3s ease;
  }

  .popup input:focus {
    border-color: #8a2be2;
  }

  .popup .button {
    display: block;
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #8a2be2;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .popup .button:hover {
    background-color: #6a1bbd;
    transform: translateY(-2px);
  }

  .popup .button.cancel {
    background-color: #ccc;
    color: #333;
    margin-top: 0.5rem;
  }

  .popup .button.cancel:hover {
    background-color: #bbb;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .popup input {
    display: block;
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    background: #f9f9f9;
    outline: none;
    transition: border-color 0.3s ease;
  }

  .popup input:focus {
    border-color: #8a2be2;
  }

  .popup .button {
    display: block;
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #8a2be2;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .popup .button:hover {
    background-color: #6a1bbd;
    transform: translateY(-2px);
  }

  .popup .button.cancel {
    background-color: #ccc;
    color: #333;
    margin-top: 0.5rem;
  }

  .popup .button.cancel:hover {
    background-color: #bbb;
  }

  .loginBtn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  .create-account-link {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.9rem;
    color: #555;
  }

  .create-account-link a {
    color: #8a2be2;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
  }

  .create-account-link a:hover {
    text-decoration: underline;
  }

  @keyframes fadeInFromBottom {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

<main>
  <div id="particles-js"></div>

  <div class="title">Welcome to Gravel</div>
  <div class="subtitle">Your Next Group Travel Planner</div>

  <div class="login-container">
    <button class="loginBtn" on:click={() => (showLoginPopup = true)}>Login</button>
  </div>


  {#if showLoginPopup}
    <div class="overlay"></div>
    <div class="popup">
      <h2>Login</h2>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button class="button" on:click={handleLogin}>Login</button>
      <button class="button cancel" on:click={() => (showLoginPopup = false)}>Cancel</button>
      <p class="create-account-link">
        New to Gravel? 
        <a on:click={() => { showLoginPopup = false; showCreateAccountPopup = true; }}>
          Create Account
        </a>
      </p>
    </div>
  {/if}

  {#if showCreateAccountPopup}
    <div class="overlay"></div>
    <div class="create-popup popup">
      <h2>Create Account</h2>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button class="button" on:click={handleCreateAccount}>Create Account</button>
      <button class="button cancel" on:click={() => (showCreateAccountPopup = false)}>Cancel</button>
    </div>
  {/if}
</main>
