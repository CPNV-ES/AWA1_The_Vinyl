<script setup>
import { onMounted, ref } from "vue";

const animation = { duration: 1, ease: "power1.inOut" };
const queue = [
  "#FFAA00",
  "#AA00FF",
  "#00AAFF",
  "#FF5500",
  "#55FF00",
  "#0055FF",
]
const currentPreview = ref(0);

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
  const btnPreviousPreview = document.getElementById("btn-previous-preview");

  for (let i = 0; i < queue.length; i++) {
    const slideElement = createSlide(queue[i]);
    slideElement.style.zIndex = queue.length - i;

    if (i === 0) {
      stackCurrent.appendChild(slideElement);
      slideElement.classList.toggle("brightness-50");
    } else {
      stackToSee.appendChild(slideElement);
    }
  }

  const moveNext = () => {
    if (currentPreview.value === queue.length - 1) return;
    currentPreview.value = currentPreview.value + 1;
    const seen = stackCurrent.firstChild;
    if (seen) {
      const stateSeen = Flip.getState(seen);
      seen.classList.toggle("brightness-50");
      seen.style.zIndex = seen.style.zIndex * -1;
      stackSeen.appendChild(seen);
      Flip.from(stateSeen, animation);
    }

    const current = stackToSee.firstChild;
    if (current) {
      const stateCurrent = Flip.getState(current);
      current.classList.toggle("brightness-50");
      stackCurrent.appendChild(current);
      Flip.from(stateCurrent, animation);
    }
  };

  const movePrevious = () => {
    if (currentPreview.value === 0) return;
    currentPreview.value = currentPreview.value - 1;
    const toSee = stackCurrent.firstChild;
    if (toSee) {
      const stateToSee = Flip.getState(toSee);
      toSee.classList.toggle("brightness-50");
      stackToSee.prepend(toSee);
      Flip.from(stateToSee, animation);
    }

    const current = stackSeen.lastChild;
    if (current) {
      const stateCurrent = Flip.getState(current);
      current.classList.toggle("brightness-50");
      current.style.zIndex = current.style.zIndex * -1;
      stackCurrent.append(current);
      Flip.from(stateCurrent, animation);
    }
  };

  btnPreviousPreview.addEventListener("click", movePrevious);
  btnNextPreview.addEventListener("click", moveNext);
});
</script>


<template>
  <section class="carrousel w-screen h-[30dvh] bg-red-400 overflow-hidden flex flex-col">
    <div class="flex w-full h-5/6 justify-evenly items-center px-[6dvw]">
      <div id="stack-seen" class="w-[17dvw] aspect-square relative -z-30"></div>
      <div id="stack-current" class="w-[20dvw] aspect-square relative"></div>
      <div id="stack-toSee" class="w-[17dvw] aspect-square relative -z-30 transition-colors"></div>
    </div>
    <div class="w-full flex items-center h-1/6">
      <button id="btn-previous-preview" class="hover:bg-yellow-300 flex-1">previous</button>
      <p class="flex-1 flex flex-col text-nowrap items-center">
        <span v-if="currentPreview => 0" class="font-bold text-md w-fit">{{ currentPreview }}</span>
        <span v-if="currentPreview => 0" class="font-semibold w-fit text-neutral-700 text-sm">queue[currentPreview].artist</span>
      </p>
      <button id="btn-next-preview" class="hover:bg-yellow-300 flex-1">next</button>
    </div>
  </section>
</template>
