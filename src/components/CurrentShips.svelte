<script>
    export let data;
    
    // LIBS
    import CurrentShipsTable from './CurrentShipsTable.svelte';

    // CONST VARS
    const noShipText = `There aren’t any ships moored at this terminal right now.`;

    // VARS
    let count;
    let suncor, westridge;
    $: is_are = count === 1 ? 'is' : 'are';
    $: tanker = count === 1 ? 'tanker' : 'tankers';
    $: count = data ? data.length : null;
    
    $: console.log(data)

    $: westridge = data ? data.filter(d => d.terminal === 'Westridge') : [];
    $: suncor = data ? data.filter(d => d.terminal === 'Suncor') : [];
</script>

<div id="current-ships">
    <h2><span class="big-num">🛢️ {count} oil {tanker} 🛢️</span> {is_are} currently moored at terminals in the Burrard Inlet</h2>
    <div class="table-container">
        <h3 class="westridge">Westridge (Trans Mountain)</h3>
        <!-- svelte-ignore empty-block -->
        {#if westridge.length > 0}
            <CurrentShipsTable data={westridge} />
        {:else}
            <p>{noShipText}</p>
        {/if}
        <h3 class="suncor">Suncor</h3>
        {#if suncor.length > 0}
            <CurrentShipsTable data={suncor} />
        {:else}
            <p>{noShipText}</p>
        {/if}
    </div>
</div>


<style>
    .topline-text {
        font-size: 2.4rem;
        line-height: 1.65rem;
        margin: 0 auto 1rem auto;
        max-width: 95%;
        text-align: center;
    }
    .big-num {
        color: #A62F22;
        display: block;
        font-size: 2.9rem;
        margin-bottom: 25px;
    }
    #current-ships .westridge {
		/* color: #A62F22; */
        color: #367dad;
        font-family: 'BentonSansCond-Bold';
  	}
  	#current-ships .suncor {
		/* color: #22a6b3; */
        color: #8FB9DE;
        font-family: 'BentonSansCond-Bold';
  	}
    #current-ships {
        margin: 2.35rem 0 3rem 0;
    }
    #current-ships h2 {
        font-size: 1.55rem;
        line-height: 2rem;
        margin: 1rem auto;
        max-width: 90%;
        text-align: center;
    }
    #current-ships .big-num {
        color: #A62F22;
        font-family: 'BentonSansCond-Bold' !important;
        /* font-size: rem; */
    }
</style>