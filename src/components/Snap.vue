<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";

const slides = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
]

const createSlide = (slide) => {
  const slideElement = document.createElement("div");
  slideElement.classList.add("h-full", "w-full", "bg-white", "absolute");
  slideElement.innerHTML = slide;
  return slideElement;
}

onMounted(() => {
  const stackToSee = document.getElementById("stack-toSee");
  const stackCurrent = document.getElementById("stack-current");
  const stackSeen = document.getElementById("stack-seen");
  const btnNextPreview = document.getElementById("btn-next-preview");


  slides.forEach((slide) => {
    const slideElement = createSlide(slide);
    stackToSee.insertBefore(slideElement, stackToSee.firstChild);
  });

  const moveNext = () => {
    const current = stackToSee.lastChild;
    if (current) {
      stackCurrent.appendChild(current);
    }
  };

  btnNextPreview.addEventListener("click", moveNext);
});
</script>



<template>
  <section class="carrousel w-screen h-[30dvh] bg-red-400 overflow-hidden flex flex-col">
    <div class="flex w-full h-5/6 justify-evenly items-center px-32">
      <div id="stack-seen" class="h-1/2 aspect-square relative bg-green-600 brightness-50"></div>
      <div id="stack-current" class="h-2/3 aspect-square relative bg-green-600"></div>
      <div id="stack-toSee" class="h-1/2 aspect-square relative bg-green-600 brightness-50"></div>
    </div>
    <button id="btn-next-preview" class="hover:bg-yellow-300">next</button>
  </section>
</template>
