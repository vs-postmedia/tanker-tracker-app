<script>
    export let count;
    
    // LIBS
    import { onMount } from 'svelte';

    // VARS

    // FUNCTIONS
    function init() {
        // console.log('TOPLINE INIT!')
    }

    function addCommasToNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // LIGHTS! CAMERA! ACTION!
    onMount(init);
</script>

<h2 class="topline-text">At least <span class="big-num">🛢️ {addCommasToNumber(count)} oil tankers 🛢️</span>have passed through the Burrard Inlet since the Trans Mountain Expansion pipeline (TMX) began operations on May 1, 2024</h2>

<style>
    .topline-text {
        font-size: 1.4rem;
        line-height: 1.65rem;
        margin: 0 auto 1rem auto;
        max-width: 95%;
        text-align: center;
    }
    .big-num {
        color: #A62F22;
        font-size: 1.75rem;
        margin-right: 5px;
    }
</style>