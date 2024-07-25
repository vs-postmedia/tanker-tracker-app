<script>
    export let data;
    
    // LIBS
    import { onMount } from 'svelte';

    // VARS
    let count;
    $: is_are = count === 1 ? 'is' : 'are';
    $: tanker = count === 1 ? 'tanker' : 'tankers';
    $: count = data ? data.length : null;
    // $: console.log(count, is_are, tanker);

    // FUNCTIONS
    function init() {
        // console.log('CURRENT SHIPS INIT!');
    }

    // LIGHTS! CAMERA! ACTION!
    onMount(init);
</script>

<div id="current-ships">
    <p>There {is_are} currently <span class="big-num">{count} oil tankers</span> moored at the <span class="westridge">Westridge</span> and <span class="suncor">Suncor</span> terminals in the Burrard Inlet.</p>
</div>


<style>
    .westridge {
		/* color: #A62F22; */
        color: #367dad;
        font-family: 'BentonSansCond-Bold';
  	}
  	.suncor {
		/* color: #22a6b3; */
        color: #8FB9DE;
        font-family: 'BentonSansCond-Bold';
  	}
    #current-ships {
        margin-top: 2.35rem;
    }
    #current-ships p {
        font-size: 1.2rem;
        line-height: 1.45rem;
        margin: 0 auto 1rem auto;
        max-width: 95%;
        text-align: center;
    }
    #current-ships .big-num {
        color: #A62F22;
        font-family: 'BentonSansCond-Bold' !important;
        /* font-size: rem; */
    }
</style>