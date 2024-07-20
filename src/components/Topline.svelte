<script>
    export let count;
    
    // LIBS
    import { onMount } from 'svelte';

    // VARS
    let is_are = count === 1 ? 'is' : 'are';
    let tanker = count === 1 ? 'tanker' : 'tankers';
    $: console.log(count);

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

<h2 class="topline-text"><span class="big-num">🛢️ {addCommasToNumber(count)} oil tankers 🛢️</span>have passed through Burrard Inlet since the Trans Mountain Expansion pipeline (TMX) began operations on May 1, 2024</h2>
<!-- <h2 class="topline-text">There {is_are} currently  {count} oil {tanker} moored at the refineries in Burrard Inlet</h2> -->

<style>
    .topline-text {
        /* font-family: 'BentonSansCond-Regular' !important; */
        font-size: 1.4rem;
        line-height: 1.65rem;
        margin: 0 auto 1rem auto;
        max-width: 95%;
        text-align: center;
    }
    .big-num {
        color: #A62F22;
        display: block;
        /* font-family: 'BentonSansCond-Bold' !important; */
        font-size: 2rem;
        margin-bottom: 15px;
    }
</style>