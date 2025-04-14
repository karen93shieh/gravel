<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { page } from "$app/state";
    

</script>
<style>
  main {
    background-image: url('/images/welcome_bgi.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
  }
  /* Title styles */
    .title {
        font-size: 4rem;
        font-weight: bold;
        color: white;
        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);  /* Horizontal, Vertical, Blur, Color */
        position: absolute;
        top: 50%;
        left: 1%;
        
        opacity: 0;
        transform: translateY(30px); /* Start position: 30px below */
        animation: fadeInFromBottom 1s ease-out forwards;
        animation-delay: 0.3s; /* Title starts fading in after 0.3s */
    }

    /* Subtitle styles */
    .subtitle {
        font-size: 2rem;
        font-weight: bold;
        color: white;
        position: absolute;
        top: 63%;
        left: 15%;
        
        opacity: 0;
        transform: translateY(30px); /* Start position: 30px below */
        animation: fadeInFromBottom 1s ease-out forwards;
        animation-delay: 1s; /* Subtitle starts after title animation (1s after page load) */
    }

    /* Keyframe animation for fade-in effect */
    @keyframes fadeInFromBottom {
        to {
            opacity: 1;
            transform: translateY(0); /* End position: back to original */
        }
    }



  .loginBtn{
    position: absolute;
    right: 1%;
    top: 2%;

    padding: 12px 24px;
    font-size: 1rem;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .loginBtn:hover{
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

</style>

<main>
    <div class="title">Welcome to Gravel</div>
    <div class="subtitle">Your Next Group Trip Planner</div>
    <button class="loginBtn" on:click={()=>goto("/mainPages/calendar")}>Login</button>


</main>


<!-- <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

