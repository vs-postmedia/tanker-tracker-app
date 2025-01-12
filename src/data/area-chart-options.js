export const areaChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            align: 'start',
            labels: {
                boxHeight: 15,
                boxWidth: 15
            },
            position: 'top',
        },
        tooltip: {
            enabled: true, // Enable tooltips
            intersect: false, // Show tooltips even if not directly over a point
            mode: 'index', // Show tooltips for all datasets at the hovered index
            itemSort: (a,b) => {
                return a.dataset.label.localeCompare(b.dataset.label)
            },
            callbacks: {
                // Customize tooltip labels
                label: function (tooltipItem) {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw} tankers`;
                },
                title: function (tooltipItems) {
                    return `${tooltipItems[0].label}`;
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                display: false,
                drawTicks: true
            },
            stacked: true,
        },
        y: {
            beginAtZero: true,
            border: {
                display: false
            },
            grid: {
                drawTicks: false
            },
            stacked: true
        },
    }
};