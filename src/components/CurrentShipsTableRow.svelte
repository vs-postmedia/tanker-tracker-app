<script>
    export let data;
    const urlFrag = 'https://www.vesselfinder.com/pro/map#vessel-details?imo=';

    $: console.log(`Table: ${data}`)

</script>

<div class="ship-details">
    {#each data as d}
        <p class="detail-line"><strong class='{d.terminal.toLowerCase()}'><a href='{urlFrag}{d.ImoNumber}' target="_blank">{d.Name}</a></strong> is a crude oil tanker built in XXXX. It has carrying capacity of <strong class='{d.terminal.toLowerCase()}'>XXX tonnes</strong>.</p>
    {/each}
</div>

<style>
    :global(#table-container > h3) {
        font-size: 1.5rem;
        margin: 16px 0 8px 0;
    }
    .detail-line {
        padding-bottom: 7px;
    }

    .detail-line > strong {
        font-family: 'BentonSansCond-Bold';
    }
</style>