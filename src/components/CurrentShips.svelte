<script>
    export let data;
    
    // LIBS
    import { onMount } from 'svelte';

    // VARS
    let count;
    $: is_are = count === 1 ? 'is' : 'are';
    $: tanker = count === 1 ? 'tanker' : 'tankers';
    $: count = data ? data.length : null;
    $: console.log(count, is_are, tanker);

    // FUNCTIONS
    function init() {
        console.log('CURRENT SHIPS INIT!')   
    }

    // LIGHTS! CAMERA! ACTION!
    onMount(init);
</script>

<div id="current-ships">
    <p>There {is_are} currently {count} oil tankers moored at the Westridge and Suncore terminals in the Burrard Inlet.</p>
</div>


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