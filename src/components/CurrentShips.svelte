<script>
    export let data;
    
    // LIBS
    import CurrentShipsTable from './CurrentShipsTable.svelte';

    // CONST VARS
    const noShipText = `There aren’t any ships moored at this terminal right now.`;

    // VARS
    $: count = data ? data.length : null;
    $: is_are = count === 1 ? 'is' : 'are';
    $: tanker = count === 1 ? 'tanker' : 'tankers';
    // $: westridge = data ? data.filter(d => d.terminal === 'Westridge') : [];
    // $: parkland = data ? data.filter(d => d.terminal === 'Parkland') : [];
    // $: suncor = data ? data.filter(d => d.terminal === 'Suncor') : [];
    // $: kitimat = data ? data.filter(d => d.terminal === 'Kitimat') : [];

    // $: console.log(data)
    // $: console.log(westridge.length, parkland.length)

</script>

<div id="current-ships">
    <!-- BIG NUM -->
    <h2><span class="big-num">🔥🛢️ {count} {tanker} 🛢️🔥</span> {is_are} currently moored at oil/gas terminals in B.C.</h2>

    <!-- TABLE -->
    <CurrentShipsTable
        data={data}
    />
    <!-- <div class="table-container">
        <h3 class="westridge">Westridge (Trans Mountain)</h3>
        <!-- svelte-ignore empty-block -->
        <!-- {#if westridge.length > 0}
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
        <h3 class="parkland">Parkland</h3>
        {#if parkland.length > 0}
            <CurrentShipsTable data={parkland} />
        {:else}
            <p>{noShipText}</p>
        {/if}
        <h3 class="kitimat">Kitimat</h3>
        {#if kitimat.length > 0}
            <CurrentShipsTable data={kitimat} />
        {:else}
            <p>{noShipText}</p>
        {/if}
    </div> -->
</div>


<style>
    #current-ships {
        margin-top: 75px;
    }
    #current-ships h2 {
        font-size: 1.55rem;
        line-height: 1.75rem;
        margin: 1rem auto 1.75rem auto;
        max-width: 90%;
        text-align: center;
    }
    #current-ships .big-num {
        color: #A62F22;
        font-family: 'BentonSansCond-Bold' !important;
    }
    .topline-text {
        font-size: 2.4rem;
        line-height: 1.75rem;
        margin: 0 auto 1rem auto;
        max-width: 95%;
        text-align: center;
    }
    .big-num {
        color: #A62F22;
        display: block;
        font-size: 2.3rem;
        margin-bottom: 15px;
    }
    /* #current-ships .westridge {
        color: #367dad;
        font-family: 'BentonSansCond-Bold';
  	}
  	#current-ships .suncor {
        color: #8FB9DE;
        font-family: 'BentonSansCond-Bold';
  	}
    #current-ships .parkland {
        color: #22a6b3;
        font-family: 'BentonSansCond-Bold';
  	}
    #current-ships .kitimat {
        color: #231F20;
        font-family: 'BentonSansCond-Bold';
  	} */
</style>