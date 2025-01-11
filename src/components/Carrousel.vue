<script setup>
import { onMounted, ref, watch } from "vue";
import { useSpotifyStore } from "../stores/spotify";
import { ForwardIcon, BackwardIcon } from "@heroicons/vue/24/solid";

const animation = { duration: 1, ease: "power1.inOut" };
const store = useSpotifyStore();
const currentPreview = ref(0);

// Create a preview 
const createPreview = (preview) => {
  const imgElement = document.createElement("img");
  imgElement.src = preview.cover;
  imgElement.alt = "aaa";
  imgElement.classList.add("h-full", "w-full", "absolute", "brightness-50", "object-cover");
  return imgElement;
};

onMounted(() => {
  const stackToSee = document.getElementById("stack-toSee");
  const stackCurrent = document.getElementById("stack-current");
  const stackSeen = document.getElementById("stack-seen");
  const btnNextPreview = document.getElementById("btn-next-preview");
  const btnPreviousPreview = document.getElementById("btn-previous-preview");

  // Observe the changes in the queue
  watch(
    () => store.queue,
    () => {
      generatePreviews();
    },
    { deep: true }
  );

  // Generate/Reset the previews
  const generatePreviews = () => {
    currentPreview.value = 0;
    stackToSee.innerHTML = "";
    stackCurrent.innerHTML = "";
    stackSeen.innerHTML = "";

    for (let i = 0; i < store.queue.length; i++) {
      const previewElement = createPreview(store.queue[i]);
      previewElement.style.zIndex = store.queue.length - i;

      if (i === 0) {
        stackCurrent.appendChild(previewElement);
        previewElement.classList.toggle("brightness-50");
      } else {
        stackToSee.appendChild(previewElement);
      }
    }
  };

  // Switch to the next preview
  const moveNext = () => {
    if (currentPreview.value === store.queue.length - 1) return;
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

  // Switch to the previous preview
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
  <section class="carrousel w-screen h-[30dvh] overflow-hidden flex flex-col">
    <div class="flex w-full h-5/6 justify-evenly items-center px-[6dvw]">
      <div id="stack-seen" class="w-[17dvw] aspect-square relative -z-30"></div>
      <div id="stack-current" class="w-[20dvw] aspect-square relative"></div>
      <div id="stack-toSee" class="w-[17dvw] aspect-square relative -z-30 transition-colors"></div>
    </div>
    <div class="w-full flex items-center h-1/6">
      <button id="btn-previous-preview" class="flex-1 flex justify-center"><BackwardIcon class="w-6 h-6" /></button>
          <p class="w-[60dvw] flex flex-col text-nowrap items-center">
            <span v-if="store.queue[currentPreview]" class="font-bold text-md w-fit">{{
              store.queue[currentPreview].title }}</span>
            <span v-if="store.queue[currentPreview]"
              class="font-semibold w-fit text-neutral-700 text-sm">{{ store.queue[currentPreview].artist }}</span>
          </p>
          <button id="btn-next-preview" class="flex-1 flex justify-center"><ForwardIcon class="w-6 h-6" /></button>
    </div>
  </section>
</template>
