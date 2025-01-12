<script>
    export let data;
    const urlFrag = 'https://www.vesselfinder.com/pro/map#vessel-details?imo=';

    // $: console.log(data)

    // set color based on terminal name
    $: color = data.length > 0 ? data[0].terminal === 'Westridge' ? 'color:#367dad' : 'color:#8FB9DE' : 'color:#000';
</script>

<div class="ship-details">
    {#each data as d}
        <p class="detail-line"><a href='{urlFrag}{d.ImoNumber}' target="_blank">{d.ImoNumber}</a> is a crude oil tanker built in XXXX. It has carrying capacity of <strong style='{color}'>XXX tonnes</strong>.</p>
    {/each}
</div>

<style>
    :global(.table-container > h3) {
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