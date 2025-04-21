<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

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

  .input-box {
    padding: 8px 12px;
    font-size: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    outline: none;
    backdrop-filter: blur(10px);
    transition: border-color 0.3s ease;
    min-width: 100px;
  }

  .input-box::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  .input-box:focus {
    border-color: rgba(255, 255, 255, 0.6);
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

  .loginBtn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
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
    <input type="text" class="input-box" placeholder="Username" />
    <input type="password" class="input-box" placeholder="Password" />
    <button class="loginBtn" on:click={() => {
      const username = document.querySelector('.input-box[type="text"]').value;
      const password = document.querySelector('.input-box[type="password"]').value;

      if (username && password) {
        console.log(`Logging in with ${username}...`);
        goto('/mainPages/main');
      } else {
        alert('Please enter both username and password.');
      }
    }
    }>Login</button>
  </div>
</main>
