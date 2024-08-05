<script>
    export let data;
    
    // LIBS
    import CurrentShipsTable from './CurrentShipsTable.svelte';

    // VARS
    let count;
    let suncor, westridge;
    $: is_are = count === 1 ? 'is' : 'are';
    $: tanker = count === 1 ? 'tanker' : 'tankers';
    $: count = data ? data.length : null;
    
    // $: console.log(data)

    $: westridge = data ? data.filter(d => d.terminal === 'Westridge') : [];
    $: suncor = data ? data.filter(d => d.terminal === 'Suncor') : [];
</script>

<div id="current-ships">
    <h3>There {is_are} currently <span class="big-num">{count} oil {tanker}</span> moored at terminals in the Burrard Inlet.</h3>
    <div class="table-container">
        <h3 class="westridge">Westridge</h3>
        <!-- svelte-ignore empty-block -->
        {#if westridge.length > 0}
            <CurrentShipsTable data={westridge} />
        {:else}
            <p>There are currently no ships moored at the Westridge terminal</p>
        {/if}
        <h3 class="suncor">Suncor</h3>
        {#if suncor.length > 0}
            <CurrentShipsTable data={suncor} />
        {:else}
            <p>There are currently no ships moored at the Suncor terminal</p>
        {/if}
    </div>
</div>


<style>
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
        margin-top: 2.35rem;
    }
    #current-ships h3 {
        font-size: 1.2rem;
        line-height: 1.45rem;
        margin: 0.5rem auto;
        /* text-align: center; */
    }
    #current-ships .big-num {
        color: #A62F22;
        font-family: 'BentonSansCond-Bold' !important;
        /* font-size: rem; */
    }
</style>