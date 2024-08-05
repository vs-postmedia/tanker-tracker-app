<script>
    export let data;

    // $: console.log(data)

    // set color based on terminal name
    $: color = data.length > 0 ? data[0].terminal === 'Westridge' ? 'color:#367dad' : 'color:#8FB9DE' : 'color:#000';
</script>

<div class="ship-details">
    {#each data as d}
        <p class="detail-line">{d.ImoNumber} is a crude oil tanker built in XXXX. It has carrying capacity of <strong style='{color}'>XXX tonnes</strong>.</p>
    {/each}
</div>


<style>
    .detail-line {
        padding-bottom: 7px;
    }

    .detail-line > strong {
        font-family: 'BentonSansCond-Bold';
    }
    
</style>