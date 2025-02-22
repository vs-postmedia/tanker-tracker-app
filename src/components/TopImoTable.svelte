<script>
    export let data;
    
    $: console.log(data);
    // titleCase
    function titleCase(s) {
        return s.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join( ' ')
    }
</script>

<section id="top-imo">
    <h2>🛢️ Tankers with the most visits 🛢️</h2>
    <table>
        <thead></thead>
        <tbody>
            {#if data}
                {#each data as d}
                    <tr>
                        <td class="flag">{d.flag}</td>
                        <td class="ship-name">{titleCase(d.shipName)}</td>
                        <td class="copy">This {d.country} registered {d.ship_type.toLowerCase()}, built in {d.build_year}, moored <span class="highlight">{d.count} times</span> in Burrard Inlet since the TMX opened.</td>
                        <!-- <td class="flag">{d.flag}</td> -->
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</section>

<style>
    #top-imo {
        margin-top: 50px;
    }
    #top-imo h2 {
        color: #A62F22;
        font-size: 2.4rem;
        margin-bottom: 25px;
        text-align: center
    }
    #top-imo td {
        padding: 3px 5px;
        line-height: 1.3;
    }
    #top-imo td.ship-name{
        min-width: 50%
    }
    #top-imo td .highlight {
        color: #A62F22;
        font-weight: 800;
    }
</style>