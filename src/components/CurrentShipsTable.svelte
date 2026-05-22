<script>
    export let data;
    
    // LIBS
    import CurrentShipsTableRow from './CurrentShipsTableRow.svelte';

    // CONST VARS
    const noShipText = `There aren’t any ships moored at this terminal right now.`;

    // VARS
    // $: count = data ? data.length : null;
    // $: is_are = count === 1 ? 'is' : 'are';
    // $: tanker = count === 1 ? 'tanker' : 'tankers';
    $: westridge = data ? data.filter(d => d.terminal === 'Westridge') : [];
    $: parkland = data ? data.filter(d => d.terminal === 'Parkland') : [];
    $: suncor = data ? data.filter(d => d.terminal === 'Suncor') : [];
    $: kitimat = data ? data.filter(d => d.terminal === 'Kitimat') : [];

    // $: console.log(data)
    // $: console.log(westridge.length, parkland.length)

</script>

<!-- TABLE -->
<div id="table-container">
    <h3 class="westridge">Westridge (Trans Mountain)</h3>
    <!-- svelte-ignore empty-block -->
    {#if westridge.length > 0}
        <CurrentShipsTableRow data={westridge} />
    {:else}
        <p>{noShipText}</p>
    {/if}
    <h3 class="suncor">Suncor</h3>
    {#if suncor.length > 0}
        <CurrentShipsTableRow data={suncor} />
    {:else}
        <p>{noShipText}</p>
    {/if}
    <h3 class="parkland">Parkland</h3>
    {#if parkland.length > 0}
        <CurrentShipsTableRow data={parkland} />
    {:else}
        <p>{noShipText}</p>
    {/if}
    <h3 class="kitimat">Kitimat</h3>
    {#if kitimat.length > 0}
        <CurrentShipsTableRow data={kitimat} />
    {:else}
        <p>{noShipText}</p>
    {/if}
</div>


<style>
    #table-container {
        margin: 0 auto;
        max-width: 90%;
    }
</style>