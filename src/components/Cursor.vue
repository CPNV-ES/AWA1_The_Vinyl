<template>
    <div id="cursor"></div>
</template>

<style>
#cursor {
    inset: 0;
    position: absolute;
    translate: -50% -50%;
    width: 0.65rem;
    height: 0.65rem;
    background-color: white;
    border-radius: 50%;
    pointer-events: none;
    z-index: 999;
    mix-blend-mode: difference;
}

* {
    cursor: none !important;
}
</style>


<script>
export default {
    name: 'Cursor',
    mounted() {
        const cursor = document.getElementById('cursor');
        document.addEventListener('mousemove', (event) => {
            cursor.style.left = event.clientX + 'px';
            cursor.style.top = event.clientY + 'px';
        });
    },
};
</script>
