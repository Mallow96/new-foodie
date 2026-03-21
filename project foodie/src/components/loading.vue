<script setup></script>

<template>
  <div class="content-box">
    <div class="char-wrapper">
      <span class="4">4</span>
      <span class="o">f</span>
      <span class="d">o</span>
      <span class="e">o</span>
      <span class="p">d</span>
      <span class="e2">i</span>
      <span class="n">e</span>
      <span class="s">s</span>
    </div>

    <div class="cir-wrapper">
      <div class="circle"></div>
    </div>
  </div>
</template>

<style scoped>
.content-box {
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;
}

.char-wrapper {
  width: 100%;
  font-size: 48px;
}

span {
  margin-right: -5px;

  color: var(--color-primary-yellow);
  -webkit-animation: fade 2s infinite ease;
  animation: fade 2s infinite ease;
}

span.o {
  -webkit-animation-delay: 0.25s;
  animation-delay: 0.25s;
}

span.d {
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
}

span.e {
  -webkit-animation-delay: 0.75s;
  animation-delay: 0.75s;
}

span.p {
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}

span.e2 {
  -webkit-animation-delay: 1.25s;
  animation-delay: 1.25s;
}

span.n {
  -webkit-animation-delay: 1.5s;
  animation-delay: 1.5s;
}

span.s {
  -webkit-animation-delay: 1.75s;
  animation-delay: 1.75s;
}

.circle {
  box-sizing: border-box;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  border: 0.5rem solid rgba(255, 255, 255, 0.2);
  border-top-color: var(--color-primary-brown);
  animation: spin 1s infinite linear;
}

@-webkit-keyframes fade {
  0% {
    color: var(--color-primary-yellow);
  }
  50% {
    color: var(--color-primary-dbrown);
  }
  100% {
    color: var(--color-primary-yellow);
  }
}

@keyframes fade {
  0% {
    color: var(--color-primary-yellow);
  }
  50% {
    color: var(--color-primary-dbrown);
  }
  100% {
    color: var(--color-primary-yellow);
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
