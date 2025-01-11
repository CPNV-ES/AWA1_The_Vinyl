<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";

const slides = [
  "#FFAA00",
  "#AA00FF",
  "#00AAFF",
  "#FF5500",
  "#55FF00",
  "#0055FF",
]

const createSlide = (slide) => {
  const slideElement = document.createElement("div");
  slideElement.classList.add("h-full", "w-full", "absolute", "brightness-50");
  slideElement.style.backgroundColor = slide;
  slideElement.innerHTML = slide;
  return slideElement;
}

onMounted(() => {
  const stackToSee = document.getElementById("stack-toSee");
  const stackCurrent = document.getElementById("stack-current");
  const stackSeen = document.getElementById("stack-seen");
  const btnNextPreview = document.getElementById("btn-next-preview");


  for (let i = 0; i < slides.length; i++) {
    const slideElement = createSlide(slides[i]);
    slideElement.style.zIndex = slides.length - i;
    stackToSee.appendChild(slideElement);
  }

  const moveNext = () => {
    const seen = stackCurrent.firstChild;
    if (seen) {
      const stateSeen = Flip.getState(seen);
      seen.style.zIndex = seen.style.zIndex * -1;
      stackSeen.appendChild(seen);
      Flip.from(stateSeen, { duration: 1, ease: "power1.inOut" });
    }

    const current = stackToSee.firstChild;
    if (current) {
      const stateCurrent = Flip.getState(current);
      current.classList.remove("brightness-50");
      stackCurrent.appendChild(current);
      Flip.from(stateCurrent, { duration: 1, ease: "power1.inOut" });
    }
  };

  btnNextPreview.addEventListener("click", moveNext);
});
</script>



<template>
  <section class="carrousel w-screen h-[30dvh] bg-red-400 overflow-hidden flex flex-col">
    <div class="flex w-full h-5/6 justify-evenly items-center px-32">
      <div id="stack-seen" class="h-1/2 aspect-square relative bg-green-600 -z-30"></div>
      <div id="stack-current" class="h-2/3 aspect-square relative bg-green-600"></div>
      <div id="stack-toSee" class="h-1/2 aspect-square relative bg-green-600 -z-30 transition-colors"></div>
    </div>
    <button id="btn-next-preview" class="hover:bg-yellow-300">next</button>
  </section>
</template>
