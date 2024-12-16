<template>
    <nav>
        <button name="logout" class="button-spotify"><b>Logout</b></button>
    </nav>
    <div id="main">
        <section class="screen-split side-player">A</section>
        <section class="screen-split side-research">B</section>
    </div>
</template>

<style>
    body nav {
        justify-content: flex-end;
    }

    #main {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .screen-split {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 50dvw;
    }

    .button-spotify {
        width: 5rem;
        height: 2rem;
    }

    @media (min-width: 1200px) {
        body #main {
            flex-direction: row;
        }
    }
</style>

<script>
export default { name: 'Home' };
</script>
