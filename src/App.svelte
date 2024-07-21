<script>
    // COMPONENTS
    import { onMount } from 'svelte';
    import { csvParse } from 'd3-dsv';
    import Topline from "$components/Topline.svelte";
    import CurrentShips from "$components/CurrentShips.svelte";

    // DATA
    const currentShipsUrl = 'https://raw.githubusercontent.com/vs-postmedia/tanker-tracker/master/data/current-ships.json';
    // import data from "$data/data.js";
    // import { menuItems } from "$data/menu-items";

    // VARIABLES
    let currentShipsData;
    let totalShips = 122575;
    const monthlyShips = {
        dimensions: 'width:100%;height:300px;',
        url: 'https://flo.uri.sh/visualisation/18776706/embed'
    };

    // REACTIVE VARIABLES
    // $: value, updateData(value);

    async function fetchData(url, format) {
        let parsedData;
        try {
            const resp = await fetch(url);
            const data = await resp.text();
            currentShipsData = format === 'json' ? JSON.parse(data) : csvParse(data);
        } catch (err) {
            console.error('Error: ', error)
        }

    }

    async function init() {
        // fetch remote data
        await fetchData(currentShipsUrl, 'json');
        // console.log(currentShipsData);
    }

    onMount(init);
</script>

<main>
    <!-- this can't load until  -->
    <Topline 
        count={totalShips}
    />

    <CurrentShips
        data={currentShipsData}
    />

    <!-- MONTHLY SHIPS -->
    <iframe src={monthlyShips.url} title='Monthly tanker traffic' class='flourish-embed-iframe' frameborder='0' scrolling='no' style={monthlyShips.dimensions} sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/18627199/?utm_source=embed&utm_campaign=visualisation/18627199' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>


</main>

<footer>
    <p class="note">NOTE: tk.</p>
    <p class="source">Source:  <a href="https:vancouversun.com" target="_blank">TK</a></p>
</footer>
  
<style>
    @import '$css/normalize.css';
    @import '$css/fonts.css';
    @import '$css/colors.css';
    @import '$css/app.css';

    main {
        margin-top: 1rem;
    }

    /* COMBOBOX SELECTOR */
  	:global(.svelte-select) {
		margin: 1rem auto !important;
		max-width: 250px;
  	}
  	:global(input:focus) {
		outline: none;
  	}

	:global(
		.svelte-select .selected-item,
		.svelte-select .item,
		.svelte-select input
	) {
		font-family: 'BentonSansCond-Regular', sans;
	}
</style>
